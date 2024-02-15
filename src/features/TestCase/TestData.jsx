import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function TestData() {
  const [rows, setRows] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [reload, setReload] = useState(false);

  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /// get
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

  //edit
  const updateRow = async () => {
    // This requestData should match the structure expected by your backend.
    const requestData = {
      userId: userId, // Assuming the 'id' field is used by your backend
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
    setUserId(row.userId); // Assuming `row.userId` should be the value for the input field, you might need to adjust this if `userId` should be something else.
    setEmail(row.email);
    setPassword(row.password);
  };

  //delete
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

  return (
    <>
      <button className="bg-orange-500 flex flex-wrap w-1/12 justify-end">
        <Link to="/app/testtable/createtest">add page</Link>
      </button>
      <div className="container mx-auto px-4 box-border flex flex-col text-center text-3xl text-black">
        <table className="border border-separate border-spacing-2 border-collapse border-slate-500">
          <thead>
            <tr>
              <th className="border border-slate-600 ">ID</th>
              <th className="border border-slate-600">e-Mail</th>
              <th className="border border-slate-600">Password</th>
              <th className=""></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row._id}>
                {editingId === row._id ? (
                  // If in editing mode, render input fields
                  <>
                    <td className="border border-slate-700">
                      <input
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                      />
                    </td>
                    <td className="border border-slate-700">
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </td>
                    <td className="border border-slate-700">
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </td>
                    <td>
                      <button onClick={updateRow}>Save</button>
                      <button onClick={() => setEditingId(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  // If not in editing mode, render row data with Edit button
                  <>
                    <td className="border border-slate-700">{row.userId}</td>
                    <td className="border border-slate-700">{row.email}</td>
                    <td className="border border-slate-700">{row.password}</td>
                    <td>
                      <button
                        className="bg-yellow-500 rounded-lg p-3 me-3 hover:bg-yellow-900 hover:text-white"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          handleEditClick(row);
                        }}
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
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TestData;
