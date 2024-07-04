import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import useShop from "../hooks/useShop";
import Slider from "../components/Slider";

const RutaProtegida = () => {
    const { auth, loading } = useAuth();
    const { slider } = useShop();

    if(loading) return <Loader />
    
    return (
        <>
            {auth.ID ? (
                <>
                    {slider && (
                        <Slider />
                    )}
                    <main className='bg-neutral-100'>
                        <Header />

                        <div>
                            <Outlet />
                        </div>

                        <Footer />
                
                        <ToastContainer />
                    </main>
                </>
            ) : <Navigate to="/login" />}
        </>
    )
}

export default RutaProtegida
