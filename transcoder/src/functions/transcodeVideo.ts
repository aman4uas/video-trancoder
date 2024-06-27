import { exec, execSync } from 'child_process'
import util from 'util'
const execPromise = util.promisify(exec)
import fs from 'fs'
import path from 'path'
import { VIDEO_SEGMENT_TIME } from '../constants'

async function getVideoResolution(videoPath: string) {
  const command = `ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 "${videoPath}"`
  try {
    const output = execSync(command).toString().trim()
    const [width, height] = output.split('x').map(Number)
    return { width, height }
  } catch (error) {
    console.log(`Error getting video resolution !!`)
    console.log(error)
    throw new Error()
  }
}

const generateHLS = async (
  videoPath: string,
  outputPath: string,
  resolution: string,
  targetWidth: number,
  targetHeight: number,
  videoBitrate: string,
  audioBitrate: string
) => {
  const hlsPath = path.resolve(outputPath, `${resolution}.m3u8`)
  const segmentFilename = path.resolve(outputPath, `${resolution}_segment%05d.ts`)

  const { width, height } = await getVideoResolution(videoPath)

  if (width >= targetWidth && height >= targetHeight) {
    const ffmpegCommand = `ffmpeg -i "${videoPath}" -vf "scale=${targetWidth}:${targetHeight}" -codec:v libx264 -b:v ${videoBitrate} -codec:a aac -b:a ${audioBitrate} -hls_time "${VIDEO_SEGMENT_TIME}" -hls_playlist_type vod -hls_segment_filename "${segmentFilename}" -start_number 0 "${hlsPath}"`

    try {
      const { stdout, stderr } = await execPromise(ffmpegCommand)
      // console.log(`stdout for ${resolution}: ${stdout}`)
      // console.error(`stderr for ${resolution}: ${stderr}`)
      return hlsPath
    } catch (error) {
      console.log(`Error while generating HLS for resolution: ${resolution}`)
      console.log(error)
      throw new Error()
    }
  } else {
    console.log(
      `Skipping ${resolution} conversion: input video resolution (${width}x${height}) is lower than target resolution (${targetWidth}x${targetHeight})`
    )
    return null
  }
}

async function generateMasterPlaylist(outputPath: string, variants: any[]) {
  const masterPlaylistPath = path.resolve(outputPath, 'index.m3u8')
  const variantPlaylists = variants.map((variant) => `${variant}.m3u8`)

  const masterContent = `#EXTM3U
#EXT-X-VERSION:3
${variantPlaylists
  .map((variant, index) => `#EXT-X-STREAM-INF:BANDWIDTH=${index * 1000000},RESOLUTION=${variant}\n${variant}`)
  .join('\n')}`

  try {
    await new Promise<void>((resolve, reject) => {
      fs.writeFile(masterPlaylistPath, masterContent, (err) => {
        if (err) {
          reject(err)
          return
        }
        resolve()
      })
    })
    console.log(`Successfully generated master playlist: ${masterPlaylistPath}`)
  } catch (error) {
    console.error(`Failed to generate master playlist: ${error}`)
  }
}

const transcodeVideo = async (videoPath: string, outputPath: string) => {
  const resolutions = [
    { resolution: '360p', targetWidth: 640, targetHeight: 360, videoBitrate: '800k', audioBitrate: '96k' },
    { resolution: '480p', targetWidth: 854, targetHeight: 480, videoBitrate: '1400k', audioBitrate: '128k' },
    { resolution: '720p', targetWidth: 1280, targetHeight: 720, videoBitrate: '2800k', audioBitrate: '128k' },
    // { resolution: '1080p', targetWidth: 1920, targetHeight: 1080, videoBitrate: '5000k', audioBitrate: '192k' },
  ]

  const variantPaths = []
  for (const { resolution, targetWidth, targetHeight, videoBitrate, audioBitrate } of resolutions) {
    try {
      const hlsPath = await generateHLS(
        videoPath,
        outputPath,
        resolution,
        targetWidth,
        targetHeight,
        videoBitrate,
        audioBitrate
      )
      if (hlsPath) {
        variantPaths.push(hlsPath)
        console.log(`Successfully generated ${resolution}`)
      }
    } catch (error) {
      console.error(`Failed to generate ${resolution}`)
      throw new Error()
    }
  }

  if (variantPaths.length > 0) {
    await generateMasterPlaylist(
      outputPath,
      resolutions.map((res) => res.resolution)
    )
    console.log('All video formats transcoded..')
  } else {
    console.log('Error: No variants generated. Exiting...')
    throw new Error()
  }
}
export { transcodeVideo }
