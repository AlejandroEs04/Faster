import useShop from '../hooks/useShop'
import ProductContainer from "./ProductContainer";

const ProductsList = ({text = 'Productos', textColor = 'text-sky-600'}) => {
    const { products } = useShop();

    return (
        <div className="flex justify-center mb-10">
            <div className="flex flex-col px-2 items-center w-full lg:w-4/5">
                <h2 className={`font-bold text-3xl uppercase ${textColor} mb-4`}>{text}</h2>
                <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {products?.map(product => (
                        <ProductContainer 
                            key={product.ID}
                            product={product}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductsList