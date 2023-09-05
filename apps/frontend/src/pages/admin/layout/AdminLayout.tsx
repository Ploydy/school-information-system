import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

function AdminLayout() {
  return (
    <>
      <Header />

        <Outlet />

      <Footer />
    </>


  )
}

export default AdminLayout