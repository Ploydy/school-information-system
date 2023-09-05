// eslint-disable-next-line @typescript-eslint/no-unused-vars
import router from '../router';
import styles from './app.module.css';
import { RouterProvider } from 'react-router-dom';



export function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
