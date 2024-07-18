import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { socket } from "../socket";

const ShopContext = createContext()


const ShopProvider = ({children}) => {
    // Informacion de la API
    const [types, setTypes] = useState([]);
    const [products, setProducts] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [alertas, setAlertas] = useState(null);
    const [articles, setArticles] = useState([]);
    const [orders, setOrders] = useState([]);
    const [slider, setSlider] = useState();

    // Funciones de la pagina
    const [type, setType] = useState(null);
    const [load, setLoad] = useState(false);
    const [cart, setCart] = useState([]);
    const [tokenTrue, setTokenTrue] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const getInfo = async() => {
            getTypes();
            getProducts();
            getSizes();
            getArticles();
        }

        socket.on('productsUpdate', () => getProducts())

        getInfo();
    }, [])

    const getTypes = async() => {
        const { data } = await axios(`${import.meta.env.VITE_API_URL}/api/types`);
        setTypes(data.types);
    }

    const getProducts = async() => {
        setLoad(true)

        try {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/api/products`);
            setProducts(data.products);
        } catch (error) {
            console.log(error)
        } finally {
            setLoad(false)
        }

    }

    const getSizes = async() => {
        const { data } = await axios(`${import.meta.env.VITE_API_URL}/api/sizes`);
        setSizes(data.sizes);
    }

    const handleChangeType = (typeID) => {
        setType(typeID)
    }

    const handleSaveCarrito = async(productID, sizeID, cantidad) => {
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            setLoad(true)
            const { data } = await axios.post( `${import.meta.env.VITE_API_URL}/api/users/cart`, {
                productID, sizeID, cantidad
            }, config );

            const cartAct = [
                ...cart, 
                data.cart
            ]

            setCart(cartAct)

            toast.success(data.msg, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        } catch (error) {
            toast.success("Necesitas iniciar sesion para guardar en el carrito", {
                position: toast.POSITION.BOTTOM_RIGHT
            })

            navigate('/login');
        } finally {
            setLoad(false)
        }
    }

    const handleGetCart = async() => {
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            setLoad(true)
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/api/users/cart`, config);
            setCart(data.cart)
        } catch (error) {
            console.log(error)
        } finally {
            setLoad(false)
        }
    }

    const handleLogin = async(email, password) => {
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, {
                email, password
            })

            localStorage.setItem('token', data.token);

            setAlertas(null)

            toast.success("Bienvenido, ha iniciado sesión", {
                position: toast.POSITION.BOTTOM_RIGHT
            })

            return data;
        } catch (error) {
            setAlertas(
                {
                    msg: error.response.data.msg,
                    error: true
                }
            )
        }
    }

    const handleCreateAccount = async(name, lastName, email, number, password) => {
        try {
            setLoad(true);
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/users`, {
                name, lastName, email, number, password
            });
            
            setAlertas({
                error: false,
                msg: 'Revise su correo'
            });
            setLoad(false);

            toast.success("Cuenta creada correctamente", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            
        } catch (error) {
            setAlertas(
                {
                    msg: error.response.data.msg,
                    error: true
                }
            )
        }
    }

    const handleConfirmAccount = async(token) => {
        try {
            setLoad(true);

            const url = `${import.meta.env.VITE_API_URL}/api/users/confirm/${token}`
            const { data } = await axios(url);

            setAlertas(
                {
                    msg: data.msg,
                    error: false
                }
            )
        } catch (error) {
            setLoad(false)

            setAlertas(
                {
                    msg: error.response.data.msg,
                    error: true
                }
            )
        }

        setLoad(false)
    }

    const handleForgetPassword = async(email) => {
        try {
            setLoad(true)

            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/forget-password`, {
                email
            })
            
            setAlertas({
                msg: data.msg,
                error: false
            })

            setLoad(false)
        } catch (error) {
            setLoad(false)

            console.log(error)
            
            setAlertas(
                {
                    msg: error.response.data.msg,
                    error: true
                }
            )
        }
    }

    const handleCheckToken = async(token) => {
        try {
            await axios(`${import.meta.env.VITE_API_URL}/api/users/forget-password/${token}`);

            setTokenTrue(true);
        } catch (error) {
            setAlertas({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const handleResetPassword = async(token, password) => {
        try {
            const { data } = axios.post(`${import.meta.env.VITE_API_URL}/api/users/forget-password/${token}`, {
                password
            })

            setAlertas({
                msg: "Contraseña restablecida correctamente",
                error: false,
                set: true
            })
        } catch (error) {
            console.log(error)

            setAlertas({
                msg: "Hubo un error, por favor, intentelo mas tarde",
                error: true
            })
        }
    }

    const createOrderPaypal = async(total) => {
        const token = localStorage.getItem('token');
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/buy`, {
                total
            }, config)

            return data.response.result.id
        } catch (error) {
            console.log(error)
        }
    }

    const addPurchase = async(total, orderID) => {
        const token = localStorage.getItem('token');
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/buy/complete`, {
                total, orderID
            }, config);

            toast.success(data.msg, {
                position: toast.POSITION.BOTTOM_RIGHT
            })

            navigate('/');
        } catch (error) {
            console.log(error)
        }
    }

    const deleteProductCart = async(ID) => {
        const token = localStorage.getItem('token');
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        const uptCart = cart.filter(product => ID !== product.ID);

        setCart(uptCart)

        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/cart/delete`, {
                ID
            }, config);

            toast.success(data.msg, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        } catch (error) {
            console.log(error)
        }
    }

    const getArticles = async() => {
        try {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/api/articles`)

            setArticles(data.articles)
        } catch (error) {
            console.log(error)
        }
    }

    const handleGetBuy = async() => {
        const token = localStorage.getItem('token');
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/api/buy`, config)

            setOrders(data.buys)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ShopContext.Provider
            value={{
                types,
                products,
                sizes,
                handleChangeType, 
                type,
                load,
                handleSaveCarrito,
                deleteProductCart,
                handleLogin,
                handleCreateAccount,
                alertas,
                handleConfirmAccount,
                setAlertas,
                setLoad,
                handleForgetPassword,
                handleCheckToken,
                tokenTrue,
                handleResetPassword,
                handleGetCart,
                cart,
                setCart,
                createOrderPaypal,
                addPurchase,
                articles,
                handleGetBuy,
                orders,
                slider, 
                setSlider
            }}
        >
            {children}
        </ShopContext.Provider>
    )
}

export {
    ShopProvider
}

export default ShopContext