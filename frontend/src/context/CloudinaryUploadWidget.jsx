import { createContext, useEffect, useState } from "react";

// Create a context to manage the script loading state 
const CloudinaryScriptContext = createContext();

function CloudinaryUploadWidget({ uwConfig, setPublicId, setImageUrl }) {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // Check if the script is alredy loaded
        if(!loaded) {
            const uwScript = document.getElementById("uw");
            if(!uwScript) {
                // If not loaded, create and load the script
                const script = document.createElement("script");
                script.setAttribute("async", "");
                script.setAttribute("id", "uw");
                script.src = "https://upload-widget.cloudinary.com/global/all.js";
                script.addEventListener("load", () => setLoaded(true));
                document.body.appendChild(script);
            } else {
                // If alredy loaded, update the state 
                setLoaded(true);
            }
        }
    }, [loaded]);

    const initializeCloudinaryWidget = () => {
        if(loaded) {
            var myWidget = window.cloudinary.createUploadWidget(
                uwConfig, 
                (error, result) => {
                    if(!error && result.event === "success") {
                        console.log("Done! Here is the image info: ", result.info.url);
                        setPublicId(result.info.public_id);
                        setImageUrl(result.info.url);
                    }
                }
            );

            document.getElementById("upload_widget").addEventListener(
                "click",
                function () {
                    myWidget.open();
                },
                false
            );
        }
    }

    return (
        <CloudinaryScriptContext.Provider value={{ loaded }}>
            <button
                id="upload_widget"
                className="px-2 py-1 bg-sky-600 font-bold text-neutral-100 rounded"
                onClick={initializeCloudinaryWidget}
                type="button"
            >
                Seleccionar Imagen
            </button>
        </CloudinaryScriptContext.Provider>
    );
}

export default CloudinaryUploadWidget;
export { CloudinaryScriptContext };