import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { CSVLink } from "react-csv";
import SimpleModal from "../../components/SimpleModal";
import { BiSolidSave } from "react-icons/bi";
import { FaFileCsv } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

function TestData() {
  const [rows, setRows] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [reload, setReload] = useState(false);

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State to hold the ID of the item to be deleted
  const [deleteItemId, setDeleteItemId] = useState(null);

  // const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /// get
  // useEffect(() => {
  //   const getData = async () => {
  //     const response = await axios.get(
  //       "https://testdeployadminbe.onrender.com/users"
  //     );
  //     if (response.status === 200 && response.data) {
  //       setRows(response.data);
  //     }
  //   };

  //   getData();
  // }, [reload]);

  useEffect(() => {
    const getData = async () => {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");

      // Include the token in your request headers
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Make sure this matches the expected format for your backend
        },
      };

      try {
        const response = await axios.get(
          "https://testdeployadminbe.onrender.com/users",
          config
        );
        if (response.status === 200 && response.data) {
          setRows(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        // Handle unauthorized access or other errors here
      }
    };

    getData();
  }, [reload]);

  //edit
  const updateRow = async () => {
    // This requestData should match the structure expected by your backend.
    const requestData = {
      // userId: userId, // Assuming the 'id' field is used by your backend
      email: email,
      password: password,
    };

    try {
      const response = await axios.patch(
        `https://testdeployadminbe.onrender.com/users/${editingId}`,
        requestData
      );
      if (response.status === 200) {
        // Update the local state to reflect the changes.
        setRows(
          rows.map((row) =>
            row._id === editingId ? { ...row, ...requestData } : row
          )
        );
        setEditingId(null); // Reset editingId to stop showing the input fields.
        setReload(!reload); // Trigger a re-fetch of data if necessary.
      }
    } catch (error) {
      console.error("Failed to save the updated row:", error);
    }
  };

  //handler edit btn
  const handleEditClick = (row) => {
    setEditingId(row._id); // Make sure to use the correct identifier here, it might be `row._id` if you're using MongoDB
    // setUserId(row.userId); // Assuming `row.userId` should be the value for the input field, you might need to adjust this if `userId` should be something else.
    setEmail(row.email);
    setPassword(row.password);
  };

  //delete
  // const deleteRow = async (id) => {
  //   try {
  //     const response = await axios.delete(
  //       `https://testdeployadminbe.onrender.com/users/${id}`
  //     );
  //     if (response.status === 200) {
  //       setReload(!reload);
  //     }
  //   } catch (error) {
  //     console.error("Failed to delete row:", error);
  //   }
  //   console.log(`Deleting item with ID: ${deleteItemId}`);
  //   // After deletion logic, close the modal
  //   setIsModalOpen(false);
  //   // Reset deleteItemId or perform further state updates as necessary
  // };
  const confirmDelete = async () => {
    if (deleteItemId) {
      try {
        await axios.delete(
          `https://testdeployadminbe.onrender.com/users/${deleteItemId}`
        );
        setReload(!reload); // Refresh data
        console.log(`Item with ID: ${deleteItemId} deleted`);
      } catch (error) {
        console.error("Failed to delete row:", error);
      }
    }
    setIsModalOpen(false); // Close the modal
    setDeleteItemId(null); // Reset the stored ID
  };
  // Function to call when the delete button is clicked
  const showDeleteConfirmation = (id) => {
    setIsModalOpen(true);
    setDeleteItemId(id);
  };

  ////////////////////////////////////////////////////

  return (
    <>
      <div className="container bg-white mx-auto py-5 px-5 flex flex-col text-center text-2xl text-black shadow-2xl rounded-lg ">
        <div className="flex justify-between mb-3">
          {/* CSV to Export */}
          <CSVLink
            data={rows}
            className="csv-button bg-green-500 rounded-lg  hover:bg-yellow-900 hover:text-white  flex justify-center items-end grow-0 w-[44px] pb-1"
          >
            <div>
              <FaFileCsv />
            </div>
          </CSVLink>

          {/* Create */}
          <Link
            to="/app/testtable/createtest"
            className="bg-green-500 rounded-lg  hover:bg-green-900 hover:text-white  flex justify-center items-end grow-0 w-1/12 pb-1"
          >
            <button>
              <IoIosAddCircle />
            </button>
          </Link>
        </div>
        <table className="border border-separate  border-collapse border-slate-500 table-fixed ">
          <thead className="text-2xl border border-slate-400 text-gray-800">
            <tr className="">
              {/* <th className="border border-slate-300 ">ID</th> */}
              <th className="border border-slate-300">email</th>
              <th className="border border-slate-300">Password</th>
              <th className=""></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row._id}>
                {editingId === row._id ? (
                  // If in editing mode, render input fields
                  <>
                    {/* <td>
                      <input
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                      />
                    </td> */}
                    <td>
                      <input
                        className="text-start text-lg"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        className="text-start text-lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </td>

                    <td>
                      <button
                        onClick={updateRow}
                        className="bg-green-500 rounded-lg p-3 me-3 hover:bg-green-900 hover:text-white"
                      >
                        <BiSolidSave />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-orange-500 rounded-lg p-3 me-2 hover:bg-orange-900 hover:text-white"
                      >
                        <MdCancel />
                      </button>
                    </td>
                  </>
                ) : (
                  // If not in editing mode, render row data with Edit button
                  <>
                    {/* <td className="border border-slate-300">{row.userId}</td> */}
                    <td className="border border-slate-300 text-start text-lg">
                      {row.email}
                    </td>
                    <td className="border border-slate-300 text-start text-lg">
                      {row.password}
                    </td>
                    <td>
                      <button
                        className="bg-yellow-500 rounded-lg p-3 me-3 hover:bg-yellow-900 hover:text-white"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          handleEditClick(row);
                        }}
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="bg-red-500 rounded-lg p-3 hover:bg-red-900 hover:text-white"
                        // onClick={() => deleteRow(row._id)}
                        onClick={() => showDeleteConfirmation(row._id)}
                      >
                        <MdDeleteForever />
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <SimpleModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={confirmDelete} // Use confirmDelete here
        >
          Are you sure you want to delete this item?
        </SimpleModal>
      </div>
    </>
  );
}

export default TestData;
