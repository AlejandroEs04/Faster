import { useState, useEffect } from "react";
import { formatearDinero } from "../helpers";
import useShop from "../hooks/useShop";

const CartProduct = ({cartProduct, buttons}) => {
    const [cantidad, setCantidad] = useState(cartProduct.cantidad)
    const [active, setActive] = useState(false)

    const { handleSaveCarrito, cart, setCart, deleteProductCart } = useShop();

    useEffect(() => {
        if(cantidad !== cartProduct.cantidad) {
            setActive(true)
        } else {
            setActive(false)
        }
    }, [cantidad])

    const updateProducts = async() => {
        await handleSaveCarrito(cartProduct.productID, cartProduct.sizeID, cantidad)

        const actCart = cart?.map(product => {
            if(product.ID === cartProduct.ID) {
                product.cantidad = cantidad
            }

            return product
        })

        setCart(actCart);
        
        setActive(false)
    }

    return (
        <div key={cartProduct.ID} className='flex flex-col sm:grid sm:grid-cols-2 bg-white shadow-lg p-3 rounded gap-2'>
            <div className='flex justify-center items-center'>
                <img src={cartProduct.products.imageUrl} alt={`Imagen producto ${cartProduct.products.name}`} className='w-full h-auto max-w-56' />
            </div>
                
            <div className='flex flex-col justify-center text-center sm:text-start gap-1'>
                <div>
                    <h3 className='font-bold uppercase text-lg'>{cartProduct.products.name}</h3>
                    <p className="font-bold text-lg text-sky-600">{formatearDinero(cartProduct.products.price)}</p>
                    <p className="flex items-center gap-1 mt-1">Talla: <span className="border text-sm px-2 py-1 rounded-lg">{cartProduct.size.letter}</span></p>
                </div>

                {buttons ? (
                    <>
                        <div className="flex gap-2 justify-center sm:justify-start mt-2 border-t pt-2">
                            <button 
                                type="button" 
                                onClick={() => {
                                    if(cantidad <= 1) return 
                                    setCantidad(cantidad-1)
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>

                            <p className="text-lg border px-2 py-1 rounded-lg">{cantidad}</p>

                            <button 
                                type="button" 
                                onClick={() => {
                                    setCantidad(cantidad+1)
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                        </div>

                        <button
                            onClick={() => {
                                updateProducts()
                            }}
                            disabled={!active}
                            className={`${active ? 'bg-sky-600 hover:bg-sky-700 text-neutral-100' : 'bg-neutral-300 text-neytral-500'} transition-colors px-2 py-1 rounded-lg mt-2`}
                        >
                            Guardar
                        </button>

                        <button
                            onClick={() => {
                                deleteProductCart(cartProduct.ID);
                            }}
                            className={`bg-red-500 hover:bg-red-600 text-neutral-100 transition-colors px-2 py-1 rounded-lg mt-2`}
                        >
                            Eliminar
                        </button>
                    </>
                ) : (
                    <div className="flex gap-1 items-center">
                        <p>Cantidad: </p>
                        <p className="text-sm border px-2 py-1 rounded-lg">{cantidad}</p>
                    </div>
                )} 
            </div>
        </div>
  )
}

export default CartProduct