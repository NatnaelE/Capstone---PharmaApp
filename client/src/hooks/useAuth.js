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
  const [onboarding, setOnboarding] = useState()
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

    
    if (user) {
      // Handle RTD subscriptions
      let ref = db.ref(refs.users + user.uid)

      // // Load data one time for state
      // ref.get().then((snapshot) => {
      //   if (snapshot.exists()) {
      //     console.log(snapshot.val());
      //   } else {
      //     console.log("No data available");
      //   }
      // }).catch((error) => {
      //   console.error(error);
      // });

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
    setOnboarding(true)

    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => response.user)
      .then(user => {
        user.updateProfile({ displayName: name })
        startOnboarding(user.uid, email, name, '')
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

  const startOnboarding = (uid, email, name) => {
    if (!uid) {
      console.error("UID not provided")
    }

    db.ref(refs.users + uid).set({
      email: email,
      name: name,
      profile_img: '',
      settings: {
        startSidebarMinimized: false
      },
      onboarding: true
    }, err => {
      if (err) {
        console.error("Failed to write user data")
      } else {
        console.log("User data saved successfully! Onboarding in progress")
      }
    })
  }

  const stopOnboarding = async () => {
    await db.ref(refs.users + user.uid).child("onboarding").set(false)
      .catch(console.error)
  }

  const addPharmacy = async ({ pharmacyName, location, password }) => {
    console.log("addPharmacy() called")
    if (!user) {
      throw new Error("401: Must be logged in to add pharmacy")
    }

    if (!pharmacyName || !location || !password) {
      throw new Error("404: Pharmacy needs all required fields to be added")
    }

    const ref = db.ref(refs.users + user.uid)


    const newPharmacyRef = ref.child("pharmacies").push()
    const key = await newPharmacyRef.set({ pharmacyName, location, password })
      .then(() => {
        return newPharmacyRef.key
      })
      .catch(error => {
        console.error(error.message)
        throw new Error("Failed to set data")
      })

    return key
  }

  const updateProfile = async ({ name, img }) => {
    await sleep(1000)
    console.log(img)
    if (!user) {
      console.log("Signed up, but no user found")
      return
    }
    
    const update = {}
    name && (update['displayName'] = name)
    img && (update['photoURL'] = img)
    console.log(update)

    await user.updateProfile(update)
      .then(console.log("Updated profile"))
      .catch(console.error)

    const rtbUpdates = {}
    name && (rtbUpdates[refs.users + user.uid + '/name'] = name)
    img && (rtbUpdates[refs.users + user.uid + '/profile_img'] = img)
    await db.ref().update(rtbUpdates)
      .then(console.log("Updated user data"))
      .catch(console.error)
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
      console.log('auth state fire')
      setLoading(true)
      handleUserChange(user)
      setLoading(false)
      console.log(userData)
      console.log(loading)
      console.log('loading false')
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
    onboarding,
    signIn,
    signUp,
    signOut,
    stopOnboarding,
    addPharmacy,
    updateProfile,
    sendPasswordResetEmail,
    confirmPasswordReset,
  }
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const refs = {
  users: 'users/',
  userPharmacies: '/pharmacies/'
}