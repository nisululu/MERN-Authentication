import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Header from './components/Header'
import ProtectedRoute from './components/ProtectedRoute'
import { useSelector } from 'react-redux'

function App() {

  const { currentUser } = useSelector((state) => state.user)

  return (
    <BrowserRouter>
      <Header currentUser={currentUser} />
      <Routes>
        <Route path='/' Component={Home} />
        <Route element={<ProtectedRoute currentUser={currentUser} />}>
          <Route path='/profile' Component={Profile} />
        </Route>
        <Route path='/about' Component={About} />
        <Route path='/sign-in' Component={Signin} />
        <Route path='/sign-up' Component={Signup} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
