import React from "react";
import Styles from "./MyUser.module.css"; // Import CSS as a module

function MyUser() {
  const [users, setUsers] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [loadUser, setLoadUser] = React.useState(0);

  const handlePageChange = (newPage) => {
    if (loadUser === 0) {
      newPage -= 1;
    }
    if (newPage < 1) {
      newPage = 1;
    }
    setPage(newPage);
  };

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `https://usersapp-vhoy.onrender.com/api/users?page=${page}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setLoadUser(data.length);
        setUsers((users) => [...data]);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [page]);

  return (
    <>
      <div className={Styles.paginationControls}>
        <button onClick={() => handlePageChange(page - 1)}>Prev</button>
        <input type="text" value={page} readOnly />
        <button onClick={() => handlePageChange(page + 1)}>Next</button>
      </div>

      <table className={Styles.userTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.hashpassword}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default MyUser;
