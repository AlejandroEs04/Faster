import { useState } from 'react';
import useShop from '../hooks/useShop'
import ProductContainer from "./ProductContainer";

const ProductsList = ({text = 'Productos', textColor = 'text-sky-600', fullWidth = false}) => {
    const [knowMore, setKnowMore] = useState(false);
    const { products } = useShop();

    return (
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 my-10">
            <h2 className={`font-bold text-3xl uppercase ${textColor} text-center mb-4`}>{text}</h2>

            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${fullWidth ? 'gap-x-8' : 'gap-x-5 lg:gap-x-20'} gap-y-8`}>
                {products?.map(product => (
                    <ProductContainer 
                        key={product.ID}
                        product={product}
                    />
                ))}
            </div>
        </div>
    )
}

export default ProductsList