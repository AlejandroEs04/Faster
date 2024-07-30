import { useEffect, useState } from 'react';
import axios from 'axios'
import LocationSearchInput from '../classes/LocationSearchInput'
import useAuth from '../hooks/useAuth';
import { toast } from "react-toastify";

const AddressForm = ({button, active}) => {
    const { auth, setAuth } = useAuth();

    const [countries, setCountries] = useState([]);
    const [disable, setDisable] = useState(false);

    // Variables del formulario
    const [address, setAddress] = useState(auth.address);
    const [street, setStreet] = useState(auth.street);
    const [externNumber, setExternNumber] = useState(auth.externNumber);
    const [internNumber, setInternNumber] = useState(auth.internNumber);
    const [neighborhood, setNeighborhood] = useState(auth.neighborhood);
    const [city, setCity] = useState(auth.city);
    const [state, setState] = useState('Nuevo Léon');
    const [postalCode, setPostalCode] = useState(auth.postalCode);
    const [country, setCountry] = useState('Mexico');

    const handleSaveAddress = async() => {
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/porfile`, {
                address, neighborhood, city, state, postalCode, country, street, internNumber, externNumber
            }, config)

            setAuth(data.user)

            toast.success("Direccion Actualizada", {
                position: toast.POSITION.BOTTOM_RIGHT
            })

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const getCountries = async() => {
            const {data} = await axios('https://restcountries.com/v3.1/all?fields=name,cioc,cca2,flags');

            setCountries(data)
        }

        getCountries();

        setDisable(active)
    }, [])

    

    return (
        <form 
            className='px-5 py-2 flex flex-col gap-1'
            onSubmit={(e) => {
                e.preventDefault()
                handleSaveAddress()
            }}
        >
            <div className='flex flex-col'>
                <label className='font-medium text-neutral-500'>Direccion</label>
                <LocationSearchInput 
                    setAddress={setAddress}
                    address={address}
                    status={disable}
                />
            </div>

            <div className='flex flex-col'>
                <label className='font-medium text-neutral-500' htmlFor='colony'>Calle</label>
                <input 
                    type='text' 
                    placeholder='Calle' 
                    id='street'
                    className='px-2 py-1 border'
                    value={street}
                    onChange={e => setStreet(e.target.value)}
                    disabled={disable}
                />
            </div>

            <div className='flex flex-col'>
                <label className='font-medium text-neutral-500' htmlFor='extern'>Numero Ext.</label>
                <input 
                    type='number' 
                    placeholder='Numero Ext.' 
                    id='extern'
                    className='px-2 py-1 border'
                    value={externNumber > 0 && externNumber}
                    onChange={e => setExternNumber(e.target.value)}
                    disabled={disable}
                />
            </div>

            <div className='flex flex-col'>
                <label className='font-medium text-neutral-500' htmlFor='intern'>Numero Int.</label>
                <input 
                    type='number' 
                    placeholder='Numero Int. ' 
                    id='intern'
                    className='px-2 py-1 border'
                    value={internNumber > 0 && internNumber}
                    onChange={e => setInternNumber(e.target.value)}
                    disabled={disable}
                />
            </div>

            <div className='flex flex-col'>
                <label className='font-medium text-neutral-500' htmlFor='colony'>Colonia</label>
                <input 
                    type='text' 
                    placeholder='Colonia' 
                    id='colony'
                    className='px-2 py-1 border'
                    value={neighborhood}
                    onChange={e => setNeighborhood(e.target.value)}
                    disabled={disable}
                />
            </div>

            <div className='flex flex-col'>
                <label className='font-medium text-neutral-500' htmlFor='city'>Ciudad / Delegacion</label>
                <input 
                    type='text' 
                    placeholder='Ciudad / Delegacion' 
                    id='city'
                    className='px-2 py-1 border'
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    disabled={disable}
                />
            </div>

            <div className='flex flex-col'>
                <label className='font-medium text-neutral-500' htmlFor='postalCode'>Codigo Postal</label>
                <input 
                    type='text' 
                    placeholder='Codigo Postal' 
                    id='postalCode'
                    className='px-2 py-1 border'
                    value={postalCode}
                    onChange={e => setPostalCode(e.target.value)}
                    disabled={disable}
                />
            </div>

            <div className='flex flex-col'>
                <label className='font-medium text-neutral-500' htmlFor='state'>Estado / Provincia</label>
                <input 
                    type='text' 
                    placeholder='Estado / Provincia' 
                    id='state'
                    className='px-2 py-1 border'
                    value={state}
                    onChange={e => setState(e.target.value)}
                    disabled
                />
            </div>

            <div className='flex flex-col'>
                <label className='font-medium text-neutral-500' htmlFor='postalCode'>País</label>
                <select className='px-2 py-1 border' onChange={e => setCountry(e.target.value)} value={country} disabled>
                    {countries?.sort((a, b) => b.name.common-a.name.common).map(country => (
                        <option key={country.cca2} value={country.name.common} >
                            {country.name.common}
                        </option>
                    ))}
                </select>
            </div>

            {button ? (
                <button
                    className='px-2 py-1 bg-sky-600 hover:bg-sky-700 transition-colors text-neutral-100 font-bold mt-4 rounded'
                >Guardar Direccion</button>
            ) : (
                <button
                    className='px-2 py-1 bg-neutral-600 hover:bg-neutral-700 transition-colors text-neutral-100 font-bold mt-4 rounded'
                >Editar Direccion</button>
            )}

            <p className='mt-2 font-bold'>Por el momento solo se hacen entregas dentro del <span className='text-sky-600'>Area Metropolitana de Monterrey</span></p>
            
        </form>
    )
}

export default AddressForm