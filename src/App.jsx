import './App.css'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Cuisinestable from './pages/Cuisine';


function App() {
  return(
    <div className="app">
      <Router>
        <Routes>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/cuisine' element={<Cuisinestable />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
