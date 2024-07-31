import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"; 

const AdminContext = createContext();

const AdminProvider = ({children}) => {
    const [product, setProduct] = useState({
        name : '', 
        price : 0, 
        amount : 100, 
        typeID : 0, 
        description : '', 
        imageUrl : '', 
        detProductSize : []
    })

    // Model's variables
    const [nameModel, setNameModel] = useState('')
    const [descriptionModel, setDescriptionModel] = useState('')

    // Buy's variables
    const [buys, setBuys] = useState([]);
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const [productModal, setProductModal] = useState({});
    const [typeModal, setTypeModal] = useState({})

    const [deleteId, setDeleteId] = useState(0);

    const navigate = useNavigate();
    

    useEffect(() => {
        handleGetAllBuy()
    }, [])

    /** PRODUCTS CRUD */
    const handleSaveProduct = async(e) => {
        e.preventDefault()

        const token = localStorage.getItem('token');
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        let response

        setLoading(true)

        try {
            if(product.ID) {
                const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/api/products/${product.ID}`, {
                    product
                }, config)

                response = data
            } else {
                const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/products`, {
                    product
                }, config)

                response = data
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

        toast.success(response.msg, {
            position: toast.POSITION.BOTTOM_RIGHT
        })
    }

    const handleDeleteProduct = async(id) => {
        const token = localStorage.getItem('token');
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        setLoading(true)
        
        try {
            const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/api/products/${id}`, config)

            toast.error(data.msg, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleRecoveryProduct = async(id) => {
        const token = localStorage.getItem('token');
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        setLoading(true)
        
        try {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/api/products/${id}/recovery`, config)

            toast.success(data.msg, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteProductSize = async(productID, sizeID) => {
        const token = localStorage.getItem('token');
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        setLoading(true)

        try {
            const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/api/products/${productID}/sizes/${sizeID}`, config)

            toast.error(data.msg, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    /** BUYS CRUD */
    const handleGetAllBuy = async() => {
        const token = localStorage.getItem('token');
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        setLoading(true)
        
        try {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/api/buy/admin`, config)

            setBuys(data?.buys)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleOnTheWay = async(buy) => {
        buy.delivery[0].onTheWay = true

        const buysUpdate = buys?.filter(buyApi => buyApi.ID === buy.ID ? buy : buyApi)

        setBuys(buysUpdate)

        const token = localStorage.getItem('token');
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        setLoading(true)
        
        try {
            const {data} = await axios.put(`${import.meta.env.VITE_API_URL}/api/buy/admin/${buy.ID}`, {
                onTheWay: true
            }, config)

            toast.success(data.msg, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelivered = async(buy) => {
        buy.delivery[0].delivered = true

        const buysUpdate = buys?.filter(buyApi => buyApi.ID === buy.ID ? buy : buyApi)

        setBuys(buysUpdate)

        const token = localStorage.getItem('token');
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        setLoading(true)
        
        try {
            const {data} = await axios.put(`${import.meta.env.VITE_API_URL}/api/buy/admin/${buy.ID}`, {
                delivered: true
            }, config)

            toast.success(data.msg, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    /** MODEL CRUD */
    const handleSaveModel = async(id) => {
        const model = new Model(id, nameModel, descriptionModel);

        const token = localStorage.getItem('token');
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if(id) {
            setLoading(true)
            
            try {
                const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/api/types/${id}`, {
                    model
                }, config)

                console.log(data)

                toast.success(data.msg, {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        } else {
            setLoading(true)
            
            try {
                const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/types`, {
                    model
                }, config)

                toast.success(data.msg, {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
    }

    const handleDeleteModel = async(id) => {
        const token = localStorage.getItem('token');
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        setLoading(true)
        
        try {
            const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/api/types/${id}`, config)

            toast.success(data.msg, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    /** FUNCIONES */
    const handleFillModel = async(types, id) => {
        const model = types?.filter(type => type.ID === id);

        setTypeModal(model[0])

        setNameModel(model[0].name)
        setDescriptionModel(model[0].description)
    }

    const handleDeleteBuy = async() => {
        const token = localStorage.getItem('token');
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        setLoading(true)
        
        try {
            const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/api/buy/admin/${deleteId}`, config);

            toast.success(data.msg, {
                position: toast.POSITION.BOTTOM_RIGHT
            })

            setDeleteId(0);

            navigate(0);
        } catch (error) {
            
        } finally {
            setLoading(false)
        }
    }

    return (
        <AdminContext.Provider
            value={{    
                handleSaveModel,
                handleDeleteProduct,
                nameModel, 
                setNameModel,
                descriptionModel, 
                setDescriptionModel,
                product, 
                setProduct,
                handleSaveProduct,
                handleGetAllBuy,
                buys,
                setBuys,
                handleOnTheWay,
                handleDelivered,
                productModal,
                setProductModal, 
                handleFillModel, 
                typeModal, 
                handleDeleteModel, 
                modal, 
                setModal, 
                setDeleteId, 
                handleDeleteBuy, 
                handleRecoveryProduct, 
                setLoading, 
                loading, 
                handleDeleteProductSize
            }}
        >
            {children}
        </AdminContext.Provider>
    )
}

export {
    AdminProvider
}

export default AdminContext