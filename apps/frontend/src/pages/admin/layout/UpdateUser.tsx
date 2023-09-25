import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
}

function UpdateUser() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<User>({
    id: "",
    fullName: "",
    email: '',
    password: "",
  });

  // getting data
  useEffect(() => {
    axios
      .get<User>('http://localhost:3001/user/' + id)
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [id])

  // onsubmit
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    axios
      .put('http://localhost:3001/user/' + id, data)
      .then(res => {
        navigate("/admin/user");
      })
  }

  return (
    <div className="container card">
      <div className="form-title text-center">
        <h2 className="text-dark">Update User</h2>
        <span className="">Use the below form to update a user</span>
      </div>

      <form>
        <div className="newUser">

          <div className="form-group">
            <input
              disabled
              value={data.id}
            >
            </input>
          </div>

          <div className="form-group">
            <input
              type="text"
              value={data.fullName}
              placeholder="Fullname"
              onChange={e => setData({ ...data, fullName: e.target.value })}
            >
            </input>
          </div>


          <div className="form-group">
            <input
              type="text"
              value={data.email}
              placeholder="Email"
              onChange={e => setData({ ...data, email: (e.target.value) })}
            >
            </input>
          </div>

          <div className="form-control mt-3">
            <input
              type="password"
              placeholder="Password"
              value={data.password}
              onChange={e => setData({ ...data, password: e.target.value })}
            />
          </div>

          <button className="btn btn-info Save" onClick={handleClick} >Save</button>

        </div>


      </form>

    </div>
  )

};

export default UpdateUser;