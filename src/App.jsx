import './App.css'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Login from './pages/LoginRegister/Login';
import Register from './pages/LoginRegister/Register';
import Cuisinestable from './pages/User/Cuisine';
import Userstable from './pages/LoginRegister/User';
import LoginRegisterTemplate from "./pages/LoginRegister/LoginRegisterTemplate";
import UserTemplate from './pages/User/UserTemplate';
import ChatPage from './pages/User/ChatPage';
import Chat from './pages/User/App';
import { ToastContainer } from "react-toastify";

function App() {
  return(
    <div className="app">
      <Router>
        <Routes>
          <Route path='/' element={<LoginRegisterTemplate />}/>
          {/* <Route path='/register' element={<Register />}/> */}
          <Route path='/customer' element={<UserTemplate />}/>
          <Route path='/seller' element={<UserTemplate />}/>
          <Route path='/user' element={<UserTemplate />}/>

          <Route path='/chat' element={<ChatPage />}/>

        </Routes>
      </Router>
      <ToastContainer/>
    </div>
  )
}
//a
export default App
