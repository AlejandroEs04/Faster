import { useState } from "react";
import { Link } from "react-router-dom";
import useShop from '../hooks/useShop'
import { formatearDinero } from "../helpers";

const ProductsList = ({text = 'Productos', textColor = 'text-sky-600', fullWidth = false}) => {
    const [knowMore, setKnowMore] = useState(false);
    const { products } = useShop();

    return (
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 my-10">
            <h2 className={`font-bold text-3xl uppercase ${textColor} text-center mb-4`}>{text}</h2>

            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${fullWidth ? 'gap-x-8' : 'gap-x-5 lg:gap-x-20'} gap-y-8`}>
                {products?.map(product => (
                    <div key={product.ID} className="w-full bg-white flex flex-col p-4 rounded-sm shadow-md hover:shadow-xl transition-shadow justify-between">
                        <div className="pb-2 border-b flex justify-center">
                            <img src={product.imageUrl} alt={`Imagen Producto ${product.name}`} className="max-w-72 w-full" />
                        </div>

                        <div className="py-2 flex flex-col">
                            <h3 className="font-semibold text-lg text-neutral-700">{product.name}</h3>
                            <p className={`${!knowMore && "line-clamp-2"} text-base`}>{product.description}</p>
                            <button 
                                onClick={() => setKnowMore(!knowMore)}
                                className='text-sm text-sky-500 text-start'
                            >
                                {knowMore ? "Ocultar" : "Saber mas..."}
                            </button>

                            <p className=" text-lg font-medium text-sky-500 mt-2">Precio</p>
                            <p className="text-xl font-bold text-neutral-600">{formatearDinero(product.price)} mxn</p>

                            <div className="mt-2">
                                <h4 className="text-sky-600">Tallas Disponibles</h4>
                                <div className="flex gap-2 py-1">
                                {product?.detProductSize?.map(size => (
                                    <button 
                                        key={size.ID}
                                        className="text-sm bg-neutral-500 text-neutral-100 font-semibold p-0.5 w-6 h-6 text-center rounded bg-opacity-95 shadow-sm"
                                    >{size.size.letter}</button>
                                ))}
                                </div>
                            </div>

                            <Link to={`/products/${product.ID}`} className="bg-sky-500 text-white px-2 py-1 rounded mt-2 text-center hover:bg-sky-600 transition-colors">Saber más</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductsList