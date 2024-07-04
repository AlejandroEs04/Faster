import { useState, useEffect } from 'react';
import useShop from '../hooks/useShop'
import { formatearDinero } from '../helpers';
import { MutatingDots } from 'react-loader-spinner'

const ProductType = ({id}) => {
    const [knowMore, setKnowMore] = useState(false);
    const [sizeID, setSizeID] = useState(1);
    const [cantidad, setCantidad] = useState(1);
    const [product, setProduct] = useState([])
    const [total, setTotal] = useState(0)
    const {products, type, sizes, handleSaveCarrito, load} = useShop();

    useEffect(() => {
        const productsAct = products?.filter(product => product.typeID === id);
        setProduct(productsAct[0])
    }, [type])
    useEffect(() => {
        if(cantidad % 10 === 0 && cantidad > 0) {
            setTotal((cantidad / 10) * 1000);
        } else {
            setTotal(cantidad * product?.price)
        }
    }, [cantidad, product])

    return (
        <div>
            <div key={product?.ID}>
                <div className='flex flex-col sm:grid lg:grid-cols-2'>
                    <div className='p-4 flex items-center md:justify-center'>
                        <img src={product?.imageUrl} alt={`Imagen producto ${product?.name}`} className='max-w-72 md:max-w-96 w-full' />
                    </div>

                    <div className='flex flex-col justify-center px-4 lg:border-l lg:border-l-neutral-400'>
                        <h2 className='text-2xl font-bold text-sky-600'>{product?.name}</h2>
                        <p className={`text-neutral-600 uppercase ${!knowMore && "line-clamp-2"}`}>{product?.description}</p>
                        <button 
                            onClick={() => setKnowMore(!knowMore)}
                            className='text-sm text-sky-500 text-start'
                        >
                            {knowMore ? "Ocultar" : "Saber mas..."}
                        </button>

                        <p className='mt-2 font-light text-neutral-600'>Cantidad: <span className='font-bold'>{product?.amount} guantes p/caja</span></p>
                        <p className='font-light text-neutral-600'>Tipo: <span className='font-bold'>{product?.type?.name}</span></p>
                        <div className='gap-2 items-center grid-cols-2 grid sm:grid-cols-3'>
                            <label className='font-bold text-neutral-600'>Talla</label>
                            <select
                                className='py-1 my-1 px-2 border'
                                onChange={(e) => setSizeID(e.target.value)}
                            >
                                {sizes?.map(size => (
                                    <option key={size.ID} value={size.ID} >{size.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className='gap-2 items-center grid-cols-2 grid sm:grid-cols-3'>
                            <label className='font-bold text-neutral-600'>Cantidad</label>
                            <input type='number' min={1} className='py-1 my-1 px-2 border' value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
                        </div>

                        <div className='mt-4'>
                            <p>El precio por 10 cajas es de {formatearDinero(1000)} mxn</p>
                            <p className='text-xl font-extrabold text-neutral-700 mb-5'>{formatearDinero(total)} mxn</p>

                            {load ? (
                                <div className='flex justify-center w-full'>
                                    <MutatingDots 
                                        visible={true}
                                        height={100}
                                        width={100}
                                        color='#0ea5e9'
                                        secondaryColor='#0284c7'
                                        radius="12.5"
                                        ariaLabel="mutating-dots-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                    />
                                </div>
                            ) : (
                                <div data-tooltip={`Precio: ${cantidad * product?.price}`} class="button">
                                    <button onClick={() => handleSaveCarrito(product?.ID, sizeID, cantidad)} class="button-wrapper">
                                    <div class="text">Agregar al carrito</div>
                                        <span class="icon">
                                            <svg viewBox="0 0 16 16" class="bi bi-cart2" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductType
