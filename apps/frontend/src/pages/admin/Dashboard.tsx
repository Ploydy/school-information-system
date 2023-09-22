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
      <div>

        Dashboard
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