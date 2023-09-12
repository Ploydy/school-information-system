import { useForm } from 'react-hook-form';


type FormData = {
  email: string,
  password: string
};

export default function Login() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleLogin = (data: FormData) => {
    console.log(data);
  };

  return (

     <section>
      <div>
        <input
          placeholder="Email address"
          type="email"
          {...register('email')}
        />
      </div>
      <div>
        <input
          placeholder="Password"
          type="password"
          {...register('password')}
        />
      </div>
      <button onClick={handleSubmit(handleLogin)}>Login</button>
    </section> 
  )
};

