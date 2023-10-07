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
        <Link to="/admin/user/new">
          <button className="">Add a new User</button>
        </Link>
        <table className="">
          <thead>
            <tr>
              <th className="border w-1/5 px-1 py-2" scope="col">Id</th>
              <th className="border w-1/5 px-1 py-2" scope="col">User</th>
              <th className="border w-1/5 px-1 py-2" scope="col">email</th>
              <th className="border w-1/5 px-1 py-2" scope="col">password</th>
              <th className="border w-1/5 px-1 py-2" scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <th className="border px-4 py-2" scope="row">{user.id}</th>
                <td className="border px-4 py-2 text-center">{user.fullName}</td>
                <td className="border px-4 py-2 text-center">{user.email}</td>
                <td className="border px-4 py-2 text-center">{user.password}</td>
                <td className="border px-4 py-2 text-center">
                  <Link to={`/admin/user/${user.id}`}>
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