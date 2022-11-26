import './App.css';
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Authentication from './Components/Authentication';


function App() {
  

  return (
    <div className='flex flex-col justify-center '>
    <ToastContainer/>
    <Authentication/>
   
    </div>
  );
}

export default App;
