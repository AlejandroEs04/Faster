import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import ImageUpload from './ImageUpload';

const ProductImagesCrud = ({ images = [] }) => {
    const [newImage, setNewImage] = useState(false)
    const [newImageUrl, setNewImageUrl] = useState('')
    const [imagesNew, setImagesNew] = useState([]);

    const { id } = useParams();

    const toggleNewImage = () => setNewImage(!newImage);

    const handleDeleteImage = () => setNewImageUrl('');

    const handleAddArray = () => {
        setImagesNew([
            ...imagesNew, 
            {
                productID : +id, 
                imageUrl : newImageUrl        
            }
        ]) 

        setNewImageUrl('')
        setNewImage(false)
    }

    const handleDeleteImageFromArray = (url) => {
        setImagesNew(imagesNew.filter(image => image.imageUrl !== url))
    }

    return (
        <>
            <h2 className='mt-8 text-2xl'>Configurar Imagenes</h2>
            <p>Selecciona las imagenes del producto</p>

            <div>
                <button 
                    className={`px-3 py-1 text-white rounded transition-colors mt-1 ${newImage ? 'bg-red-600 hover:bg-red-700' : 'bg-sky-600 hover:bg-sky-700'}`}
                    onClick={toggleNewImage}
                >
                    {newImage ? 'Cancelar' : 'Agregar'}
                </button>
                
                {newImage && (
                    <div className='grid grid-cols-2 bg-white rounded shadow-lg mt-2'>
                        <div className='p-4'>
                            {newImageUrl.length > 0 ? (
                                <img src={newImageUrl} alt='Product Image' className='max-w-96' />
                            ) : (
                                <p>Aun no hay una imagen</p>
                            )}
                        </div>

                        <div className='p-4 flex flex-col gap-2'>
                            <ImageUpload 
                                setImageUrl={setNewImageUrl}
                            />

                            {newImageUrl.length > 0 && (
                                <>
                                    <button 
                                        onClick={handleAddArray}
                                        className='px-2 py-1 rounded-lg transition-colors text-white bg-sky-600 hover:bg-sky-700'
                                    >Guardar</button>

                                    <button 
                                        onClick={handleDeleteImage}
                                        className='px-2 py-1 rounded-lg transition-colors text-white bg-red-600 hover:bg-red-700'
                                    >Eliminar</button>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {imagesNew.map(image => (
                    <div key={image.imageUrl} className='grid grid-cols-2 bg-white rounded shadow-lg mt-2'>
                        <div className='p-4'>
                            <img src={image.imageUrl} alt={`Image for product`} className='max-w-96' />
                        </div>

                        <div className='p-4 flex flex-col gap-2'>
                            <button 
                                onClick={() => handleDeleteImageFromArray(image.imageUrl)}
                                className='px-2 py-1 rounded-lg transition-colors text-white bg-red-600 hover:bg-red-700'
                            >Eliminar</button>
                        </div>
                    </div>
                ))}          

                {images?.map(image => (
                    <div key={image.imageUrl} className='grid grid-cols-2 bg-white rounded shadow-lg mt-2'>
                        <div className='p-4'>
                            <img src={image.imageUrl} alt={`Image for product`} className='max-w-96' />
                        </div>

                        <div className='p-4 flex flex-col gap-2'>
                            <button 
                                onClick={() => handleDeleteImageFromArray(image.imageUrl)}
                                className='px-2 py-1 rounded-lg transition-colors text-white bg-red-600 hover:bg-red-700'
                            >Eliminar</button>
                        </div>
                    </div>
                ))} 
            </div>
        </>
    )
}

export default ProductImagesCrud