import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleGoogleSignIn, handleSignnOut, initializeLoginFramework, signInUserWithEmailAndPassword } from './LoginManeger';

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser]= useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false
  })

  initializeLoginFramework();
  
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  
  const googleSignIn = ()=>{
    handleGoogleSignIn()
    .then(res =>{
      handleResponse(res,true);
    })
  }

 const signnOut = ()=>{
  handleSignnOut()
  .then(res =>{
    handleResponse(res,false);
  })
 }
   
 const handleResponse = (res,redirect)=>{
  setUser(res);
  setLoggedInUser(res);
  if(redirect){
    history.replace(from);
  }

 }

 const handleBlur = (e) => {
   let isFormValid = true;
   if(e.target.name === 'email'){
    isFormValid = /\S+@\S+\.\S+/.test(e.target.value);

   }
   if(e.target.name === 'password'){
    const isPsswordValid = e.target.value.length > 6; 
    const passwordHasNumber = /\d{1}/.test(e.target.value);
    isFormValid = isPsswordValid && passwordHasNumber;
  }
  if(isFormValid){
    //[...cart, newItem] array te new element add kora
    const newUserInfo = {...user};
    newUserInfo[e.target.name] = e.target.value;
    setUser(newUserInfo);


  }


}

 const handleSubmit = (e) => {
   if(newUser && user.email && user.password){
   
       createUserWithEmailAndPassword(user.name, user.email, user.password)
       .then(res => {
        handleResponse(res,true);
       })

   }
 

   if(!newUser  && user.email && user.password ){
    
      signInUserWithEmailAndPassword(user.email, user.password)
      .then(res => {
        handleResponse(res,true);
       })
   }
   e.preventDefault();
 }
  return (
    <div style={{textAlign: 'center'}}>
    { 
    user.isSignedIn ? <button onClick={signnOut}>Sign Out</button> :
      <button onClick={googleSignIn}>Sign in</button>
    }
    {
      user.isSignedIn && 
      <div> 
        <p>Welcome, {user.name}</p>
        <p>Your Email: {user.email}</p>
        <img src={user.photo} alt=''></img>
        
        
        </div>
    }
    <h1>Our Own Anthentication</h1>
    <input type="checkbox" onChange={()=>setNewUser(!newUser)} name="newUser" id=""/>
    <label htmlFor="newUser">New User Sign up</label>
    <form onSubmit={handleSubmit}>
    { newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Your Name"/>}
    <br/>
    <input type="text" name="email" onBlur={handleBlur} placeholder="Your Email Address" required/>
    <br/>
    <input type="password" onBlur={handleBlur} name="password" placeholder="Password" required/>
    <br/>
    <input type="submit"  value={newUser ? 'Sign up' : 'Sign in'}/>
    </form>
    <p style={{color:'red'}}>{user.error}</p>
    {
      user.success &&   <p style={{color:'green'}}>User Successfully {newUser ? 'Created' : 'Logged in'}.</p>
    }
    </div>
  );
}

export default Login;
