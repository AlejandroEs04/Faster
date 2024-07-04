import useShop from "../hooks/useShop";
import ModelsInfo from "./ModelsInfo";
import ProductType from "./ProductType";

const ProductosInicio = () => {
  const { types, handleChangeType, type } = useShop();

  return (
    <div className='lg:grid lg:grid-cols-5 flex flex-col shadow-lg'>
        <div className='bg-neutral-700 p-2 py-10 md:p-16 col-span-2'>
            <h1 className='text-2xl uppercase font-bold text-neutral-100'>Nuestros Productos</h1>
            <p className='text-lg text-neutral-400'>Selecciona el tipo de producto que te interesa para saber mas de el</p>

            <div className="mt-12 p-2 bg-neutral-200 flex flex-col rounded-md">
              <h2 className="text-lg font-bold mb-2 px-2 text-sky-600">Selecciona un modelo</h2>
              {types?.map(type => (
                <button onClick={() => handleChangeType(type.ID)} key={type.ID} className="py-3 px-2 border-b-neutral-800 first-of-type:border-t-neutral-800 last-of-type:border-b-0 hover:bg-neutral-200 text-neutral-700 hover:text-sky-600 transition-colors text-start">
                  <p className="font-bold uppercase text-base">{type.name}</p>
                  <p className="text-xs">{type.description}</p>
                </button>
              ))}
            </div>
        </div>

        <div className='bg-neutral-100 p-2 py-10 md:p-16 col-span-3'>
            {!type ? <ModelsInfo /> : (
              <div className="overflow-x-auto flex flex-col gap-5">
                <ProductType id={type} />
              </div>
            )}
        </div>
    </div>
  )
}

export default ProductosInicio
