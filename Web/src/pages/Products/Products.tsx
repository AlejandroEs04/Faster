import { Link } from "react-router-dom";
import { useApp } from "../../hooks/useApp";
import { useEffect, useState } from "react";
import { Product } from "../../types";
import { getProducts } from "../../api/products";

export default function Products() {
    const [products, setProducts] = useState<Product[]>([])
    const { dispatch } = useApp()

    const productsRequest = async() => setProducts(await getProducts())

    useEffect(() => {
        dispatch({ type: 'change-routes', payload: { routes: [{ name: 'Products', url: '/products' }] } })
        productsRequest()
    }, [])
    
    return (
        <div className="container">
            <h1>Products</h1>

            <div className='info-container'>
                <div className='justify-between'>
                    <h2>Inventory</h2>
                    
                    <Link to={'/products/add'} className='btn btn-primary'>
                        Add Product
                    </Link>
                </div>

                {products.length ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Box Price</th>
                                <th>Type</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map(product => (
                                <tr key={product.ID}>
                                    <td>{product.ID}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.wholesalePrice}</td>
                                    <td>{product.type.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div>
                        <p>No hay productos registrados</p>
                    </div>
                )}

                <p className='down-text'>Last 30 day sales calculated</p>
            </div>
        </div>
    )
}
