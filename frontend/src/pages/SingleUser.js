import { useState } from "react";
import axios from "axios";
export default function SingleUser({ prop, status }) {
  const [deleted, isDeleted] = useState(false);
  const [error, setError] = useState({ truth: false, msg: "" });
  const handleRemove = async () => {
    const jwt = localStorage.getItem("jwt");

    const response = await axios.delete(
      `http://localhost:8888/api/admin/users/${prop}`,
      { headers: { Authorization: `Bearer ${jwt}` } }
    );
    const { success, msg } = response.data;

    if (!success) {
      setError({ truth: true, msg: msg });
      return;
    }
    isDeleted(true);
  };
  return (
    <>
      {deleted ? null : (
        <tr>
          <td>{prop}</td>
          <td>{status}</td>

          <td>
            <button
              type="button"
              onClick={handleRemove}
              className="btn btn-danger"
            >
              Ban Account
            </button>
            <div style={{ color: "red" }}>{error.truth ? error.msg : null}</div>
          </td>
        </tr>
      )}
    </>
  );
}
