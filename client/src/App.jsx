import {BrowserRouter, Routes, Route} from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Signin from './pages/Signin'
import Signup from './pages/Signup'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' Component={Home} />
      <Route path='/profile' Component={Profile} />
      <Route path='/about' Component={About} />
      <Route path='/signin' Component={Signin} />
      <Route path='/signup' Component={Signup} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
