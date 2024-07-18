import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { formatearDinero } from "../helpers";

const Buy = () => {
    const [step, setStep] = useState(0)
    const [buy, setBuy] = useState(null);
    const params = useParams();
    const { id } = params

    const getBuy = async() => {
        const token = localStorage.getItem('token');
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/api/buy/find/${id}`, config);
            setBuy(data.buy)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getBuy()
    }, [])

    const checkStep = () => {
        if(buy?.delivery[0]?.delivered) {
            setStep(100)
        } else if(buy?.delivery[0]?.onTheWay) {
            setStep(50)
        } else {
            setStep(5)
        }
    }

    useEffect(() => {
        if(buy) {
            checkStep()
        }
    }, [buy])

    return (
        <div className="flex justify-center m-10">
            <div className="w-full lg:w-2/3 xl:w-1/2">
                <h1 className="text-center text-2xl font-bold text-sky-600 uppercase">Informacion del pedido</h1>
                <div className="md:grid md:grid-cols-2 flex flex-col gap-5 mt-8">
                    <div>
                        <h2 className="text-xl uppercase text-sky-800 font-bold">Producto(s)</h2>
                        {buy?.productos?.map(product => (
                            <div key={product.ID} className="mt-2">
                                <h3 className="text-lg font-medium uppercase">{product.product.name}</h3>
                                <p className="font-bold text-neutral-600">Talla: <span className="text-neutral-800 font-normal">{product.size.letter} ({product.size.name})</span></p>
                                <p className="font-bold text-neutral-600">Tipo: <span className="text-neutral-800 font-normal">{product.product.type.name}</span></p>
                                <p className="font-bold text-neutral-600">Cantidad: <span className="text-neutral-800 font-normal">{product.cantidad} pzas</span></p>

                                <p className="font-bold text-neutral-600">Total: <span className="text-neutral-800 font-normal">{formatearDinero(product.cantidad * product.pricePerUnit)} mxn</span></p>
                            </div>
                        ))}

                        <h2 className="text-xl uppercase text-neutral-600 mt-5">Informacion del usuario</h2>
                        <div>
                            <p className="font-bold text-neutral-600">Nombre: <span className="text-neutral-800 font-normal">{buy?.user?.name + ' ' + buy?.user?.lastName}</span></p>
                            <p className="font-bold text-neutral-600">Correo: <span className="text-neutral-800 font-normal">{buy?.user?.email}</span></p>
                            <p className="font-bold text-neutral-600">Numero: <span className="text-neutral-800 font-normal">{buy?.user?.number}</span></p>
                        </div>
                    </div>

                    <div>
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

                        <p className="mt-4 font-bold">Status del pedido</p>
                        {buy?.delivery[0]?.delivered ? (
                            <p className=" font-semibold text-green-500">Entregado</p>
                        ) : buy?.delivery[0]?.onTheWay ? (
                            <p className=" font-semibold text-green-500">En camino</p>
                        ) : (
                            <p className=" font-semibold text-green-500">Recibido</p>
                        )}

                        <h3 className="text-xl uppercase font-light text-neutral-600 mt-4">Direccion de entrega</h3>
                        <p className="font-bold text-neutral-600">Direccion: <span className="text-neutral-800 font-normal">{buy?.user?.address}</span></p>
                        <p className="font-bold text-neutral-600">Street: <span className="text-neutral-800 font-normal">{buy?.user?.street}</span></p>
                        <p className="font-bold text-neutral-600">Numero exterior: <span className="text-neutral-800 font-normal">{buy?.user?.externNumber}</span></p>
                        <p className="font-bold text-neutral-600">Numero interior: <span className="text-neutral-800 font-normal">{buy?.user?.internNumber}</span></p>
                        <p className="font-bold text-neutral-600">Colonia: <span className="text-neutral-800 font-normal">{buy?.user?.neighborhood}</span></p>
                        <p className="font-bold text-neutral-600">Codigo Postal: <span className="text-neutral-800 font-normal">{buy?.user?.postalCode}</span></p>
                        <p className="font-bold text-neutral-600">Estado: <span className="text-neutral-800 font-normal">{buy?.user?.state}</span></p>
                        <p className="font-bold text-neutral-600">Ciudad: <span className="text-neutral-800 font-normal">{buy?.user?.city}</span></p>
                        <p className="font-bold text-neutral-600">País: <span className="text-neutral-800 font-normal">{buy?.user?.country}</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Buy