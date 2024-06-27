import { Route, Routes } from 'react-router-dom'
import { Home, Signin, Signup } from './components'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
