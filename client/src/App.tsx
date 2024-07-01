import { Route, Routes } from 'react-router-dom'
import { Dashboard, Home, Signin, Signup, VideoPlayer, Pricing, PageNotFound } from './components'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-tooltip/dist/react-tooltip.css'

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/play" element={<VideoPlayer />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
