import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

const ArticleMain = ({article}) => {
    const [image, setImage] = useState(false);
    const [button, setButton] = useState(false)

    useEffect(() => {
        if(article.image !== '') {
            setImage(true)
        } 

        if(article.url !== '') {
            setButton(true)
        }
    }, [])

  return (
    <div className={`flex flex-col sm:grid lg:flex xl:grid gap-4 ${image ? 'grid-cols-2' : 'grid-cols-1'} mt-4`}>
        <div className="flex flex-col justify-between">
            <div>
                <h3 className="text-xl text-sky-600 font-semibold uppercase">{article.title}</h3>
                <p>{article.text}</p>
            </div>
            
            {button && (
                <Link 
                    to={`/moreAbout/${article.url}`}
                    className="px-2 py-1 bg-neutral-600 font-bold text-neutral-100 uppercase rounded mt-4 text-center hover:bg-neutral-800 shadow hover:shadow-xl transition-all"
                >Saber más</Link>
            )}
        </div>

        <div className="flex justify-center items-center">
            {image && (
                <img src={article.imageUrl} alt={`Imagen del articulo ${article.title}`} className="w-full sm:max-w-64" />
            )}
        </div>
    </div>
  )
}

export default ArticleMain