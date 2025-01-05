import { useEffect, useState } from "react"
import styles from './Products.module.css'
import { useApp } from "../../hooks/useApp";

export default function RegisterProduct() {
    const [newProduct, setNewProduct] = useState({
        name: '', 
        typeId: 0, 
        price: 0, 
        cost: 0, 
        wholesalePrice: 0
    });

    const { dispatch } = useApp()

    useEffect(() => {
        dispatch({ 
            type: 'change-routes', 
            payload: { 
                routes: [
                    { name: 'Products', url: '/products' },
                    { name: 'Add Product', url: '/products/add' }
                ] 
            } 
        })
    }, [])

    return (
        <div className="container">
            <h1>Add Product</h1>

            <form className={`info-container`}>
                <h2>Product Information</h2>
                <div className={`${styles.grid2} mt`}>
                    <div className="input-container">
                        <label htmlFor="name">Product Name</label>
                        <input type="text" id="name" placeholder="Product Name" />
                    </div>

                    <div className={`${styles.grid2}`}>
                        <div className="input-container">
                            <label htmlFor="price">Price</label>
                            <input type="number" id="price" placeholder="Product Price" />
                        </div>

                        <div className="input-container">
                            <label htmlFor="wholesalePrice">Price p/10</label>
                            <input type="number" id="wholesalePrice" placeholder="Price p/10" />
                        </div>
                    </div>

                    <div className="input-container">
                        <label htmlFor="amount">Qty p/box</label>
                        <input type="number" id="amount" placeholder="Quantity per box" />
                    </div>
                    
                    <div className="input-container">
                        <label htmlFor="typeId">Type</label>
                        <select name="typeId" id="typeId">
                            <option value="0">Select a type</option>
                        </select>
                    </div>

                    <div className="input-container">
                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="description"></textarea>
                    </div>
                </div>

                <button className="btn btn-primary mt">Save Product</button>
            </form>
        </div>
    )
}
