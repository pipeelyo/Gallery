import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import PersonGallery from './components/PersonGallery';
import PersonalGallery from './components/PersonalGallery';
import Gallery from './components/Gallery';
import NotFound from './components/NotFound';
import Register from './components/Register';
import { AuthProvider } from './context/authContext';
import Forgot from './components/Forgot';
import AddImage from './components/AddImage';
import ProtectedRoute from './reusable/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot' element={<Forgot />} />
        <Route path='/person-gallery/:id' element={<PersonGallery />} />
        <Route path='/personal-gallery' element={<PersonalGallery />} />
        <Route path='/' element={<Gallery />} />
        <Route path='*' element={<NotFound />} />
        {/* rutas protegidas */}
        <Route path="/add-image" element={<ProtectedRoute children={<AddImage />} />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
