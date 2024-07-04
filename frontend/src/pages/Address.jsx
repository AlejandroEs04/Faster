import AddressForm from '../components/AddressForm';

const Address = () => {
  return (
    <div className='flex justify-center py-5'>
        <div className="p-4 flex justify-center">
          <div className="max-w-2xl">
            <h1 className="font-bold text-neutral-700 uppercase text-2xl px-5">Informacion del usuario</h1>
            <p className="text-neutral-500 px-5 font-medium mb-4">Revisa o edita informacion acerca de la cuenta, como direccion, correo, contraseña, etc.</p>
            <AddressForm 
              button={true}
              active={false}
            />
          </div>
        </div>
    </div>
  )
}

export default Address