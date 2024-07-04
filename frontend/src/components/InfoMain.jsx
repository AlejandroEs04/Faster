import TransitionScroll from 'react-transition-scroll'
import Container from "./Container"

import 'react-transition-scroll/dist/index.css'

const InfoMain = () => {
  return (
    <TransitionScroll
        reAnimate={true}
    >
        <div className='flex justify-center relative'>
            <div className='my-10 mx-0 sm:mx-4 w-full md:w-2/3 xl:w-1/2'>
                <Container
                    bgColor={'white'}
                >
                    <div>
                        <h2 className='text-2xl font-semibold text-sky-600 uppercase mb-2'>Guantes de latex</h2>
                        <div className="flex flex-col border-b-2 pb-4">
                            <h3 className='text-xl font-medium uppercase text-neutral-400'>Lisos</h3>
                            <p className='text-lg font-semibold text-neutral-700'>Bajos en polvo</p>
                            <p className='text-neutral-700 text-justify'>100% de latex natural, bajos en polvo para el cuidado de tu piel y con un nivel estándar en proteína luego de largas jornadas de uso continuo.</p>
                        </div>

                        <div className="flex flex-col mt-4">
                            <h3 className='text-xl font-medium uppercase text-neutral-400'>Texturizados</h3>
                            <p className='text-lg font-semibold text-neutral-700'>Libres de polvo</p>
                            <p className='text-neutral-700 text-justify'>Totalmente texturizados para brindarte un plus de agarre, sin restarles la sensibilidad necesaria para una optima exploración. 100% de latex y libres de polvo</p>
                        </div>
                    </div>

                    <div>
                        <h2 className='text-2xl font-semibold text-sky-600 uppercase mb-2'>Guantes de nitrilo</h2>
                        <div className="flex flex-col">
                            <h3 className='text-xl font-medium uppercase text-neutral-400'>Texturizados</h3>
                            <p className='text-lg font-semibold text-neutral-700'>Libres de polvo</p>
                            <p className='text-neutral-700 text-justify'>Fabricados a base de componentes de nitrilo, un material sintético muy resistente, que brinda al usuario una excelente cobertura de seguridad ante agentes biologicos, solventes, aceites y otros quimicos. Son la opcion ideal para quienes presentan alergia al látex natural y son libres de pólvo</p>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    </TransitionScroll>
  )
}

export default InfoMain