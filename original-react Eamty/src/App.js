import {Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Checkout from './pages/Checkout';
import Products from './pages/Products';
import Store from './pages/Store';
import Admin from './pages/adminDashboard/Admin';
import "./styles/style.css"
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import OrderSuccess from './pages/OrderSuccess';
import Signin from './pages/Signin';
import RequireAuth from './components/RequireAuth';
import RequireAdmin from './components/RequireAdmin';
import Carts from './pages/Carts';

function App() {
  return (
    <div className="App">

<ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{zIndex:9999999}}
      />
   <Routes>
   <Route path="/" element={<Home></Home>}></Route>
   <Route path="*" element={<NotFound></NotFound>}></Route>
   <Route path="checkout" element={<RequireAuth><Checkout></Checkout></RequireAuth>}></Route>
   <Route path="carts" element={<RequireAuth><Carts></Carts></RequireAuth>}></Route>
   <Route path="/:id" element={<Products></Products>}></Route>
   <Route path="store" element={<Store></Store>}></Route>
   {/* <Route path="admin" element={<Admin></Admin>}></Route> */}
   {/* <Route path="admin" element={<RequireAdmin><Admin></Admin></RequireAdmin>}></Route> */}
   <Route path="admin" element={<RequireAuth><Admin></Admin></RequireAuth>}></Route>
   <Route path="signin" element={<Signin></Signin>}></Route>
   <Route path="success/:id" element={<OrderSuccess></OrderSuccess>}></Route>
   </Routes>
    </div>
  );
}

export default App;
