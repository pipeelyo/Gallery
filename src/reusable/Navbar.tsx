import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <a href="https://flowbite.com" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">GalleryApp</span>
                    </a>
                    <div className="flex items-center space-x-6 rtl:space-x-reverse">
                        <a href="gallery-93963" className="text-sm  text-gray-500 dark:text-white hover:underline">Andres Felipe Garcia</a>
                        <Link to="/login" className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Login</Link>
                    </div>
                </div>
            </nav>
            <nav className="bg-gray-50 dark:bg-gray-700">
                <div className="max-w-screen-xl px-4 py-3 mx-auto">
                    <div className="flex items-center">
                        <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                            <li>
                                <Link to="/" className="text-gray-900 dark:text-white hover:underline" aria-current="page">Gallery</Link>
                            </li>
                            <li>
                                <Link to="/personal-gallery" className="text-gray-900 dark:text-white hover:underline">PersonalGallery</Link>
                            </li>
                            <li>
                                <Link to="/add-image" className="text-gray-900 dark:text-white hover:underline">Agregar Imagen</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;