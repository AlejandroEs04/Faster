import { useState, useEffect } from "react";
import CloudinaryUploadWidget from "../context/CloudinaryUploadWidget";
import { Cloudinary } from "@cloudinary/url-gen";

const CloudinaryImageWidget = ({setImagenUrl}) => {
    const [publicId, setPublicId] = useState("");
    const [cloudName] = useState("dmap6p5wl");
    const [uploadPreset] = useState("hrj8ndzc");

    const [uwConfig] = useState({
        cloudName, 
        uploadPreset
    });

    // Create a Cloudinary instance and set your cloud name.
    const cld = new Cloudinary({
        cloud: {
            cloudName
        }
    });

    const myImage = cld.image(publicId);

    return (
        <>
            <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} setImageUrl={setImagenUrl} />
        </>
    )
}

export default CloudinaryImageWidget
