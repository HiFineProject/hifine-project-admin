import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";

function CreateTest() {
  const navigate = useNavigate();

  // const [userId, setUserId] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [reload, setReload] = useState(false);

  ///post
  const submitHandler = async (email, password) => {
    const requestData = {
      // userId: userId,
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        "https://testdeployadminbe.onrender.com/users",
        requestData
      );

      if (response.status === 200) {
        setReload(!reload);
      }
    } catch (error) {
      console.error("Failed to add row:", error);
    }
    clearInput();
  };
  ///////////////////////////////////////////////////////////////

  const clearInput = () => {
    // setUserId("");
    setEmail("");
    setPassword("");
  };

  const handleCancel = () => {
    clearInput();
  };

  return (
    <form>
      <button
        type="back"
        onClick={(event) => {
          event.preventDefault();
          navigate("/app/testtable");
        }}
        className="text-5xl text-gray-500"
      >
        <IoArrowBackCircleSharp />
      </button>
      {/* <BackButton /> */}
      <div className="bg-white font-bold h-[320px] ">
        <br />
        {/* <div className="flex flex-row items-center text-end ">
          <h2 className="w-2/5 text-2xl pe-20">No. :</h2>
          <div className="w-1/5">
            <input
              type="text"
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
              placeholder="ID"
            />
          </div>
        </div> */}

        <br />
        <div className="flex flex-row items-center text-end">
          <h2 className="w-2/5 text-2xl pe-20">e-Mail :</h2>
          <div className="w-2/5">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="e-Mail"
            />
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
          </div>
        </div>

        <div className="flex justify-around mt-8 ">
          <button
            className="bg-green-500 rounded-md p-3 hover:bg-green-900 hover:text-white"
            onClick={(e) => {
              e.preventDefault();
              submitHandler(email, password);
            }}
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

export default CreateTest;
