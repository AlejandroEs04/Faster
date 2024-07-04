import { Outlet, Navigate } from 'react-router-dom'
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader";
import AdminHeader from '../components/AdminHeader'
import { AdminProvider } from '../context/AdminProvider'
import useShop from '../hooks/useShop';
import AdminSlider from '../components/AdminSlider';
import ConfirmModal from '../components/ConfirmModal';

const AdminLayout = () => {
  const { auth, loading } = useAuth();
  const { setSlider, slider } = useShop()

  if(loading) return <Loader />

  return (
    <>
      {auth.ID && auth.admin ? (
        <AdminProvider>
          {slider && (
            <AdminSlider />
          )}

          <main className='bg-neutral-100'>
            <AdminHeader />
            <div>
              <Outlet />
            </div>
          </main>
        </AdminProvider> 
      ) : <Navigate to="/" />}
    </>
  )
}

export default AdminLayout
