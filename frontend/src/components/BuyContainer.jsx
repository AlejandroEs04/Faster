import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { formatearDinero } from "../helpers"
import useAdmin from "../hooks/useAdmin"

const BuyContainer = ({buy, setModal, btn = true, steps = true}) => {
    const [step, setStep] = useState(0)
    
    const {handleOnTheWay, handleDelivered, buys, setDeleteId} = useAdmin();

    const checkStep = () => {
        if(buy.delivery[0].delivered) {
            setStep(100)
        } else if(buy?.delivery[0]?.onTheWay) {
            setStep(50)
        } else {
            setStep(5)
        }
    }

    console.log(buy)

    useEffect(() => {
        checkStep()
    }, [buy, buys])

    return (
        <div className="bg-white p-4 rounded-xl shadow flex flex-col lg:grid lg:grid-cols-2 gap-4 w-full">
            <div>
                <h3 className=" text-lg font-bold uppercase mb-2">Informacion del pedido</h3>
                <p className="font-bold">ID: <span className=" font-normal">{buy.ID}</span></p>
                <p className="font-bold">Total: <span className=" font-normal">{formatearDinero(buy.amount)}</span></p>

                <p className="font-bold mt-2">Informacion del usuario</p>
                <p className="font-bold">Nombre: <span className="font-normal">{buy.user.name + ' ' + buy.user.lastName}</span></p>
                <p className="font-bold">Correo: <span className="font-normal">{buy.user.email}</span></p>
                <p className="font-bold mb-4">Numero: <span className="font-normal">{buy.user.number}</span></p>

                <Link 
                    to={`/buy/${buy.ID}`}
                    className="bg-sky-600 text-neutral-100 px-2 py-1 rounded hover:bg-sky-700"
                >Ver Productos</Link>
            </div>

            <div>
                {steps && (
                    <div>
                        <div className="flex justify-between">
                            <p className=" font-semibold text-sm">Recibido</p> 
                            <p className=" font-semibold text-sm">En camino</p> 
                            <p className=" font-semibold text-sm">Entregado</p> 
                        </div>
                    
                        <div className="w-full h-2 bg-slate-300 rounded">
                            <div
                                style={{
                                    width: step + '%'
                                }}
                                className="bg-amber-500 h-full rounded-lg"
                            ></div>
                        </div>
                    </div>
                )}
                <p className="mt-4 font-bold">Status del pedido</p>
                {buy?.delivery[0]?.delivered ? (
                    <p className=" font-semibold text-green-500">Entregado</p>
                ) : buy.delivery[0].onTheWay ? (
                    <p className=" font-semibold text-amber-500">En camino</p>
                ) : (
                    <p className=" font-semibold text-red-500">Recibido</p>
                )}

                <div className="mt-2 flex flex-col gap-1">
                    <p className="text-neutral-700 font-bold text-lg">Direccion de entrega</p>
                    <p className=" font-semibold">Direccion: <span className=" font-normal">{buy.user.address}</span></p>
                    <p className=" font-semibold">Municipio: <span className=" font-normal">{buy.user.city}</span></p>
                    <p className=" font-semibold">C.P. <span className=" font-normal">{buy.user.postalCode}</span></p>

                    {btn && (
                        <>
                            {buy.delivery[0].onTheWay ? (
                                <button 
                                    onClick={() => handleDelivered(buy)}
                                    className="bg-sky-600 text-neutral-100 font-bold px-2 py-1 rounded hover:bg-sky-700 transition-colors"
                                >Entregado</button>
                            ) : (
                                <button 
                                    onClick={() => handleOnTheWay(buy)}
                                    className="bg-sky-600 text-neutral-100 font-bold px-2 py-1 rounded hover:bg-sky-700 transition-colors"
                                >En camino</button>
                            )}

                            <button 
                                onClick={() => {
                                    setDeleteId(buy.ID)
                                    setModal(true)
                                }}
                                className="bg-red-500 px-2 py-1 text-neutral-100 font-bold hover:bg-red-600 transition-colors rounded"
                            >Eliminar</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default BuyContainer