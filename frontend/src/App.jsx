import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './components/Home/Home/Home'
import SignInForm from './components/Login/SignInForm'
import DoctorProfile from './components/Doctor/DoctorProfile/DoctorProfile'
import Appointments from './components/Doctor/Appointments/Appointments'
import AdminDashboard from './components/Admin/Dashboard/Dashboard'
import Specialites from './components/Admin/Specialites/Specialites'
import SearchDoctor from './components/Doctor/SearchDoctor/SearchDoctor'
import BlogsEdit from './components/Doctor/Blogs/BlogsEdit'
import AddBlog from './components/Doctor/Blogs/AddBlog'
import Blog from './components/Blog/Blog'
import BlogDetails from './components/Blog/BlogDetails'
import Contact from './components/Contact/Contact'
import About from './components/About/About'
import Service from './components/Service/Service'
import ForgotPassword from './components/Login/ForgotPassword'
import NotFound from './components/UI/NotFound'
import MyProfile from './components/Doctor/Profile'
import Privacy from './components/privacy&Terms/Privacy'
import Terms from './components/privacy&Terms/Terms'
import DeletedBlogs from './components/DeletedBlogs'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<SignInForm />} />
            <Route path='/about' element={<About />} />
            <Route path='/service' element={<Service />} />
            <Route path='/users' element={<SearchDoctor />} />
            <Route path='/users/profile/:id' element={<DoctorProfile />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/blog' element={<Blog />} />
            <Route path='/blog/:id' element={<BlogDetails />} />
            <Route path='/blogs/:id' element={<BlogsEdit />} />
            <Route path='/blogs/create' element={<AddBlog />} />
            <Route path='/deletedBlogs' element={<DeletedBlogs />} />
            <Route path='/privacy' element={<Privacy />} />
            <Route path='/terms' element={<Terms />} />
            <Route path='/profile/:userid' element={<MyProfile />} />
            <Route path='/reset-password/:userId/:uniqueString' element={<ForgotPassword />} />
          </Route>

          {/* Admin Dashboard  */}
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/newBlogs' element={<Specialites />} />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router >
    </>
  )
}
export default App 
