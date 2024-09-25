import React, { useRef, useState } from "react";

function Signup() {
  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let ageInputRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let mobileNoInputRef = useRef();
  let profilePicInputRef = useRef();
  let [profilePic, setprofilePic] = useState("./images/noimage.jpg");

  let onSignupJSON = async () => {
    let myHeader = new Headers();
    myHeader.append("content-type", "application/json");

    let dataToSend = {
      firstName: firstNameInputRef.current.value,
      lastName: lastNameInputRef.current.value,
      age: ageInputRef.current.value,
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
      mobileNo: mobileNoInputRef.current.value,
    };
    let reqOptions = {
      method: "POST",
      headers: myHeader,
      body: JSON.stringify(dataToSend),
    };
    let JSONData = await fetch("http://localhost:4567/signup", reqOptions);
    let JSOData = await JSONData.json();

    console.log(JSOData);
    alert(JSOData.msg);
  };
  let onSignupURlEncoded = async () => {
    let myHeaders = new Headers();
    myHeaders.append("content-type", "application/x-www-form-urlencoded");
    let dataToSend = new URLSearchParams();
    dataToSend.append("firstName", firstNameInputRef.current.value);
    dataToSend.append("lastName", lastNameInputRef.current.value);
    dataToSend.append("age", ageInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);
    dataToSend.append("mobileNo", mobileNoInputRef.current.value);
    let reqOptions = {
      method: "POST",
      headers: myHeaders,
      body: dataToSend,
    };
    let JSONData = await fetch("http://localhost:4567/signup", reqOptions);
    let JSOData = await JSONData.json();

    console.log(JSOData);
    alert(JSOData.msg);
  };

  let onSignupFD = async () => {
    let dataToSend = new FormData();
    dataToSend.append("firstName", firstNameInputRef.current.value);
    dataToSend.append("lastName", lastNameInputRef.current.value);
    dataToSend.append("age", ageInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);
    dataToSend.append("mobileNo", mobileNoInputRef.current.value);

    for (let i = 0; i < profilePicInputRef.current.files.length; i++) {
      dataToSend.append("profilePic", profilePicInputRef.current.files[i]);
    }
    let reqOptions = {
      method: "POST",
      body: dataToSend,
    };
    let JSONData = await fetch("http://localhost:4567/signup", reqOptions);
    let JSOData = await JSONData.json();

    console.log(JSOData);
    alert(JSOData.msg);
  };

  return (
    <div>
      <form>
        <div>
          <label>First Name</label>
          <input ref={firstNameInputRef}></input>
        </div>
        <div>
          <label>Last Name</label>
          <input ref={lastNameInputRef}></input>
        </div>
        <div>
          <label>Age</label>
          <input ref={ageInputRef}></input>
        </div>
        <div>
          <label>Email</label>
          <input ref={emailInputRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordInputRef}></input>
        </div>
        <div>
          <label>Mobile Number</label>
          <input ref={mobileNoInputRef}></input>
        </div>
        <div>
          <label>Profile Pic</label>
          <input
            ref={profilePicInputRef}
            type="file"
            accept="image/*"
            onChange={(eventObj) => {
              let selectedImagePath = URL.createObjectURL(
                eventObj.target.files[0]
              );
              setprofilePic(selectedImagePath);
            }}
          ></input>
          <br></br>
          <img class="profilePicPreview" src={profilePic}></img>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              onSignupJSON();
            }}
          >
            Signup(JSON)
          </button>

          <button
            type="button"
            onClick={() => {
              onSignupURlEncoded();
            }}
          >
            Signup(URL Encoded)
          </button>
          <button
            type="button"
            onClick={() => {
              onSignupFD();
            }}
          >
            Signup(Form)
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
