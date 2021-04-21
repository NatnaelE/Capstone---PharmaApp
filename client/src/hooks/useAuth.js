import React, { useState, useCallback, useEffect, useContext, createContext } from 'react'

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database"

var firebaseConfig = {
  apiKey: "AIzaSyAtFeAESBWX1Uh993kfv4Z-XPXWEH7T2jo",
  authDomain: "pharmaapp-7347c.firebaseapp.com",
  projectId: "pharmaapp-7347c",
  databaseURL: "https://pharmaapp-7347c-default-rtdb.firebaseio.com/",
  storageBucket: "pharmaapp-7347c.appspot.com",
  messagingSenderId: "71075392486",
  appId: "1:71075392486:web:dd84008baca600231dc427",
  measurementId: "G-SY479F1KJV"
};

// Initialize Firebase
// firebase.app().delete()
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
firebase.analytics();

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

// Hook for provider to initialize and handle auth state
function useProvideAuth() {
  // Auth state
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState()
  
  // RTB for user data
  let db = firebase.database()
  const [userRef, setUserRef] = useState()
  const [userData, setUserData] = useState()

  // Handles auth user state change
  const handleUserChange = useCallback((user) => {
    // Store user in hook state
    setUser(user)
    user ? console.log(user) : console.log("No user signed in")

    // Handle RTD subscriptions
    if (user) {
      let ref = db.ref(refs.users + user.uid)

      // Subscribe to user data
      ref.on('value', snapshot => {
        const data = snapshot.val()
        setUserData(data)
      })
      console.log("Subscribed to " + ref)

      // Save ref to unsubscribe on auth change
      setUserRef(ref)
    } else {
      // Unsubscribe if we have a ref
      userRef && userRef.off()
      userRef && console.log("Unsubscribed from " + userRef)

      // Clear ref
      setUserRef(null)

      // Clear user data
      setUserData(null)
    }
  }, [db, userRef, setUser, setUserRef, setUserData])

  // Sign In
  const signIn = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(console.error)
  };

  // Sign Up
  const signUp = (email, password, name) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => response.user)
      .then(user => {
        user.updateProfile({ displayName: name })
        postUserData(user.uid, email, name, '')
      })
      .catch(console.error)
  };

  const signOut = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        handleUserChange(null);
      });
  };

  const postUserData = (uid, email, name, imageURL) => {
    if (!uid) {
      console.error("UID not provided")
    }

    db.ref(refs.users + uid).set({
      email: email,
      name: name,
      profile_img: imageURL,
      settings: {
        startSidebarMinimized: false
      }
    }, err => {
      if (err) {
        console.error("Failed to write user data")
      } else {
        console.log("User data saved successfully!")
      }
    })
  }

  const updateProfile = ({ name, img }) => {
    if (!user) {
      console.log("Signed up, but no user found")
      return
    }
    
    const update = {}
    name && (update['displayName'] = name)
    img && (update['photoURL'] = img)
    console.log(update)

    const test = user.updateProfile(update)
      .then(console.log("Updated profile"))
      .catch(console.error)
    console.log(test)

    const rtbUpdates = {}
    name && (rtbUpdates[refs.users + user.uid + '/name'] = name)
    img && (rtbUpdates[refs.users + user.uid + '/profile_img'] = img)
    db.ref().update(rtbUpdates)
    // rtd.postUserData(user.uid, name, user.email, img)
  }

  const sendPasswordResetEmail = (email) => {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      });
  };

  const confirmPasswordReset = (code, password) => {
    return firebase
      .auth()
      .confirmPasswordReset(code, password)
      .then(() => {
        return true;
      });
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setLoading(true)
      handleUserChange(user)
      setLoading(false)
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();

    // eslint-disable-next-line
  }, []);

  // Return the user object and auth methods
  return {
    user,
    userData,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    sendPasswordResetEmail,
    confirmPasswordReset,
  }
}

const refs = {
  users: 'users/',
}