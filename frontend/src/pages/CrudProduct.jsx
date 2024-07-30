import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CloudinaryImageWidget from '../components/CloudinaryImageWidget'
import useShop from '../hooks/useShop'
import useAdmin from '../hooks/useAdmin'
import Input from '../components/Input'
import Select from '../components/Select'
import Textarea from '../components/Textarea'
import CheckBox from '../components/CheckBox'
import BackButton from '../components/BackButton'
import LoaderMain from '../components/LoaderMain'

const CrudProduct = () => {
    const [imageUrl, setImageUrl] = useState('')
    const [currentSize, setCurrentSize] = useState(0)
    const { types, sizes, products } = useShop();
    const { product, setProduct, handleSaveProduct, loading } = useAdmin();

    const { id } = useParams()

    const handleChange = (e) => {
        const { name, value } = e.target

        const isNumber = ['price', 'amount'].includes(name)
        
        setProduct({
            ...product, 
            [name] : isNumber ? +value : value
        })
    }

    const handleAddSize = () => {
        const existsSize = product.detProductSize.filter(size => size.ID === +currentSize)

        if(existsSize.length > 0) {
            return
        }
        const sizeAdding = sizes.filter(size => size.ID === +currentSize)[0]

        setProduct({
            ...product, 
            detProductSize : [
                ...product.detProductSize, 
                sizeAdding
            ]
        })
    }

    
    useEffect(() => {
        setProduct({
            ...product, 
            imageUrl
        })
    }, [imageUrl])
    
    useEffect(() => {
        if(id) {
            const currentProduct = products?.filter(product => product?.ID === +id)[0]
        
            const sizes = currentProduct?.detProductSize?.map(size => size.size)
            
            setProduct({
                ...currentProduct, 
                detProductSize : sizes
            })
        }
    }, [products, id])

    return (
        <div className="container mx-auto my-10 px-4">
            <BackButton />

            <h1 className='text-3xl font-semibold text-sky-600'>{product?.ID ? 'Editar' : 'Crear'} Producto</h1>
            <p>Completa el formulario para dar de alta un nuevo producto</p>

            <form 
                className='mt-3'
                onSubmit={e => handleSaveProduct(e)}
            >
                <div className='flex flex-col md:flex-row gap-3'>
                    <div className='w-full'>
                        <h3 className='font-medium text-lg mt-3 mb-1'>Información del producto</h3>
                        <div className='flex flex-col md:grid md:grid-cols-2 lg:grid-cols-2 gap-3'>
                            <Input onChange={handleChange} name='name' id='name' label='Nombe' value={product?.name} placeholder='Nombre del producto' />
                            
                            <Select onChange={handleChange} value={product?.typeID} name='typeID' id='typeID' label='Tipo'>
                                <option value={0}>Seleccione un tipo</option>
                                {types?.map(type => (
                                    <option key={type?.ID} value={type?.ID}>
                                        {type.name}
                                    </option>
                                ))}
                            </Select>

                            <div className='flex flex-col md:grid md:grid-cols-2 gap-3'>
                                <Input type='number' onChange={handleChange} name='price' id='price' label='Precio' value={product?.price} placeholder='Precio del producto' />
                                <Input type='number' onChange={handleChange} name='amount' id='amount' label='Cantidad p/caja' value={product?.amount} placeholder='Cantidad por caja' />

                                <div className='flex flex-col md:grid grid-cols-2 col-span-2 gap-3 border-2 p-3 border-dashed'>
                                    <div className='flex flex-col gap-5'>
                                        <div>
                                            <label htmlFor="image">Imagen</label>
                                            <CloudinaryImageWidget 
                                                setImagenUrl={setImageUrl}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-center items-center">
                                        {product?.imageUrl ? (
                                            <img src={product?.imageUrl} alt="imagen del producto" className="w-full" />
                                        ) : (
                                            <p className="text-neutral-700 font-bold">Aun no hay imagen</p>
                                        )}
                                    </div> 
                                </div>
                            </div>

                            <Textarea name='description' id='description' label='Descripción' onChange={handleChange} value={product?.description} />                            

                            <div>
                                <h4>Tallas Disponibles</h4>
                                <div className='flex justify-center items-center gap-3'>
                                    <select value={currentSize} onChange={e => setCurrentSize(e.target.value)} className='w-full p-1.5 rounded' name="sizeArray" id="sizeArray">
                                        <option value="0">Seleccione una talla</option>
                                        {sizes?.map(size => (
                                            <option key={size.ID} value={size.ID}>{size.name}</option>
                                        ))}
                                    </select>
                                    
                                    <button
                                        type='button'
                                        onClick={() => handleAddSize()}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                    </button>
                                </div>

                                <div className='flex flex-col gap-2 mt-2'>
                                    {product?.detProductSize?.map(size => (
                                        <div key={size.letter} className='flex items-center justify-between w-full bg-white p-1.5 rounded'>
                                            <p className='' key={size.ID}>{size.name}</p>
                                            <div>
                                                <button type='button' disabled className='text-sm bg-red-500 text-white p-1 rounded disabled:bg-red-200'>Eliminar</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {loading ? (
                            <LoaderMain />
                        ) : (
                            <div className='mt-3'>
                                <button className='px-2 py-1 bg-sky-600 text-white rounded mt-2' type="submit">{product?.ID ? 'Editar' : 'Crear'} Producto</button>
                            </div>
                        )}
                
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CrudProduct