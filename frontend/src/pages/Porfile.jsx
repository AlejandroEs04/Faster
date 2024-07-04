import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import PorfileInfo from "../components/PorfileInfo";

const Porfile = () => {
  const { auth } = useAuth();

  return (
    <div>
      <div className="flex flex-col items-center py-10 border-b">
        <h1 className="text-2xl uppercase text-sky-600 font-bold px-4">Perfil, <span className="text-neutral-600">{auth.name + ' ' + auth.lastName}</span></h1>
        <div className="flex justify-around my-10 w-full px-2 md:w-2/3 xl:w-1/2 gap-4 flex-wrap">
          <PorfileInfo 
            link={'orders'}
            text={'Ve la informacion de tus pedidos, comprar de nuevo o devoluciones'}
            name={'Mis pedidos'}
          />

          <PorfileInfo 
            link={'data'}
            text={'Revisa, cambia tu nombre, correo, numero de telefono movil, contraseña, etc.'}
            name={'Inicio de resion y seguridad'}
          />

          <PorfileInfo 
            link={'address'}
            text={'Revisa, cambia tu direccion para tus pedidos'}
            name={'Mi direccion'}
          />
        </div>

        <div className="flex flex-col items-center">
          <h2 className="font-medium text-2xl text-neutral-600 text-center uppercase">Acerca de</h2>
          <Link to={'/support'} className="flex justify-center my-5 w-full px-2 md:w-2/3 xl:w-1/2 flex-wrap hover:shadow-xl bg-white min-w-56 shadow transition-shadow rounded">
            <div className="flex flex-col items-center gap-2 p-5">
              <div className="flex justify-start items-center gap-2">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                  </svg>
                </div>
                <p className="text-lg font-bold text-neutral-600">Atencion al cliente</p>
              </div>

              <p>Contacta a nuestro servicio al cliente en caso de una inconeviencia</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Porfile
