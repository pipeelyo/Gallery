import { useEffect, useState } from "react";
import { getGalleryItemById, updateDocumentGallery } from "../lib/Controller";
import { IGallery } from "../types/Gallery";
import { useAuth } from "../context/authContext";
import { useNavigate, useParams } from "react-router-dom";

const UpdateImage = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [name, setName] = useState<any>()
  const [description, setDescription] = useState<any>()
  const [galleries, setGalleries] = useState<IGallery>({})
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchGalleryData = async () => {
      setIsLoading(true)
      const idDoc:string = id ? id : '';
      const userDocSnap = await getGalleryItemById(idDoc);
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

  const sendImage = async () => {
    try {
      const data: IGallery = {
        user: user?.uid,
        name: name,
        image: galleries?.image,
        description: description
      }
      await updateDocumentGallery(id, data)
      navigate(`/personal-gallery/${user?.uid}`)
    } catch (error: any) {
      console.log(error.message);
    }
  }

  if (isLoading) {
    return (
      <section className="flex justify-center items-center mt-6">
        <div>
          <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </section>
    )
  }
  
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Update a picture
              </h1>
              <div className="max-w-sm mx-auto">
                <div className="mb-5">
                  <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                  <input defaultValue={galleries?.name ?? 'ingrese un nombre'} type="text" id="base-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setName(e?.target?.value)} />
                </div>
                <div className="mb-5">
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                  <textarea defaultValue={galleries?.description ?? 'ingrese una descripcion'} id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..." onChange={(e) => setDescription(e?.target?.value)}></textarea>
                </div>
                <button className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={sendImage}>Update image</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default UpdateImage;