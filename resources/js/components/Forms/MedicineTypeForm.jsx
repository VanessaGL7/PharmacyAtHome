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

function MedicineTypeForm() {

  const { token } = useContext(AuthContext);
  const { userLogged, setUserLogged } = useContext(AuthContext);
  //VALIDACION
  const [formOk, setFormOk] = useState(true);
  const [textError, setTextError] = useState('');
  const navigate = useNavigate();

  const [formValue, setformValue] = useState({
    type_name: ''
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
    if (formValue.type_name.trim() === "") {
      setTextError('Error, fill in all the fields to continue');
      setFormOk(false);
      return;
    }

    if (formOk) {
      if (e && e.preventDefault()) e.preventDefault();
      const formData = new FormData();
      formData.append("type_name", formValue.type_name)
      axios.post("http://localhost/PharmacyAtHome/public/api/create_medicinetype",
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
          navigate("/PharmacyAtHome/public/medicinetype");
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
          <Card.Title className='fw-bold fs-3'>Register type of medicine</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Medicine type name</Form.Label>
              <Form.Control type="text" placeholder="Name"
                name="type_name" value={formValue.type_name} onChange={onChange} />
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

export default MedicineTypeForm;