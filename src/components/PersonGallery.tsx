import { useParams } from "react-router-dom";
import {getByUser } from "../lib/Controller";
import { useEffect, useState } from "react";
import { IGallery } from "../types/Gallery";

const PersonGallery = () => {
    const { id } = useParams();
    const [galleries, setGalleries] = useState<IGallery[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchGalleryData = async () => {
            setIsLoading(true)
            const userDocSnap = await getByUser(id);
            console.log('userDocSnap', userDocSnap);
            if (userDocSnap) {
                setGalleries(userDocSnap)
                setIsLoading(false)
            } else {
                console.log('Documento no encontrado')
            }
        }
        fetchGalleryData();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if (isLoading) return <div>cargando...</div>
    return (
        <>
            <h1>Person Gallery</h1>
            {galleries && galleries.length ? (
                <div>
                    {
                        galleries?.map((gallery) => (
                            <div key={gallery?.id}>
                                <img
                                    src={gallery?.image}
                                    width={500}
                                    height={500}
                                    alt="Descripción de la imagen" />
                                <p>{gallery?.name}</p>
                                <p>{gallery?.description}</p>
                            </div>
                        ))
                    }
                </div>
            ) : (
                <div>
                    Data no encontrada
                </div>
            )}
        </>
    )
}

export default PersonGallery;