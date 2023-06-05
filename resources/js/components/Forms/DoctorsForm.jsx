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

function DoctorsForm() {

  const { token } = useContext(AuthContext);
  const { userLogged, setUserLogged } = useContext(AuthContext);
  //VALIDACION
  const [formOk, setFormOk] = useState(true);
  const [textError, setTextError] = useState('');
  const navigate = useNavigate();

  const [formValue, setformValue] = useState({
    doctor_name: '',
    professional_license: '',
    institution: '',
    doctor_address: '',
    phone: ''
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
    if (formValue.doctor_name.trim() === "" || formValue.professional_license.trim() === "" || formValue.institution.trim() === ""
      || formValue.doctor_address.trim() === "" || formValue.phone.trim() === "") {
      setTextError('Error, fill in all the fields to continue');
      setFormOk(false);
      return;
    }

    if (formOk) {
      if (e && e.preventDefault()) e.preventDefault();
      const formData = new FormData();
      formData.append("doctor_name", formValue.doctor_name)
      formData.append("professional_license", formValue.professional_license)
      formData.append("institution", formValue.institution)
      formData.append("doctor_address", formValue.doctor_address)
      formData.append("phone", formValue.phone)
      axios.post("http://localhost/PharmacyAtHome/public/api/create_doctor",
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
          navigate("/PharmacyAtHome/public/doctors");
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
          <Card.Title className='fw-bold fs-3'>Register new doctor</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Doctor name</Form.Label>
              <Form.Control type="text" placeholder="Name"
                name="doctor_name" value={formValue.doctor_name} onChange={onChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicTelephone">
              <Form.Label>Professional license</Form.Label>
              <Form.Control type="number" placeholder="Professional license"
                name="professional_license" value={formValue.professional_license} onChange={onChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Institution</Form.Label>
              <Form.Control type="text" placeholder="Institution"
                name="institution" value={formValue.institution} onChange={onChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Doctor address</Form.Label>
              <Form.Control type="text" placeholder="Domicilio"
                name="doctor_address" value={formValue.doctor_address} onChange={onChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicTelephone">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="number" placeholder="Doctor phone"
                name="phone" value={formValue.phone} onChange={onChange} />
            </Form.Group>
            <Button variant="primary" type="submit">Save
            </Button>
          </Form>
        </Card.Body>
      </Card>
      )}
      {!userLogged && (
                <Row className='justify-content-center mt-5 text-center'>
                    <h1>NOT AUTHORIZED, LOGIN TO ACCESS THIS PAGE</h1>
                </Row>
            )}
    </Row>
  );
}

export default DoctorsForm;