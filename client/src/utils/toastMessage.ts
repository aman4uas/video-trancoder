import { Bounce, toast } from 'react-toastify'

const toastMessage = (message: string, success: boolean) => {
  if (success) {
    toast.success(message, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      theme: 'dark',
      transition: Bounce,
    })
  } else {
    toast.error(message, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      theme: 'dark',
      transition: Bounce,
    })
  }
}

export { toastMessage }
