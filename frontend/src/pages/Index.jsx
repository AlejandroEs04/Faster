import ProductosInicio from '../components/ProductosInicio'
import MainCarrousel from "../components/MainCarrousel";
import ProductsList from "../components/ProductsList";

const Index = () => {
  return (
    <div>
      <MainCarrousel />

      <ProductosInicio />

      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-14'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
          <div className='col-span-1 md:col-span-2'>
            <h2 className="font-bold text-3xl text-sky-600 uppercase">¿Qué ofrecemos?</h2>
            <p className="text-justify text-lg leading-relaxed tracking-wide">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates error vitae, explicabo at illo beatae placeat harum quia tenetur dignissimos dolorum quisquam ducimus dolores nostrum optio aspernatur aliquid quo ullam.</p>
            <p className="text-justify text-lg leading-relaxed tracking-wide">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam accusamus iusto quas suscipit quis cumque, facere excepturi quam! Quae at molestias laborum animi vitae eaque, similique officiis magni in eum.</p>
          </div>

          <div className='flex justify-end'>
            <div className='max-w-80'>
              <div className="sm:max-w-sm border fondoGrid p-5">
                <img src="/img/mainImageGuantes.jpg" alt="Guantes" className="redondeoImagen" />
              </div>

              <div className="fondoGrid w-full absolute -z-10"></div>
            </div>
          </div>
        </div>

        <ProductsList 
          textColor='text-neutral-800'
        />

        <div className='my-10'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5 bg-white shadow rounded mt-2'>
            <form className='flex flex-col gap-2 p-4'>
              <h2 className='text-neutral-800 font-semibold text-3xl'>Contactanos</h2>
              <p>Llena la informacion que se solicita para contactarte con Faster</p>
              <div className='flex flex-col'>
                <label htmlFor="name" className='text-lg font-medium'>Nombre</label>
                <input type="text" name="name" id="name" placeholder='Nombre' className='p-1 rounded border' />
              </div>
              
              <div className='flex flex-col'>
                <label htmlFor="lastName" className='text-lg font-medium'>Apellido(s)</label>
                <input type="text" name="lastName" id="lastName" placeholder='Apellido(s)' className='p-1 rounded border' />
              </div>

              <div className='flex flex-col'>
                <label htmlFor="email" className='text-lg font-medium'>Correo</label>
                <input type="email" name="email" id="email" placeholder='Ej. correo@correo.com' className='p-1 rounded border' />
              </div>

              <div className='flex flex-col'>
                <label htmlFor="lastName" className='text-lg font-medium'>Mensaje</label>
                <textarea name="message" id="message" className='p-1 rounded border'></textarea>
              </div>

              <button className='bg-sky-600 px-2 py-1 rounded text-white hover:bg-sky-700 transition-colors'>Enviar</button>
            </form>

            <div className='p-4 bg-neutral-500 text-white rounded-r'>
              <h3 className='font-semibold text-2xl text-center'>Medios de contactos</h3>
              <p className='text-center'>Tambien puedes contactarte con nosotros por los siguientes medios</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Index
