import axios from "axios";
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  fullName: string;
  email: string;
  password: string;
}

function AddUser() {
  const [user, setUser] = useState<User>({
    fullName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/user", user);
      navigate("/admin/user");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container card">
      <div className="form-title text-center">
        <h2 className="text-dark">New User</h2>
        <span className="">Use the below form to create a new user</span>
      </div>

      <form action="/user" method="POST">
        <div className="newUser">
          <div className="">
            <input type="text" name="fullName" onChange={handleChange} placeholder="fullname" />
          </div>
          <div className="form-group">
            <input type="text" name="email" onChange={handleChange} placeholder="Email" />
          </div>

          <div className="">
            <input
              className="form-control"
              placeholder="Password"
              type="password"
              name="password"
              onChange={handleChange}
            />
          </div>

          <button className="" onClick={handleClick}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddUser;