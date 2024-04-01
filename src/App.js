import { useEffect, useState } from 'react';
import './App.scss';
import Header from './components/Header.js'
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';
import AppRoutes from "./routes/AppRoutes.js"
import { useDispatch } from 'react-redux';
import { handleRefresh } from './redux/actions/userActions.js';

function App() {

  const dispatch = useDispatch()
  
  // de cap nhat lai bien global
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(handleRefresh())
    }
  },[])

  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <AppRoutes />
        </Container>

      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
