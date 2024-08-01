import useShop from '../hooks/useShop'
import ProductContainer from "./ProductContainer";

const ProductsList = ({text = 'Productos', textColor = 'text-sky-600', fullWidth = false}) => {
    const { products } = useShop();

    return (
        <div>
            <h2 className={`font-semibold text-3xl ${textColor} mb-4`}>{text}</h2>

            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${fullWidth ? 'gap-x-8' : 'gap-x-5 lg:gap-x-20'} gap-y-8`}>
                {products?.slice(0,3).map(product => (
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