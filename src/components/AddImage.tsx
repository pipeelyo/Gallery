import { useState } from "react";
import { uploadFiles } from "../lib/Controller";

const AddImage = () => {
    const [image, setImage] = useState<any>()
    const handleIMage = (e:any) => {
        setImage(e.target.files[0])   
    }

    const sendImage = async () => {
        try {
            await uploadFiles(image)    
        } catch (error:any) {
            console.log(error.message);
            
        }
    }
    return (
        <>
           <label htmlFor="labelImage">Agregar una imagen</label>
           <input type="file" name="Image" id="Image" onChange={handleIMage} />
           <br />
           <button onClick={sendImage}>upload image</button>
        </>
    )
}

export default AddImage;