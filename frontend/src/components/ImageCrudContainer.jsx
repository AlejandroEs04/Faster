import CloudinaryImageWidget from "./CloudinaryImageWidget"

const ImageCrudContainer = ({ setImageUrl }) => {
    return (
        <div>
            <label htmlFor="image">Imagen</label>
            <CloudinaryImageWidget 
                setImagenUrl={setImageUrl}
            />
        </div>
    )
}

export default ImageCrudContainer