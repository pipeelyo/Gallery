import { DocumentData, onSnapshot, QuerySnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { galleryCollection } from "../lib/Controller";
import { IGallery } from "../types/Gallery";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Gallery = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [galleries, setGalleries] = useState<IGallery[]>([])

    useEffect(() => {
        onSnapshot(galleryCollection,
            (snapshot: QuerySnapshot<DocumentData>) => {
                setGalleries(
                    snapshot.docs.map((doc) => {
                        return {
                            id: doc.id,
                            ...doc.data()
                        }
                    })
                );
            })
    }, [])
    // console.log('gallerys', galleries);
    // console.log('authContext', user);

    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }

    return (
        <>
            {user && (<button onClick={handleLogout}>logout</button>)}

            <h1 className="bg-blue-500 text-white p-4" >Gallery</h1>
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
                                <Link to={"/person-gallery/" + gallery?.user}>Galeria personal</Link>
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

export default Gallery;