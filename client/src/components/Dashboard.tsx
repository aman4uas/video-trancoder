import Navbar from './Navbar'
import Chart from './Chart'
import Loader from './Loader'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaPlay, FaRegSadCry } from 'react-icons/fa'
import { BiSolidCopy } from 'react-icons/bi'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { apiGetRequest, authHandler, errorHandler, formatDate, formatFileSize, toastMessage } from '../utils'

interface Video {
  _id: string
  status: string
  size: number
  link: string
  createdAt: Date
}

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Success':
      return 'text-[#22CAB4]'
    case 'Failed':
      return 'text-red-500'
    case 'Processing':
      return 'text-yellow-500'
    case 'Queued':
      return 'text-purple-400'
    default:
      return 'text-white'
  }
}

const getStatusText = (status: string): string => {
  if (status === 'Success') return 'Processed'
  else return status
}

const Dashboard = () => {
  const [loading, setLoading] = useState(true)
  const [chatData, setChartData] = useState({
    success: 0,
    failed: 0,
    processing: 0,
    queued: 0,
    total: 0,
  })
  const [hasData, setHasData] = useState(false)
  const [videoData, setVideoData] = useState<Video[]>([])
  const [tooltipText, setTooltipText] = useState('Copy to Clipboard')
  const navigate = useNavigate()

  useEffect(() => {
    const init = async () => {
      setLoading(true)
      try {
        const response = await apiGetRequest(`${import.meta.env.VITE_BACKEND_URL}/file/details`, true)
        if (authHandler(response)) return
        if (errorHandler(response)) return
        if (!response.data.hasVideos) {
          setHasData(false)
          setLoading(false)
          return
        } else {
          setHasData(true)
        }
        const status = response.data.statusData
        const tempChartData = {
          success: 0,
          failed: 0,
          processing: 0,
          queued: 0,
          total: 0,
        }

        status.forEach((x: { status: string; count: number }) => {
          switch (x.status) {
            case 'Queued':
              tempChartData.queued = x.count
              break
            case 'Success':
              tempChartData.success = x.count
              break
            case 'Processing':
              tempChartData.processing = x.count
              break
            case 'Failed':
              tempChartData.failed = x.count
              break
            case 'Total':
              tempChartData.total = x.count
              break
            default:
              break
          }
        })
        setChartData(tempChartData)
        setVideoData(response.data.videoData)
      } catch (error) {
        console.log(error)
        toastMessage('Something went wrong', false)
      }
      setLoading(false)
    }

    init()
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      {loading && <Loader />}
      {!loading && hasData === false && (
        <div className="my-[22vh] h-full flex flex-col items-center justify-center">
          <FaRegSadCry className="text-6xl text-gray-500 mb-4" />
          <p className="text-2xl font-semibold text-gray-500 mb-2">No Videos Found</p>
          <p className="text-lg text-gray-400 mb-6">Start uploading your videos to see the status here.</p>
        </div>
      )}
      {!loading && hasData === true && (
        <>
          <div id="top" className="p-2 my-2 w-full flex flex-col md:flex-row items-center justify-evenly">
            <div className="w-full md:w-1/2 h-[75vh] translate-x-12 max-h-[28rem] md:max-h-[32rem] flex flex-col justify-center items-center">
              <h2 className="text-2xl font-bold mb-4 text-white text-center md:text-left">Status Overview</h2>
              <Chart
                success={chatData.success}
                failed={chatData.failed}
                processing={chatData.processing}
                queued={chatData.queued}
              />
              <div className="mt-4 flex flex-col items-center justify-center text-white w-full">
                <div className="grid grid-cols-4 gap-1">
                  <div className="text-center">
                    <p className="text-[#22CAB4]">Processed</p>
                    <p>
                      {chatData.success}/{chatData.total}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-red-500">Failed</p>
                    <p>
                      {chatData.failed}/{chatData.total}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-yellow-500">Processing</p>
                    <p>
                      {chatData.processing}/{chatData.total}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-purple-400">Queued</p>
                    <p>
                      {chatData.queued}/{chatData.total}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:flex md:w-1/2 -translate-x-12 md:pl-12 items-center justify-center p-4">
              <img className="h-full max-h-[70vh]" src="girl-img.png" alt="img" />
            </div>
          </div>
          <div id="bottom" className="mt-32 text-center flex items-center flex-col md:text-left px-4 py-8">
            <h2 className="text-3xl font-bold mb-4 text-white">Video Uploads</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 m-2">
              {videoData.map((video) => (
                <div
                  key={video._id}
                  className="relative flex flex-col mt-6 text-white bg-gray-800 shadow-lg rounded-xl w-96"
                >
                  <div className="p-6">
                    <h3 className="mb-2 font-mono text-xl font-medium tracking-normal text-white">
                      ID → <span className="font-normal font-mono text-lg italic">{video._id}</span>
                    </h3>
                    <p className="mb-1 italic text-gray-100">
                      Status <span className="font-mono text-white">→ </span>{' '}
                      <span className={`not-italic ${getStatusColor(video.status)}`}>
                        {getStatusText(video.status)}
                      </span>
                    </p>
                    <p className="mb-1 italic text-gray-100">
                      Size <span className="font-mono text-white">→ </span>{' '}
                      <span className="text-white not-italic">{formatFileSize(video.size)}</span>
                    </p>
                    <p className="mb-1 italic text-gray-100">
                      Uploaded On <span className="font-mono text-white">→ </span>{' '}
                      <span className="text-white not-italic">{formatDate(new Date(video.createdAt))}</span>
                    </p>
                    {/* {video.status === 'Queued' && (
                      <p className="mt-5 italic font-mono text-red-400">
                        If the status doesn't change to "Processing" within 1-2 minutes of a fresh reload, it may
                        indicate that the transcoder or consumer is intentionally offline to save resources or costs.
                      </p>
                    )} */}
                  </div>

                  {video.status === 'Success' && (
                    <div className="p-6 pt-0 flex justify-between items-center">
                      <button
                        type="button"
                        disabled={video.status !== 'Success'}
                        className="font-semibold w-full text-gray-900 bg-yellow-500 hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-300 rounded-lg px-5 py-2.5 text-center inline-flex justify-center items-center"
                        onClick={() => navigate(`/play?url=${video.link}`)}
                      >
                        <FaPlay className="mr-2 h-5" />
                        Play Video
                      </button>
                      <CopyToClipboard
                        data-tooltip-id="tool-tip-id"
                        data-tooltip-content={tooltipText}
                        text={video.link}
                        onCopy={() => {
                          setTooltipText('Copied')

                          setTimeout(() => {
                            setTooltipText('Copy to Clipboard')
                          }, 1500)
                        }}
                      >
                        <button className="ml-2 p-2 rounded-md bg-gray-700 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-500">
                          <BiSolidCopy className="h-6 w-6" />
                        </button>
                      </CopyToClipboard>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <ReactTooltip id="tool-tip-id" />
          </div>
        </>
      )}
    </div>
  )
}

export default Dashboard
