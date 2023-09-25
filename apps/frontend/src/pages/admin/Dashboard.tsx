import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { increment, decrement } from '../../state/slices/counterSlice';

function Dashboard() {

  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  const handleIncrement = () => {
    dispatch(increment())
  };
  const handleDecrenent = () => {
    dispatch(decrement())
  };

 
  return (
    <div>
      <div className='bg-indigo-500 p-2 font-mono'>
      <h1>Dashboard</h1>
      </div>
        {count}
      <div>

        <button onClick={handleIncrement}>increment 1</button>
      </div>
        <button onClick={handleDecrenent}>decrement 1</button>
      
    </div>
  )
}

export default Dashboard