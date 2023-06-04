import React, { useState, useEffect,useContext } from 'react';
import ReactDOM from 'react-dom/client';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
//VALIDACION
import Alert from 'react-bootstrap/Alert';
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from '../Auth/AuthContext';

function JefesForm() {

  const { token } = useContext(AuthContext);
  const { userLogged, setUserLogged } = useContext(AuthContext);
  //VALIDACION
  const [formOk, setFormOk] = useState(true);
  const [textError, setTextError] = useState('');
  const navigate = useNavigate();

  const [formValue, setformValue] = useState({
    manager_name: '',
    manager_phone: '',
    manager_mail: '',
    manager_address: ''
  })

  const onChange = (e) => {
    e.persist();
    setformValue({ ...formValue, [e.target.name]: e.target.value });
    console.log(e.target.value)
  }


  const handleSubmit = (e) => {

    //VALIDACION
    e.preventDefault();
    setFormOk(true);
    if (formValue.manager_name.trim() === "" || formValue.manager_phone.trim() === "" || formValue.manager_mail.trim() === ""
      || formValue.manager_address.trim() === "") {
      setTextError('Error, todos los campos son obligatorios');
      setFormOk(false);
      return;
    }

    if (formOk) {
      if (e && e.preventDefault()) e.preventDefault();
      const formData = new FormData();
      formData.append("manager_name", formValue.manager_name)
      formData.append("manager_phone", formValue.manager_phone)
      formData.append("manager_mail", formValue.manager_mail)
      formData.append("manager_address", formValue.manager_address)
      axios.post("http://localhost/PharmacyAtHome/public/api/create_manager",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      ).then(response => {
        console.log('response:');
        console.log(response);
        console.log(response.status)
        if (response.status == 200) {
          navigate("/PharmacyAtHome/public/jefes");
        }
      }).catch(error => {
        console.log(error);
  
      });
    }

    
  };
  return (
    <Row className='mt-5 justify-content-center'>
      {!formOk && (<Alert key='danger' variant='danger'>{textError}</Alert>)}
      {userLogged && (
      <Card style={{ width: '30rem' }}>
        <Card.Body>
          <Card.Title className='fw-bold fs-3'>Registrar Jefe de Almacén</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="Nombre"
                name="manager_name" value={formValue.manager_name} onChange={onChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicTelephone">
              <Form.Label>Telefono</Form.Label>
              <Form.Control type="number" placeholder="Numero de telefono"
                name="manager_phone" value={formValue.manager_phone} onChange={onChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Correo Electronico vigente"
                name="manager_mail" value={formValue.manager_mail} onChange={onChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Domicilio</Form.Label>
              <Form.Control type="text" placeholder="Domicilio"
                name="manager_address" value={formValue.manager_address} onChange={onChange} />
            </Form.Group>
            <Button variant="primary" type="submit">Guardar registro
            </Button>
          </Form>
        </Card.Body>
      </Card>
      )}
      {!userLogged && (
                <Row className='justify-content-center mt-5 text-center'>
                    <h1>NO AUTORIZADO, INICIA SESION PARA ACCEDER A ESTA PAGINA</h1>
                </Row>
            )}
    </Row>
  );
}

export default JefesForm;