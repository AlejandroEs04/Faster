import ProductosInicio from '../components/ProductosInicio'
import MainCarrousel from "../components/MainCarrousel";
import ProductsList from "../components/ProductsList";
import ContactUsForm from '../components/ContactUsForm';

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

          <div className='flex justify-center md:justify-end'>
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

        <ContactUsForm />
      </div>

    </div>
  )
}

export default Index
