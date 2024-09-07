import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">GalleryApp</span>
          </Link>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <a href="gallery-93963" className="text-sm  text-gray-500 dark:text-white hover:underline">Andres Felipe Garcia</a>
            {user ?
              <button className="text-sm  text-blue-600 dark:text-blue-500 hover:underline" onClick={handleLogout}>Logout</button>
              : <Link to="/login" className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Login</Link>}
          </div>
        </div>
      </nav>
      {user &&
        (
          <>
            <nav className="bg-gray-50 dark:bg-gray-700">
              <div className="max-w-screen-xl px-4 py-3 mx-auto">
                <div className="flex items-center">
                  <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                    <li>
                      <Link to="/" className="text-gray-900 dark:text-white hover:underline" aria-current="page">Gallery</Link>
                    </li>

                    <li>
                      <Link to={`/personal-gallery/${user?.uid}`} className="text-gray-900 dark:text-white hover:underline">PersonalGallery</Link>
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
    </>
  )
}

export default Navbar;