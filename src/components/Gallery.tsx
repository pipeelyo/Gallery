import { DocumentData, onSnapshot, QuerySnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { galleryCollection } from "../lib/Controller";
import { IGallery } from "../types/Gallery";
import { Link } from "react-router-dom";
// import { useAuth } from "../context/authContext";

const Gallery = () => {
  // const { user } = useAuth();
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
  return (
    <>
      <div className="container mx-auto">
        {/* <h1 className="" >Gallery</h1> */}
        {galleries && galleries.length ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {
              galleries?.map((gallery) => (
                <div key={gallery?.id}>
                  <Link to={"/person-gallery/" + gallery?.user}>
                    <img className="h-auto max-w-full rounded-lg" src={gallery?.image} alt="" />
                  </Link>
                </div>
              ))
            }
          </div>
        ) : (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">¡Oops!</strong>
            <span className="block sm:inline">Data no encontrada.</span>
          </div>
        )}
      </div>
    </>
  )
}

export default Gallery;