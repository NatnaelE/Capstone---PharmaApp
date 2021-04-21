import { useState, useEffect } from 'react'
import firebase from "firebase/app";

const refs = {
  users: 'users/',
}

// Hook for reading and writing to Firebase Real Time Database
function useRTD() {
  let db = firebase.database()
  const [userData, setUserData] = useState()

  const postUserData = (uid, name, email, imageURL) => {
    if (!uid) {
      console.error("UID not provided")
    }

    db.ref(refs.users + uid).set({
      name: name,
      email: email,
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

  useEffect(() => {
    // let userDataRef = db.ref(refs.users + uid)
    // userDataRef.on('value', snapshot => {
    //   const data = snapshot.val()
    //   setUserData(data)
    // })

    // // Cleanup subscription on unmount
    // return () => userDataRef.off();
  }, [setUserData]);

  return {
    userData,
    postUserData,
  }
}

export { useRTD }