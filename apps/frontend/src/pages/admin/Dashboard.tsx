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

  const handleLogout = () => {
    console.log('someone clicked logout!');
  };

  return (
    <div>
      Dashboard
      {count}
    <button onClick={handleLogout}>logout</button>
    <button onClick={handleIncrement}>increment</button>
    <button onClick={handleDecrenent}>decrement</button>
    </div>
  )
}

export default Dashboard