import { useState } from 'react'
import { UserContext, UserContextType } from './UserContext'

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [email, setEmail] = useState<string | null>(null)
  const [imageLink, setImageLink] = useState<string | null>(null)

  const contextValue: UserContextType = {
    email,
    setEmail,
    imageLink,
    setImageLink,
  }

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  )
}

export default UserContextProvider
