import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import CloudinaryImageWidget from "../components/CloudinaryImageWidget";
import axios from "axios";
import useShop from "../hooks/useShop";

const AdminArticles = () => {
    const [ newMainChild, setNewMainChild ] = useState(false);
    const [active, setActive] = useState(false);
    const [mainSection, setMainSection] = useState(null);

    const [title, setTitle] = useState('');

    const [subtitle, setSubtitle] = useState('');
    const [text, setText] = useState('');
    const [imageUrl, setImagenUrl] = useState('');
    const [button, setButton] = useState(false);

    const { articles } = useShop();

    const addChildArticle = async() => {
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/articles/${mainSection.ID}/subarticles`, {
                title: subtitle, text, imageUrl, button
            }, config)

            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(articles.length >= 1) {
            const mainSectionArray = articles.filter(article => article.ID === 1);

            setMainSection(mainSectionArray[0])
        }
    }, [articles])

    useEffect(() => {
        if(mainSection) {
            setTitle(mainSection.title)
        }
    }, [mainSection])

    return (
        <div className='flex justify-center py-10 px-5'>
        <div className='w-full md:w-2/3'>
            <h1 className='text-2xl text-sky-600 font-bold'>Modificar Articulos de la pagina</h1>

            <div className='m-5'>
                <h2 className='text-xl font-medium text-neutral-600'>Articulo Inicio</h2>
                
                <div className='mt-4 border border-dashed border-neutral-500 rounded-xl p-4'>
                    <div className='flex flex-col gap-4'>
                        <input 
                            type="text" 
                            placeholder='Titulo' 
                            className='p-1 max-w-60' 
                            value={title}
                            onChange={e => {
                                setTitle(e.target.value)
                            }}
                        />
                        
                        <div className='flex justify-center items-center border border-neutral-500 rounded-lg p-4 min-h-40'>
                            {mainSection?.articlesChild?.map(childArticle => (
                                <div className="grid grid-cols-2 gap-4 w-full" key={childArticle.ID}>
                                    <div className="flex flex-col gap-2">
                                        <input type="text" placeholder='Subtitulo' className='p-1' value={childArticle.title} />
                                        <textarea className="h-28">{childArticle.text}</textarea>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        {childArticle.imageUrl === '' ? (
                                            <p>No se subio ninguna imagen</p>
                                        ) : (
                                            <div className="flex justify-center">
                                                <img src={childArticle.imageUrl} alt="Imagen del nuevo articulo" className="w-full max-w-60" />
                                            </div>
                                        )}
                                        
                                        {childArticle.url ? (
                                            <Link
                                                to={`/moreAbout/${childArticle.title}`}
                                                className="px-2 py-1 bg-sky-600 hover:bg-sky-700 transition-colors text-neutral-100 rounded text-center uppercase"
                                            >
                                                Saber más
                                            </Link>
                                        ) : (
                                            <button 
                                                onClick={() => setButton(true)}
                                                className="flex justify-center items-center border border-dashed border-neutral-500 rounded p-1 gap-1"
                                            >
                                                <p>Añadir Boton</p>
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                    </svg>
                                                </div>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='flex justify-center items-center border border-dashed border-neutral-500 rounded-lg p-4 min-h-40'>
                            {newMainChild ? (
                                <form 
                                    onSubmit={e => {
                                        addChildArticle()
                                    }} 
                                    className="grid grid-cols-2 gap-4 w-full"
                                >
                                    <div className="flex flex-col gap-2">
                                        <input type="text" placeholder='Subtitulo' className='p-1' value={subtitle} onChange={e => setSubtitle(e.target.value)} />
                                        <textarea className="h-28" onChange={e => setText(e.target.value)} ></textarea>

                                        <button 
                                            type="submit"
                                            className="bg-sky-600 hover:bg-sky-700 transition-colors text-neutral-100 font-bold"
                                        >
                                            Guardar
                                        </button>
                                    </div>
                                    
                                    <div>
                                        <div className="flex flex-col gap-2">
                                            {imageUrl === '' ? (
                                                <CloudinaryImageWidget 
                                                    setImagenUrl={setImagenUrl}
                                                />
                                            ) : (
                                                <div className=" max-w-60">
                                                    <img src={imageUrl} alt="Imagen del nuevo articulo" className="w-full" />
                                                </div>
                                            )}
                                            
                                            {button ? (
                                                <button
                                                    className="px-2 py-1 bg-neutral-600 text-neutral-100 rounded"
                                                    disabled
                                                >
                                                    Saber más
                                                </button>
                                            ) : (
                                                <button 
                                                    onClick={() => setButton(true)}
                                                    className="flex justify-center items-center border border-dashed border-neutral-500 rounded p-1 gap-1"
                                                >
                                                    <p>Añadir Boton</p>
                                                    <div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                        </svg>
                                                    </div>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </form>
                            ) : (
                                <>
                                    <button
                                        type='button'
                                        onClick={() => setNewMainChild(true)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    <button className="bg-neutral-600 font-bold px-2 py-1 text-neutral-100 mt-2 rounded hover:bg-neutral-700 transition-colors">Guardar</button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default AdminArticles