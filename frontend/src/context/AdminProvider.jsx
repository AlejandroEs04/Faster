import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"; 

const AdminContext = createContext();

function Product(ID, name, price, amount, typeID, description, imageURL, xs, s, m, l, xl) {
    this.ID = ID
    this.name = name;
    this.price = price;
    this.amount = amount;
    this.typeID = typeID;
    this.description = description;
    this.imageURL = imageURL;
    this.xs = xs;
    this.s = s;
    this.m = m;
    this.l = l;
    this.xl = xl;
}

function Model(ID, name, description) {
    this.ID = ID
    this.name = name;
    this.description = description
}

const AdminProvider = ({children}) => {
    // Product's variables
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [amount, setAmount] = useState(0);
    const [typeID, setTypeID] = useState(0)
    const [description, setDescription] = useState("");
    const [imagenUrl, setImagenUrl] = useState(null);
    const [XS, setXS] = useState(false);
    const [S, setS] = useState(false);
    const [M, setM] = useState(false);
    const [L, setL] = useState(false);
    const [XL, setXL] = useState(false);

    // Model's variables
    const [nameModel, setNameModel] = useState('')
    const [descriptionModel, setDescriptionModel] = useState('')

    // Buy's variables
    const [buys, setBuys] = useState([]);
    const [modal, setModal] = useState(false)
    const [productModal, setProductModal] = useState({});
    const [typeModal, setTypeModal] = useState({})

    const [deleteId, setDeleteId] = useState(0);

    const navigate = useNavigate();
    

    useEffect(() => {
        handleGetAllBuy()
    }, [])

    /** PRODUCTS CRUD */
    const handleSaveProduct = async(id) => {
        const product = new Product(id, name, price, amount, typeID, description, imagenUrl, XS, S, M, L, XL);

        const token = localStorage.getItem('token');
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if(id) {
            try {
                const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/products/${id}/update`, {
                    product
                }, config)

                toast.success(data.msg, {
                    position: toast.POSITION.BOTTOM_RIGHT
                })

                setTimeout(() => {
                    navigate(0)
                }, 2000);
            } catch (error) {
                
            }
        } else {
            try {
                const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/products`, {
                    product
                })

                toast.success(data.msg, {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleDeleteProduct = async(id) => {
        const token = localStorage.getItem('token');
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/api/products/${deleteId}/delete`, config)

            toast.success(data.msg, {
                position: toast.POSITION.BOTTOM_RIGHT
            })

            setDeleteId(0)

            navigate(0)
        } catch (error) {
            console.log(error)
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

        try {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/api/buy/admin`, config)

            setBuys(data?.buys)
        } catch (error) {
            console.log(error)
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

        try {
            const {data} = await axios.put(`${import.meta.env.VITE_API_URL}/api/buy/admin/${buy.ID}`, {
                onTheWay: true
            }, config)

            toast.success(data.msg, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        } catch (error) {
            console.log(error)
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

        try {
            const {data} = await axios.put(`${import.meta.env.VITE_API_URL}/api/buy/admin/${buy.ID}`, {
                delivered: true
            }, config)

            toast.success(data.msg, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        } catch (error) {
            console.log(error)
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
            }
        } else {
            try {
                const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/types`, {
                    model
                }, config)

                toast.success(data.msg, {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            } catch (error) {
                console.log(error)
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

        try {
            const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/api/types/${id}`, config)

            toast.success(data.msg, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        } catch (error) {
            console.log(error)
        }
    }

    /** FUNCIONES */
    const handleFillModel = async(types, id) => {
        const model = types?.filter(type => type.ID === id);

        setTypeModal(model[0])

        setNameModel(model[0].name)
        setDescriptionModel(model[0].description)
    }

    const handleFillModal = async(products, id, sizes) => {
        const product = await products?.filter(product => product.ID === id)
        setProductModal(product[0])

        const sizesNew = await sizes?.map(size => {
            const answer = product[0]?.detProductSize?.filter(sizeProduct => sizeProduct.sizeID === size.ID)

            return answer[0]
        })

        sizesNew.map(size => {
            if(size) {
                switch (size.sizeID) {
                    case 1:
                        setXS(true)
                        break;
                    case 2:
                        setS(true)
                        break;
                    case 3:
                        setM(true)
                        break;
                    case 4:
                        setL(true)
                        break;
                    case 5:
                        setXL(true)
                        break;
                    
                    default: 
                        console.log('nada')
                        break;
                }
            }
        })
    }

    const handleDeleteBuy = async() => {
        const token = localStorage.getItem('token');
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/api/buy/admin/${deleteId}`, config);

            toast.success(data.msg, {
                position: toast.POSITION.BOTTOM_RIGHT
            })

            setDeleteId(0);

            navigate(0);
        } catch (error) {
            
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
                setName,
                name, 
                setPrice,
                price,
                setAmount,
                amount,
                setDescription,
                description, 
                setTypeID,
                typeID,
                setImagenUrl, 
                imagenUrl,
                setXS,
                XS,
                setS,
                S, 
                setM, 
                M, 
                setL, 
                L, 
                setXL, 
                XL,
                handleSaveProduct,
                handleGetAllBuy,
                buys,
                setBuys,
                handleOnTheWay,
                handleDelivered,
                handleFillModal, 
                productModal,
                setProductModal, 
                handleFillModel, 
                typeModal, 
                handleDeleteModel, 
                modal, 
                setModal, 
                setDeleteId, 
                handleDeleteBuy
            }}
        >
            {children}
        </AdminContext.Provider>
    )
}

export {
    AdminProvider,
    Product
}

export default AdminContext