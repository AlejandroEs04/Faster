import React from 'react'
import useAdmin from '../hooks/useAdmin'

const TypesModal = ({setModal}) => {
    const { handleSaveModel, setNameModel, nameModel, setDescriptionModel, descriptionModel, typeModal } = useAdmin();
    return (
      <div className='absolute w-full sm:w-2/3 md:w-1/2 bg-white xl:w-1/3 bg-opacity-80 backdrop-blur shadow-lg p-5 rounded'>
            <div className="flex justify-between">
                <h2 className="text-xl font-bold text-sky-600">Crear Modelo</h2>
                <button onClick={() => setModal(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <p className="text-sm font-bold text-neutral-400" >Ingresa los siguientes datos para guardar el modelo</p>

            <form className="mt-5" onSubmit={() => handleSaveModel(typeModal.ID)} >
                <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="text-base font-medium">Nombre del modelo</label>
                    <input 
                        type="text" 
                        id="name"
                        placeholder="Nombre del producto" 
                        className="px-2 py-1 border rounded bg-white"
                        value={nameModel}
                        onChange={(e) => setNameModel(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="text-base font-medium">Descripcion del modelo</label>
                    <textarea 
                        onChange={(e) => setDescriptionModel(e.target.value)}
                        value={descriptionModel}
                        className="px-2 py-1 border rounded h-40 bg-white"
                    />
                </div> 

                <div className="flex justify-center mt-5">
                    <button
                        type="submit"
                        className="px-2 py-1 bg-sky-600 text-neutral-100 font-bold uppercase rounded"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    )
}

export default TypesModal