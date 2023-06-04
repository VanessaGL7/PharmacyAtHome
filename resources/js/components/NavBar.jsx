import React, { useEffect, useState,useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Outlet, Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { AuthContext } from './Auth/AuthContext';
function NavBar() {
  const navigate = useNavigate();
  const { userLogged, setUserLogged } = useContext(AuthContext);
  const { token, setToken } = useContext(AuthContext);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    navigate('/web-development/public')
    setUserLogged(false);
  }
  return (
    <>
      <Navbar bg="light" expand="lg" style={{ boxShadow: '0px 5px 5px #D9D9D9' }}>
        <Container fluid>
          <Navbar.Brand as={Link} to='/web-development/public'><h3 className='py-1 fw-bold' style={{ color: '#0D6EFD' }}>Control de Inventarios</h3></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 justify-content-end flex-grow-1"
              style={{ maxHeight: '100px' }}
              navbarScroll>

              <Nav.Link as={Link} to='areas'>Areas</Nav.Link>
              <Nav.Link as={Link} to='almacenes'>Almacenes</Nav.Link>
              <Nav.Link as={Link} to='jefes'>Jefes de Almacen</Nav.Link>
              {!userLogged && (
                <>
                <Nav.Link as={Link} to='login'>Iniciar Sesión</Nav.Link>
                <Nav.Link as={Link} to='signin'>Registrarse</Nav.Link>
                </>
              )}
              {userLogged && (
                <Nav.Link onClick={logout}>Cerrar Sesión</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <section>
        <Outlet></Outlet>
      </section>
    </>

  );
}

export default NavBar;