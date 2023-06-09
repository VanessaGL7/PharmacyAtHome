import React, { useState, useContext, useEffect } from 'react'
import ReactDOM from 'react-dom/client';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Link } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import { AuthContext } from './AuthContext';

function LoginScreen() {

  const [formOk, setFormOk] = useState(true);
  const [textError, setTextError] = useState('');

  const [formValue, setformValue] = useState({
    email: '',
    password: '',
  });

  const listener = (e) => {
    e.persist();
    setformValue({ ...formValue, [e.target.name]: e.target.value });
  }
  const [showWarningLogin, setShowWarningLogin] = useState(false);
  const warningLoginClose = () => setShowWarningLogin(false);
  const warningLoginShow = () => setShowWarningLogin(true);

  const { setUserLogged } = useContext(AuthContext);
  const { setToken } = useContext(AuthContext);
  const [showSuccessLogin, setShowSuccessLogin] = useState(false);

  const successLoginShow = () => setShowSuccessLogin(true);

  const navigate = useNavigate();

  const login = (e) => {

    //VALIDACION
    e.preventDefault();
    setFormOk(true);
    if (formValue.email.trim() === "" || formValue.password.trim() === "") {
      setTextError('Error, todos los campos son obligatorios');
      setFormOk(false);
      return;
    }
    if (formOk) {
      if (e && e.preventDefault()) e.preventDefault();
      const formData = new FormData();
      formData.append("email", formValue.email)
      formData.append("password", formValue.password)
      axios.post("http://localhost/PharmacyAtHome/public/api/login",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
          }
        }
      ).then(response => {
        console.log(response)
        console.log(response.status)
        if (response.status == 200) {
          localStorage.setItem('token', response.data.token);
          setUserLogged(true);
          setToken(response.data.token);
          //console.log(response.data.user);
          console.log('Token'+response.data.token);
          navigate("/PharmacyAtHome/public");

        }
      }).catch(error => {
        console.log(error);
        warningLoginShow();
      });

    }

  }

  return (
    <Row className='mt-5 justify-content-center'>
      {!formOk && (<Alert key='danger' variant='danger'>{textError}</Alert>)}
      <Card style={{ width: '30rem' }}>
        <Card.Body>
          <Card.Title className='fw-bold fs-3'>Inicio de Sesión</Card.Title>
          <Form onSubmit={login}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" value={formValue.email} onChange={listener} />
              <Form.Text className="text-muted">
                Ingresa el correo electronico con el que te registraste.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" placeholder="Password" value={formValue.password} onChange={listener} />
            </Form.Group>
            <Button variant="primary" type="submit">Iniciar Sesion</Button>
            <div className='text-center'><Form.Label className="mt-2">¿No tienes una cuenta? <Link to="/PharmacyAtHome/public/signin"><span className='text-primary' role="button">Registrate</span></Link></Form.Label></div>
          </Form>
        </Card.Body>
      </Card>

      <Modal show={showSuccessLogin}>
        <Modal.Header >
          <Modal.Title>Inicio de sesion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Inicio de sesion exitoso</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" as={Link} to='/book-world/public/Panel'>Aceptar</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showWarningLogin} onHide={warningLoginClose}>
        <Modal.Header closeButton>
          <Modal.Title>Advertencia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Error al iniciar sesión, verifique sus datos</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={warningLoginClose}>Cerrar</Button>
        </Modal.Footer>
      </Modal>

    </Row>
  );
}

export default LoginScreen;
