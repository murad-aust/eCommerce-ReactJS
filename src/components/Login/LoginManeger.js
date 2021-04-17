import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () =>{
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
 

}
export const handleGoogleSignIn= () =>{
    const  googleProvider = new firebase.auth.GoogleAuthProvider();
   return firebase.auth().signInWithPopup(googleProvider)
    .then(res => {
      const {displayName, photoURL, email} = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true
      }
      setUserToken();
      return signedInUser;
      
  
    })
    .catch(err =>{
      console.log(err);
      console.log(err.message);
    })
  
   }


   const setUserToken = () => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      sessionStorage.setItem('token', idToken);
    }).catch(function(error) {
      // Handle error
    });
  }

   export const handleSignnOut = () => {
    return firebase.auth().signOut()
     .then(res =>{
       const signedOutuser ={
        isSignedIn : false,
        name : '',
        email : '',
        photo : '',
        success: false
  
       }
       return signedOutuser;
      
     })
     .catch(err =>{
      console.log(err);
      console.log(err.message);
    })
     
   }

   export const createUserWithEmailAndPassword = (name, email, password) => {

    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res =>{
      const newUserInfo = res.user;
      newUserInfo.error = '';
     // updateUserName(name);
      newUserInfo.success = true;
       return newUserInfo;
      


    })
    .catch(error => {
      // Handle Errors here.
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
      // ...
    });
   }

   export const signInUserWithEmailAndPassword = ( email, password) =>{
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
     
      return newUserInfo;

      

    })
    
    .catch(error=> {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
      
      
    });
   }