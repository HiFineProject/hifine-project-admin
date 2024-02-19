import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";

function CreatePost() {
  const navigate = useNavigate();

  // const [userId, setUserId] = useState();
  const [description, setDescription] = useState("");
  const [hour, setHour] = useState("");
  const [min, setMin] = useState("");
  const [km, setKM] = useState("");
  const [m, setM] = useState("");
  const [activityType, setActivityType] = useState("");
  const [public_id, setPublic_id] = useState("");
  const [secure_url, setSecure_url] = useState("");
  //   const [_id, set_id] = useState("");
  //   const [userId, setuserId] = useState("");

  const [reload, setReload] = useState(false);

  // State variables for validation errors
  //   const [emailError, setEmailError] = useState("");
  //   const [passwordError, setPasswordError] = useState("");

  ///post
  //   const submitHandler = async (email, password) => {
  //     const requestData = {

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!validateFields()) {
      return;
    }
    const requestData = {
      description,
      hour,
      min,
      km,
      m,
      activityType,
      public_id,
      secure_url,
      //   _id,
      //   userId,
    };
    try {
      const response = await axios.post(
        "https://testdeployadminbe.onrender.com/posts",
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
    setDescription();
    setHour();
    setMin();
    setKM();
    setM();
    setActivityType();
    setPublic_id();
    setSecure_url();
    // set_id();
    // setuserId();
  };

  const handleCancel = () => {
    clearInput();
  };

  // ... other functions ...

  const validateFields = () => {
    let isValid = true;

    // Reset validation errors
    setDescription();
    setHour();
    setMin();
    setKM();
    setM();
    setActivityType();
    setPublic_id();
    setSecure_url();
    // set_id();
    // setuserId();

    // Email validation (simple example)
    // if (!email || !/\S+@\S+\.\S+/.test(email)) {
    //   setEmailError("Please enter a valid email address.");
    //   isValid = false;
    // }

    // Password validation (simple example)
    // if (!password || password.length < 6) {
    //   setPasswordError("Password must be at least 7 characters long.");
    //   isValid = false;
    // }
    // ... additional validations ...

    return isValid;
  };

  return (
    <form onSubmit={submitHandler}>
      <button
        type="back"
        onClick={(event) => {
          event.preventDefault();
          navigate("/app/postmanage");
        }}
        className="text-5xl text-gray-500"
      >
        <IoArrowBackCircleSharp />
      </button>
      {/* <BackButton /> */}
      <div className="bg-white font-bold h-[800px] ">
        <br />

        <br />
        <div className="flex flex-row items-center text-end">
          <h2 className="w-2/5 text-2xl pe-20">Description :</h2>
          <div className="w-2/5">
            <input
              type="text"
              name="email"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="description"
            />
            {/* {emailError && <p className="text-red-500">{emailError}</p>} */}
          </div>
        </div>

        <br />
        <div className="flex flex-row items-center text-end">
          <h2 className="w-2/5 text-2xl pe-20">Hour :</h2>
          <div className="w-2/5">
            <input
              type="number"
              value={hour}
              onChange={(event) => setHour(event.target.value)}
              placeholder="hour"
            />
            {/* {passwordError && <p className="text-red-500">{passwordError}</p>} */}
          </div>
        </div>
        <br />
        <div className="flex flex-row items-center text-end">
          <h2 className="w-2/5 text-2xl pe-20">Min :</h2>
          <div className="w-2/5">
            <input
              type="number"
              value={min}
              onChange={(event) => setMin(event.target.value)}
              placeholder="min"
            />
          </div>
        </div>
        <br />
        <div className="flex flex-row items-center text-end">
          <h2 className="w-2/5 text-2xl pe-20">KM :</h2>
          <div className="w-2/5">
            <input
              type="number"
              value={km}
              onChange={(event) => setKM(event.target.value)}
              placeholder="km"
            />
          </div>
        </div>
        <br />
        <div className="flex flex-row items-center text-end">
          <h2 className="w-2/5 text-2xl pe-20">M :</h2>
          <div className="w-2/5">
            <input
              type="number"
              value={m}
              onChange={(event) => setM(event.target.value)}
              placeholder="m"
            />
          </div>
        </div>
        <br />
        <div className="flex flex-row items-center text-end">
          <h2 className="w-2/5 text-2xl pe-20">ActivityType :</h2>
          <div className="w-2/5">
            <input
              type="text"
              value={activityType}
              onChange={(event) => setActivityType(event.target.value)}
              placeholder="activityType"
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
              onChange={(event) => setPublic_id(event.target.value)}
              placeholder="public_id"
            />
          </div>
        </div>
        <br />
        <div className="flex flex-row items-center text-end">
          <h2 className="w-2/5 text-2xl pe-20">secure_url :</h2>
          <div className="w-2/5">
            <input
              type="text"
              value={secure_url}
              onChange={(event) => setSecure_url(event.target.value)}
              placeholder="secure_url"
            />
          </div>
        </div>
        {/* <br />
        <div className="flex flex-row items-center text-end">
          <h2 className="w-2/5 text-2xl pe-20">_id :</h2>
          <div className="w-2/5">
            <input
              type="text"
              value={_id}
              onChange={(event) => set_id(event.target.value)}
              placeholder="_id"
            />
          </div>
        </div> */}
        {/* <br />
        <div className="flex flex-row items-center text-end">
          <h2 className="w-2/5 text-2xl pe-20">userId :</h2>
          <div className="w-2/5">
            <input
              type="text"
              value={userId}
              onChange={(event) => setuserId(event.target.value)}
              placeholder="userId"
            />
          </div>
        </div> */}

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

export default CreatePost;
