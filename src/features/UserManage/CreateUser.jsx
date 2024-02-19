import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";

function CreateUser() {
  const navigate = useNavigate();

  // const [userId, setUserId] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [displayName, setdisplayName] = useState("");
  const [profileImage, setprofileImage] = useState("");
  const [public_id, setpublic_id] = useState("");

  const [reload, setReload] = useState(false);

  // State variables for validation errors
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  ///post
  //   const submitHandler = async (email, password) => {
  //     const requestData = {

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!validateFields()) {
      return;
    }
    const requestData = {
      email,
      password,
      displayName,
      profileImage,
      public_id,
    };
    try {
      const response = await axios.post(
        "https://testdeployadminbe.onrender.com/users",
        requestData
      );
      if (response.status === 200) {
        alert("Complete to create");
        setReload(!reload);
        clearInput();
      }
    } catch (error) {
      console.error("Failed to add row:", error);
    }
  };
  ///////////////////////////////////////////////////////////////

  const clearInput = () => {
    // setUserId("");
    setEmail("");
    setPassword("");
    setdisplayName("");
    setprofileImage("");
    setpublic_id("");
  };

  const handleCancel = () => {
    clearInput();
  };

  // ... other functions ...

  const validateFields = () => {
    let isValid = true;

    // Reset validation errors
    setEmailError("");
    setPasswordError("");

    // Email validation (simple example)
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }

    // Password validation (simple example)
    if (!password || password.length < 6) {
      setPasswordError("Password must be at least 7 characters long.");
      isValid = false;
    }
    // ... additional validations ...

    return isValid;
  };

  return (
    <form onSubmit={submitHandler}>
      <button
        type="back"
        onClick={(event) => {
          event.preventDefault();
          navigate("/app/usermanage");
        }}
        className="text-5xl text-gray-500"
      >
        <IoArrowBackCircleSharp />
      </button>
      {/* <BackButton /> */}
      <div className="bg-white font-bold h-[520px] ">
        <br />

        <br />
        <div className="flex flex-row items-center text-end">
          <h2 className="w-2/5 text-2xl pe-20">e-Mail :</h2>
          <div className="w-2/5">
            <input
              type="email"
              name="email"
              value={email || ""}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="e-Mail"
            />
            {emailError && <p className="text-red-500">{emailError}</p>}
          </div>
        </div>

        <br />
        <div className="flex flex-row items-center text-end">
          <h2 className="w-2/5 text-2xl pe-20">Password :</h2>
          <div className="w-2/5">
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
            />
            {passwordError && <p className="text-red-500">{passwordError}</p>}
          </div>
        </div>
        <br />
        <div className="flex flex-row items-center text-end">
          <h2 className="w-2/5 text-2xl pe-20">displayName :</h2>
          <div className="w-2/5">
            <input
              type="text"
              value={displayName}
              onChange={(event) => setdisplayName(event.target.value)}
              placeholder="displayName"
            />
          </div>
        </div>
        <br />
        <div className="flex flex-row items-center text-end">
          <h2 className="w-2/5 text-2xl pe-20">profileImage :</h2>
          <div className="w-2/5">
            <input
              type="text"
              value={profileImage}
              onChange={(event) => setprofileImage(event.target.value)}
              placeholder="profileImage"
            />
          </div>
        </div>
        <br />
        <div className="flex flex-row items-center text-end">
          <h2 className="w-2/5 text-2xl pe-20">public_id :</h2>
          <div className="w-2/5">
            <input
              type="text"
              value={public_id}
              onChange={(event) => setpublic_id(event.target.value)}
              placeholder="public_id"
            />
          </div>
        </div>

        <div className="flex justify-around mt-8 ">
          <button
            type="submit"
            className="bg-green-500 rounded-md p-3 hover:bg-green-900 hover:text-white"
          >
            Submit
          </button>
          <button
            type="button"
            className="bg-red-500 rounded-md p-3 hover:bg-red-900 hover:text-white"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

export default CreateUser;
