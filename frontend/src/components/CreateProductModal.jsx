import { useEffect } from "react";
import CloudinaryImageWidget from "./CloudinaryImageWidget";
import useShop from "../hooks/useShop";
import useAdmin from "../hooks/useAdmin";

const CreateProductModal = ({setModal, productModal}) => {
    const { types, sizes } = useShop();
    const { setName, 
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
            setProductModal
        } = useAdmin();
    
    useEffect(() => {
        setXS(false)
        setS(false)
        setM(false)
        setL(false)
        setXL(false)

        setName(productModal.name ?? '' ?? '')
        setName(productModal.name ?? '')
        setDescription(productModal.description ?? '')
        setPrice(productModal.price ?? '')
        setAmount(productModal.amount ?? '')
        setImagenUrl(productModal.imageUrl ?? '')
        setTypeID(productModal.typeID ?? '')
    }, [])

    return (
        <div className='absolute w-full sm:w-2/3 md:w-1/2 xl:w-1/3 bg-opacity-80 backdrop-blur bg-white shadow-lg p-5 rounded'>
            <div className="flex justify-between">
                <h2 className="text-xl font-bold text-sky-600">Crear Producto</h2>
                <button onClick={() => {
                    setModal(false)
                    setProductModal({})
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <p className="text-sm font-bold text-neutral-400" >Ingresa los siguientes datos para guardar el producto</p>

            <form 
                className="mt-5" 
                onSubmit={() => {
                    handleSaveProduct(productModal.ID)
                }} 
            >
                <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="text-base font-medium">Nombre del producto</label>
                    <input 
                        type="text" 
                        id="name"
                        placeholder="Nombre del producto" 
                        className="px-2 py-1 border rounded bg-white"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="text-base font-medium">Descripcion del producto</label>
                    <textarea 
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        className="px-2 py-1 border rounded h-40 bg-white"
                    />
                </div>

                <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="price" className="text-base font-medium">Precio</label>
                        <input 
                            type="number" 
                            id="price"
                            placeholder="Precio del producto" 
                            className="px-2 py-1 border rounded bg-white"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            min={0}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="amount" className="text-base font-medium">Cantidad de guantes</label>
                        <input 
                            type="number" 
                            id="amount"
                            placeholder="Cantidad de guantes" 
                            className="px-2 py-1 border rounded bg-white"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            min={0}
                        />
                    </div>
                </div>     

                <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="amount" className="text-base font-medium">Imagen</label>
                        <CloudinaryImageWidget 
                            setImagenUrl={setImagenUrl}
                        />
                    </div> 

                    <div className="flex justify-center items-center">
                        {imagenUrl ? (
                            <img src={imagenUrl} alt="imagen del producto" className="w-32" />
                        ) : (
                            <p className="text-neutral-700 font-bold">Aun no hay imagen</p>
                        )}
                    </div>  
                </div>

                <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="flex flex-col gap-1 mt-2">
                        <label className="text-base font-medium">Tallas Disponibles</label>

                        {sizes?.map(size => (
                            <label key={size.ID} className="flex items-center gap-1">
                                <input 
                                    type="checkbox" 
                                    id={size.letter} 
                                    onChange={(e) => {
                                        if(e.target.id === "XS") {
                                            setXS(e.currentTarget.checked)
                                        }
                                        if(e.target.id === "S") {
                                            setS(e.currentTarget.checked)
                                        }
                                        if(e.target.id === "M") {
                                            setM(e.currentTarget.checked)
                                        }
                                        if(e.target.id === "L") {
                                            setL(e.currentTarget.checked)
                                        }
                                        if(e.target.id === "XL") {
                                            setXL(e.currentTarget.checked)
                                        }

                                        console.log(e.currentTarget.checked)
                                    }}
                                    checked={
                                        size.ID === 1 ? XS : 
                                        size.ID === 2 ? S :
                                        size.ID === 3 ? M :
                                        size.ID === 4 ? L :
                                        size.ID === 5 ? XL : false
                                    }
                                /> 
                                <p>{size.name}</p>
                            </label>
                        ))}
                    </div>

                    <div className="flex flex-col gap-1 mt-2">
                        <label className="text-base font-medium">Modelo</label>
                        <select className="border px-2 py-1 rounded" value={typeID} onChange={(e) => setTypeID(e.target.value)}>
                            <option> -- SELECCIONE -- </option>
                            {types?.map(type => (
                                <option key={type.ID} value={type.ID}>{type.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex justify-center mt-5">
                    <button
                        type="submit"
                        className="px-2 py-1 bg-sky-600 text-neutral-100 font-bold uppercase rounded"
                    >
                        {productModal.ID ? 'Editar' : 'Guardar'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateProductModal
