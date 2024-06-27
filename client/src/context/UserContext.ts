import { createContext } from 'react'

export interface UserContextType {
  email: string | null
  setEmail: (email: string | null) => void
  imageLink: string | null
  setImageLink: (link: string | null) => void
}

const initialContext: UserContextType = {
  email: null,
  setEmail: () => {},
  imageLink: null,
  setImageLink: () => {},
}

export const UserContext = createContext<UserContextType>(initialContext)
