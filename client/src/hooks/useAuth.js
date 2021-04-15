import React, { useState, useEffect, useContext, createContext } from 'react'
// Auth context
const authContext = createContext();

// Provider component that wraps app
export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components
export const useAuth = () => {
  return useContext(authContext);
}

// Provider hook that creates auth object, handles state, and wraps methods
function useProvideAuth() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(localStorage.getItem("user") || null)
  
  // Sign in
  const signIn = () => {
    const user = {id: 0, name: 'Fake User'}
    localStorage.setItem("user", user)
    setUser(user)
    setLoading(false)
  }

  // Sign out
  const signOut = () => {
    localStorage.removeItem("user")
    setUser(null)
  }

  // Onload function
  useEffect(() => {
    // signIn()
  }, [])

  // Log current user on auth change
  useEffect(() => {(async () => {
    console.log(user)
  })() }, [user]); 

  return {
    loading,
    user,
    setLoading,
    setUser,
    signIn,
    signOut
  }
}