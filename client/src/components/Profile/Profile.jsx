import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
const axios = require('axios').default;

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  console.log(user);

  // const SERVER = `http://localhost:3000/users/email/${email}`;

  // async function verify() {
  //   try {
  //     const response = await axios.post(SERVER, { email: email, password: password });
  //     if (!response) console.log("Error verifying user");
  //     let userID = response.data.id;
  //     sessionStorage.setItem("id", userID.toString());
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // const handleUserCreation() {

  // }

  return (
    isAuthenticated && (
      <>
        <div id="Profile" class="navbar-item mb-2 ml-4 mr-3 ">
          <img src={user.picture} alt={user.name} id="profile-picture" />
          {/* <h2>{user.name}</h2>
        <p>{user.email}</p> */}
        </div>
      </>
    )
  );
}

{/* <Link onClick={event => {
if (!email || !password) event.preventDefault();
else {
  verify();
  const userID = sessionStorage.getItem("id");
  const SESSION = `http://localhost:3000/login/${userID}`;
  jwt(SESSION);
}
        }} to = {`/join/`}> */}

export default Profile;
