import './assets/css/tailwind.css';
import './assets/css/materialdesignicons.min.css';
import './assets/css/admin.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { StyleManager } from './components/StyleManager';
import Index from './pages';
import Blog from './pages/blog';
import IndexThree from './pages/index-three';
import IndexLight from './pages/index-light';
import AboutUs from './pages/aboutus';
import Pricing from './pages/pricing';
import Services from './pages/services';
import BlogDetails from './pages/blog-detail';
import Helpcenter from './pages/helpcenter';
import Terms from './pages/terms';
import Privacy from './pages/privacy';
import Error from './pages/error';
import Contact from './pages/contact';
import ArticlePreview from './pages/article-preview';
import AdminLogin from './pages/admin/login';
import AdminDashboard from './pages/admin/dashboard';

function App() {
  return (
    <AuthProvider>
      <StyleManager />
      <Routes>
        {/* Public routes */}
        <Route path='/' element={<Index/>} />
        <Route path='/index-three' element={<IndexThree/>} />
        <Route path='/index-light' element={<IndexLight/>} />
        <Route path='/blog' element={<Blog/>} />
        <Route path='/aboutus' element={<AboutUs/>} />
        <Route path='/pricing' element={<Pricing/>} />
        <Route path='/services' element={<Services/>} />
        <Route path='/blog-detail' element={<BlogDetails/>} />
        <Route path='/blog-detail/:id' element={<BlogDetails/>} />
        <Route path='/helpcenter' element={<Helpcenter/>} />
        <Route path='/terms' element={<Terms/>} />
        <Route path='/privacy' element={<Privacy/>} />
        <Route path='/error' element={<Error/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/articles/:slug' element={<ArticlePreview/>} />

        {/* Admin routes */}
        <Route path='/admin/login' element={<AdminLogin/>} />
        <Route path='/admin/dashboard' element={<AdminDashboard/>} />
        <Route path='/admin/categories' element={<AdminDashboard/>} />
        <Route path='/admin/articles' element={<AdminDashboard/>} />
        <Route path='/admin' element={<Navigate to="/admin/dashboard" replace />} />

        {/* Catch all */}
        <Route path='*' element={<Error/>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
