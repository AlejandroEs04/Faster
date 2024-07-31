import React from 'react'
import { openUploadWidget } from '../utils/CloudinaryService'

const ImageUpload = ({ setImageUrl }) => {
    const cloudName = "dmap6p5wl";
    const uploadPreset = "hrj8ndzc";

    const uploadImageWidget = () => {
        let myUploadWidget = openUploadWidget(
            {
                cloudName: cloudName, 
                uploadPreset: uploadPreset, 
                sources: ["local", "url", "camera"]
            }, 
            function (error, result) {
                if (!error && result.event === "success") {
                    setImageUrl(result.info.url);
                }
            }
        )
        myUploadWidget.open();
    }
  return (
    <button className="px-2 py-1 bg-neutral-700 text-white hover:bg-neutral-800 transition-colors rounded-lg" onClick={uploadImageWidget}>
        Subir Imagen
    </button>
  )
}

export default ImageUpload