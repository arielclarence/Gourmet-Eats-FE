import './App.css'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Login from './pages/LoginRegister/Login';
import Register from './pages/LoginRegister/Register';
import Cuisinestable from './pages/LoginRegister/Cuisine';
import Userstable from './pages/LoginRegister/User';
import LoginRegisterTemplate from "./pages/LoginRegister/LoginRegisterTemplate";

function App() {
  return(
    <div className="app">
      <Router>
        <Routes>
          <Route path='/' element={<LoginRegisterTemplate />}/>
          {/* <Route path='/register' element={<Register />}/> */}
          <Route path='/cuisine' element={<Cuisinestable />}/>
          <Route path='/user' element={<Userstable />}/>

        </Routes>
      </Router>
    </div>
  )
}
//a
export default App
