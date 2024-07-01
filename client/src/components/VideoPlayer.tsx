import React, { useEffect, useRef } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import Navbar from './Navbar'

const VideoPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const url = urlParams.get('url')
    if (videoRef.current) {
      const player = videojs(videoRef.current, {
        controls: true,
        fluid: true,
        sources: [
          {
            src: url,
            type: 'application/x-mpegURL',
          },
        ],
      })
      return () => {
        if (player) {
          player.dispose()
        }
      }
    }
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-900">
      <Navbar />
      <h1 className="text-gray-400 text-center my-4">
        Video player with multiple quality support will be available soon.
      </h1>
      <div className="max-w-screen-lg mx-auto flex flex-col items-center justify-center w-full h-auto mb-6">
        <video ref={videoRef} className="video-js w-full h-auto" style={{ maxWidth: '100%' }} playsInline />
      </div>
    </div>
  )
}

export default VideoPlayer
