import React,{useState, useContext}from 'react';
import ReactDOM from 'react-dom/client';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';
import { AuthContext } from './AuthContext';


function SignInScreen() {
  // Fucnion de react router dom
  const navigate = useNavigate();
  
  const { setToken, setUserLogged } = useContext(AuthContext);

  // States del formulario
  const [formData, setformData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const {name, email, password, passwordConfirm} = formData;

  const onChangeFormData = (e) => {
    setformData({
        ...formData,
        [e.target.name]: e.target.value
    });
  };

  // State de los errores del formulario
  const [textError, setTextError] = useState('');
  const [formOk, setFormOk] = useState(true);

  const register = (e) => {
    e.preventDefault();
    
    // Validación del formulario
    setFormOk(true);

    if (name.trim() === "" || email.trim() === "" || password.trim() === "" 
       || passwordConfirm.trim() === "") {
        setTextError('Error, todos los campos son obligatorios');
        setFormOk(false);
        return;
    }

    if(password.trim().length < 8) {
        setTextError('La contraseña debe tener minimo 8 carácteres');
        setFormOk(false);
        return;
    }

    if(password.trim() !== passwordConfirm.trim()) {
      setTextError('La contraseñas deben coincidir');
      setFormOk(false);
      return;
    }


    if(formOk) {
      const headers = {
        'Content-Type': 'application/json', 
        'Accept': 'application/json'
      }

      let data = {name, email, password}

      axios.post("http://localhost/PharmacyAtHome/public/api/register", 
        data,
        {headers})
        .then(response => {
          localStorage.setItem('token', response.data.token);
          console.log(response.data);
          navigate("/PharmacyAtHome/public");
          setUserLogged(true)
          setToken(response.data.token);

      }).catch(error => {
          setTextError('El correo ya existe');
          setFormOk(false);
      });
    }
    
  }

  return (
    <Row className='mt-5 justify-content-center'>
      {!formOk && (<Alert key='danger' variant='danger'>{textError}</Alert>)}
    <Card style={{ width: '30rem' }}>
      <Card.Body>
        <Card.Title className='fw-bold fs-3'>Resgistrar</Card.Title>
        <Form onSubmit={register}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={onChangeFormData}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" placeholder="Enter Full Name" name="name" value={name} onChange={onChangeFormData}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"name="password" value={password} onChange={onChangeFormData} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" name="passwordConfirm" value={passwordConfirm} onChange={onChangeFormData}/>
      </Form.Group>
      <Button variant="primary" type="submit">Registrar</Button>
        <div className="text-center">
            <Form.Label className="mt-2">¿Ya tienes una cuenta? <Link to="/PharmacyAtHome/public/"><span className='text-primary' role="button">Inicia sesión</span></Link></Form.Label>
          </div>
    </Form>
      </Card.Body>
    </Card>
  </Row>
  );
}

export default SignInScreen;