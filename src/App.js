import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepgae from './Components/Homepage';
import ForgotPass from './Components/ForgotPass';
import Auth from './Components/Auth';
import ChatScreen from './Components/ChatScreen';
import ChatProvider from './Context/ChatProvider';
import SocketProvider from './Context/SocketProvider';
import ChatIdProvier from './Context/ChatIdProvider';




function App() {
  return (
    <BrowserRouter>
    <ChatIdProvier>
      <ChatProvider>
        <Routes>
          <Route path='/' element={<Auth />} />
          <Route path='/home' element={<Homepgae />} />
          <Route path='/Reset-Password' element={<ForgotPass />} />
          <Route path='/Chat/:user' element={<ChatScreen />} />
        </Routes>
      </ChatProvider>
      </ChatIdProvier>

    </BrowserRouter>
  );
}

export default App;