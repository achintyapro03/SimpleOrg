import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import CreateOrg from './pages/CreateOrg';
import PrivateRoute from './pages/PrivateRoute';
import Org from './pages/Org';
import Event from './pages/Event';
// import Modal from './components/Modal';

function App() {
  return (
    <>
      <Router>
        {/* <div> */}
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          {/* <Route path='/new-org' element={<PrivateRoute />}> */}
          {/* <Route path='/new-org' element={<CreateOrg />} /> */}
          {/* </Route> */}
          <Route path='/org/:orgId' element={<PrivateRoute />}>
            <Route path='/org/:orgId' element={<Org />} />
          </Route>
          <Route path='/event/:eventId' element={<PrivateRoute />}>
            <Route path='/event/:eventId' element={<Event />} />
          </Route>
        </Routes>
        {/* </div> */}
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
