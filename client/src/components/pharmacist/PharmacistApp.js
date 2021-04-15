import React from 'react'
import { useAuth } from '../../hooks/useAuth'

const PharmacistApp = () => {
  let auth = useAuth()

  return (
    <div>
      <a href="/">Back to Home</a>
      <h1>Pharmacist Dashboard</h1>
      <button onClick={e => {
        e.preventDefault()
        auth.signOut()
      }}>Sign Out</button>
    </div>
  )
}

export default PharmacistApp