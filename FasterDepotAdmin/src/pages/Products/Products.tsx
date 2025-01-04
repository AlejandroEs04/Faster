import { Link } from "react-router-dom";
import { useApp } from "../../hooks/useApp";
import { useEffect } from "react";

export default function Products() {
    const { dispatch } = useApp()

    useEffect(() => {
        dispatch({ type: 'change-routes', payload: { routes: [{ name: 'Products', url: '/products' }] } })
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

                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Stock</th>
                            <th>Price</th>
                            <th>Cost</th>
                            <th>IVA</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Guantes de latex</td>
                            <td>200</td>
                            <td>$300.00</td>
                            <td>$250.00</td>
                            <td>16%</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Guantes de latex</td>
                            <td>100</td>
                            <td>$300.00</td>
                            <td>$250.00</td>
                            <td>16%</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Guantes de latex</td>
                            <td>2</td>
                            <td>$300.00</td>
                            <td>$250.00</td>
                            <td>16%</td>
                        </tr>
                    </tbody>
                </table>

                <p className='down-text'>Last 30 day sales calculated</p>
            </div>
        </div>
    )
}
