import { UserResponse , UserRequest} from "@sis/dto";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

type FormData = {
  id: string,
  email: string,
  fullName: string,
  password: string,
}

function UserForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  
  
  const handleClick = async (user: FormData) => {
    const request: UserRequest = {
      fullName: user.fullName, email: user.email, password: user.password,
      id: ""
    }
    try {
      await axios.post<UserResponse>("http://localhost:3001/user", request);
      navigate("/admin/user");
    } catch (err) {
      console.log(err);
    }
  };

  // getting data
  useEffect(() => {
    axios
      .get('http://localhost:3001/user/' + id)
      .then(res => {
        setValue ('email', res.data.email);
        setValue ('fullName', res.data.fullName);
        setValue ('password', res.data.password);
      })
      .catch(err => console.log(err))
  }, [id])

  return (
    <div className="container card">
      <div className="form-title text-center">
        <h2 className="text-dark">{!id? 'New': 'Update'} User</h2>
        <span className="">Use the below form to create a new user</span>
      </div>

      <form action="/user" method="POST">
        <div className="newUser">
          <div className="">
            <input 
            type="text"  
            placeholder="fullname" 
            {...register('fullName')}
            />
          </div>
          <div className="form-group">
            <input 
            type="text"  
            placeholder="Email" 
            {...register('email')}
            />
          </div>

          <div className="">
            <input
              placeholder="Password"
              type="password"
              {...register('password')}
            />
          </div>

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
          onClick={handleSubmit(handleClick)}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;