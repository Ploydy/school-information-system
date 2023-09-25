import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface User {
  id: number;
  fullName: string;
  email: string;
  password: string;
}

export default function User() {
  const [users, setUsers] = useState<User[]>([]);

  const handleDelete = async (id: number) => {
    if (
      window.confirm("Are you sure you want to remove this user?") === true
    ) {
      const result = await fetch(`http://localhost:3001/user/${id}`, {
        method: "DELETE",
      });
      getUsers();
    }
  };

  const getUsers = async () => {
    // get
    const result = await fetch("http://localhost:3001/user");
    const res = await result.json();
    setUsers(res);
  };

  useEffect(() => {
    (async () => {
      getUsers();
    })();
  }, []);

  return (
    <div>
      <section>
        <h2>User List</h2>
        <Link to="/admin/AddUser">
          <button className="">Add a new User</button>
        </Link>
        <table className="">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">User</th>
              <th scope="col">email</th>
              <th scope="col">password</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>
                  <Link to={`/admin/updateUser/${user.id}`}>
                    <button
                      className=""
                    >
                      Update
                    </button>
                  </Link>
                  <button
                    className=""
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}