import React, { useState } from 'react'
import useShop from '../hooks/useShop'
import TypesModal from '../components/TypesModal';
import useAdmin from '../hooks/useAdmin';

const AdminTypes = () => {
    const [modal, setModal] = useState()
    const { types } = useShop();
    const { handleFillModel, handleDeleteModel } = useAdmin();

    return (
        <>
            <div className={`justify-center sm:m-8 ${modal ? 'flex' : 'hidden'}`}>
                {modal && (
                    <TypesModal 
                        setModal={setModal}
                    />
                )}
            </div>
            
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 my-10">
                <div>
                    <h1 className='font-bold text-2xl uppercase text-sky-600'>Gestiona los modelos</h1>
                    <p className='text-lg text-neutral-600'>Administra, crea, actualiza o elimina modelos</p>

                    <div className='mt-5'>
                        <div className='flex justify-end items-center'>
                        <button 
                            onClick={() => setModal(true)}
                            className='px-2 py-1 text-neutral-100 bg-sky-600 hover:bg-sky-700 transition-colors rounded'
                        >
                            + Crear
                        </button>
                        </div>

                        <div>
                        <h3 className='font-bold text-lg text-neutral-700'>Modelos Activos</h3>
                        <div className=" overflow-x-scroll md:overflow-hidden">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-neutral-700 px-2 py-1">
                                        <th className="w-10 text-neutral-100">ID</th>
                                        <th className="text-neutral-100">Nombre</th>
                                        <th className="text-neutral-100 w-32">Descripcion</th>
                                        <th className="text-neutral-100">Acciones</th>
                                    </tr>
                                </thead>

                                {!types.length <= 0 && types.map(type => (
                                    <tbody key={type.ID}>
                                        <tr className="border-b-2">
                                            <td className="p-1 text-center">{type.ID}</td>
                                            <td className="p-1 text-center">{type.name}</td>
                                            <td className="p-1 text-center line-clamp-2">{type.description}</td>
                                            <td className="p-1 text-center">
                                                <button 
                                                    onClick={() => {
                                                        handleFillModel(types, type.ID)
                                                        setModal(true)
                                                    }}
                                                    className="bg-sky-600 rounded text-neutral-100 p-0.5">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                    </svg>
                                                </button>

                                                <button 
                                                    onClick={() => {
                                                        handleDeleteModel(type.ID)
                                                    }}
                                                    className="bg-red-600 rounded text-neutral-100 p-0.5 ml-2"
                                                >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                                </button>
                                            </td>
                                        </tr> 
                                    </tbody>               
                                ))}
                            </table>
                        </div>

                        {types.length <= 0 && (
                            <>
                            <h1 className="text-center uppercase text-sky-600 font-bold mt-2 text-xl">No hay modelos</h1>  
                            </>              
                        )}
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminTypes