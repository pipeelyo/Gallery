import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import PersonGallery from './components/PersonGallery';
import PersonalGallery from './components/PersonalGallery';
import Gallery from './components/Gallery';
import NotFound from './components/NotFound';
import Register from './components/Register';
import Forgot from './components/Forgot';
import AddImage from './components/AddImage';
import UpdateImage from './components/UpdateImage';

function App() {
  return (
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot' element={<Forgot />} />
        <Route path='/person-gallery/:id' element={<PersonGallery />} />
        <Route path='/personal-gallery/:id' element={<PersonalGallery />} />
        <Route path='/update-image/:id' element={<UpdateImage />} />
        <Route path='/' element={<Gallery />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/add-image' element={<AddImage />} />
      </Routes>
  );
}

export default App;
