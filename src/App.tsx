import './assets/css/tailwind.css';
import './assets/css/materialdesignicons.min.css';
import './assets/css/admin.css';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { StyleManager } from './components/StyleManager';
import Index from './pages';
import IntroductoryOffer from './pages/introductory-offer';
import Error from './pages/error';

function App() {
  return (
    <AuthProvider>
      <StyleManager />
      <Routes>
        {/* Public routes */}
        <Route path='/' element={<Index/>} />
        <Route path='/introductory-offer' element={<IntroductoryOffer/>} />

        {/* Catch all - 404 page */}
        <Route path='*' element={<Error/>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
