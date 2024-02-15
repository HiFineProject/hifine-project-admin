import { useState, useEffect } from "react";
import axios from "axios";

function DataTableTable() {
  const [rows, setRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [reload, setReload] = useState(false);
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        "https://testdeployadminbe.onrender.com/users"
      );
      if (response.status === 200 && response.data) {
        setRows(response.data);
      }
    };
    getData();
  }, [reload]);

  const handleAddOrUpdateRow = async () => {
    const requestData = { userId, email, password };
    try {
      let response;
      if (editingId) {
        response = await axios.patch(
          `https://testdeployadminbe.onrender.com/users/${editingId}`,
          requestData
        );
      } else {
        response = await axios.post(
          "https://testdeployadminbe.onrender.com/users",
          requestData
        );
      }
      if (response.status === 200) {
        setReload(!reload);
      }
    } catch (error) {
      console.error("Failed to add/update row:", error);
    }
    clearForm();
    setIsModalOpen(false);
  };

  const clearForm = () => {
    setUserId("");
    setEmail("");
    setPassword("");
    setEditingId(null);
  };

  const deleteRow = async (id) => {
    try {
      const response = await axios.delete(
        `https://testdeployadminbe.onrender.com/users/${id}`
      );
      if (response.status === 200) {
        setReload(!reload);
      }
    } catch (error) {
      console.error("Failed to delete row:", error);
    }
  };

  const handleCancel = () => {
    clearForm();
    setIsModalOpen(false);
  };

  const handleEditClick = (row) => {
    setUserId(row.userId); // Assuming `row.userId` should be the value for the input field, you might need to adjust this if `userId` should be something else.
    setEmail(row.email);
    setPassword(row.password);
    setEditingId(row._id); // Make sure to use the correct identifier here, it might be `row._id` if you're using MongoDB
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 box-border flex flex-col text-center text-3xl text-black">
      {/* Create button */}
      <button
        className="grid justify-items-center p-3 bg-blue-700 mt-5 rounded-lg text-white hover:bg-sky-500 hover:text-black"
        type="button"
        onClick={() => {
          setIsModalOpen(true);
          clearForm(); // Clear form for new entries
        }}
      >
        Create
      </button>

      {/* Form for adding or updating */}
      {isModalOpen && (
        <div className="modal">
          {/* Form fields */}
          <div className="flex flex-row items-center text-center">
            <h2 className="w-2/5">No. :</h2>
            <div className="w-1/5">
              <input
                type="number"
                placeholder="ID"
                onChange={(e) => {
                  setUserId(e.target.value);
                }}
                value={userId}
                required
              />
            </div>
          </div>
          <br />
          <div className="flex flex-row items-center">
            <h2 className="w-2/5">e-Mail :</h2>
            <div className="w-2/5">
              <input
                type="email"
                placeholder="enter your email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                required
              />
            </div>
          </div>
          <br />
          <div className="flex flex-row items-center">
            <h2 className="w-2/5">Password :</h2>
            <div className="w-2/5">
              <input
                type="password"
                placeholder="enter your Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                required
              />
            </div>
          </div>
          {/* Email and password inputs remain the same */}

          {/* Submit and Cancel buttons */}
          <div className="flex justify-around mt-8">
            <button
              className="bg-green-500 rounded-md p-3 hover:bg-green-900 hover:text-white"
              onClick={(e) => {
                e.preventDefault();
                handleAddOrUpdateRow();
              }}
            >
              Submit
            </button>
            <button
              className="bg-red-500 rounded-md p-3 hover:bg-red-900 hover:text-white"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Table to display rows */}
      <table className="border border-separate border-spacing-2 border-collapse border-slate-500">
        <thead>{/* Table headers */}</thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row._id}>
              <td className="border border-slate-700">{row.userId}</td>
              <td className="border border-slate-700">{row.email}</td>
              <td className="border border-slate-700">{row.password}</td>
              <td>
                <button
                  className="bg-yellow-500 rounded-lg p-3 me-3 hover:bg-yellow-900 hover:text-white"
                  onClick={() => handleEditClick(row)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 rounded-lg p-3 hover:bg-red-900 hover:text-white"
                  onClick={() => deleteRow(row._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTableTable;
