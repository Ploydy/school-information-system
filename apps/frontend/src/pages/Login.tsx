import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import axios from 'axios'
import { LoginRequest, LoginResponse } from '@sis/dto'

type FormData = {
  email: string,
  password: string
};

export default function Login() {

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleLogin = async (data: FormData) => {
    const request: LoginRequest = { username: data.email, password: data.password }

    const result = await axios.post<LoginResponse, any, LoginRequest>('http://localhost:3001/user/login', request)
    if (result.status === 200) {
      navigate('/admin')
    } else {
      alert('Incorrect credentials')
    }
    
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            {...register('email')}

          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            {...register('password')}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSubmit(handleLogin)}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  )
};

