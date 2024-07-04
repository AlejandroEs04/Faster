import { Link } from "react-router-dom";
import useShop from "../hooks/useShop";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";

const Slider = () => {
  const [size, setSize] = useState(0);
  const { setSlider, slider } = useShop();
  const { auth, logOut } = useAuth();

  useEffect(() => {
    if (slider) {
      setSize(100);
    } else {
      setSize(0);
    }
  }, []);

  return (
    <div className="top-0 absolute z-40 w-full h-full">
      <div className="sticky top-0">
        <div
          style={{
            width: `${size}%`,
          }}
          className="bg-neutral-300 w-full flex md:hidden z-50 flex-col items-end text-end p-10 h-screen max-w-md transition-all ease-in-out duration-150"
        >
          <button
            onClick={() => setSlider(false)}
            className=" flex justify-end mb-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
          <nav className="flex flex-col gap-1">
            <h2 className="uppercase text-3xl text-sky-600 mb-5">Menú</h2>
            <button onClick={() => setSlider(false)} className="text-end">
              <Link to={"/"} className="text-neutral-700 text-2xl">
                Inicio
              </Link>
            </button>

            <button onClick={() => setSlider(false)} className="text-end">
              <Link to={"/products"} className="text-neutral-700 text-2xl">
                Productos
              </Link>
            </button>

            <button onClick={() => setSlider(false)} className="text-end">
              <Link
                to="/user/cart"
                className="flex items-center justify-end gap-1 text-neutral-700 text-2xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
                <p>Carrito</p>
              </Link>
            </button>

            {auth.ID && (
              <button onClick={() => setSlider(false)} className="text-end">
                <Link
                  to={!auth.admin ? "/user/porfile" : "/admin"}
                  className="flex items-center justify-end text-neutral-700 text-2xl"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <p>Porfile</p>
                </Link>
              </button>
            )}

            {!auth.ID ? (
              <button onClick={() => setSlider(false)} className="text-end">
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-sky-500 to-sky-700 bg-clip-text text-transparent font-bold hover:text-sky-800 text-2xl transition-colors"
                >
                  Iniciar Sesion
                </Link>
              </button>
            ) : (
              <button
                onClick={() => {
                  logOut();
                  setSlider(false);
                }}
                className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent font-bold hover:text-red-700 text-2xl text-start transition-colors"
              >
                Cerrar Sesion
              </button>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Slider;
