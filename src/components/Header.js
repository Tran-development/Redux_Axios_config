import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../assets/imgs/logo.png'
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogoutRedux } from '../redux/actions/userActions';

const Header = (props) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector(state => state.user.account)

  const a = null

  const handleLogout = () => {
    dispatch(handleLogoutRedux())
  }

  useEffect(() => {
    if (user && user.auth === false) {
      navigate("/")
      toast.success("Log out successfully!")
    }
  }, [user])

  return (

    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img
            src={logo}
            width='30'
            height='30'
            className='d-inline-block align-top'
            alt='Management Users'
          />
          <span>React-Fresher</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {(user && user.auth || window.location.pathname === '/') &&
            <>
              <Nav className="me-auto">
                <NavLink to='/' className="nav-link">Home</NavLink>
                <NavLink to="/users" className="nav-link">Manage Users</NavLink>
              </Nav>
              <Nav>
                {user && user.email && <div className='nav-link d-none d-sm-block'>Welcome <i>{user.email}</i>!</div>}
                <NavDropdown title="Setting" id="basic-nav-dropdown">
                  {user && user.auth === true ?
                    <NavDropdown.Item onClick={() => handleLogout()}>Logout</NavDropdown.Item>
                    : <NavLink to="/login" className="dropdown-item">Login</NavLink>
                  }
                </NavDropdown>
              </Nav>
            </>
          }


        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header