import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom"
import {useParams } from "react-router-dom";
import { AuthContext } from '../Auth/AuthContext';

function UpdateJefeAlmacen() {

    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    const [manager_name, setName] = useState('')
    const [manager_phone, setPhone] = useState('')
    const [manager_mail, setMail] = useState('')
    const [manager_address, setAddress] = useState('')
    const { id } = useParams()

    const updateManager = (e) => {

        const formData = new FormData();
        formData.append("manager_name", manager_name)
        formData.append("manager_phone", manager_phone)
        formData.append("manager_mail", manager_mail)
        formData.append("manager_address", manager_address)

        e.preventDefault()
        axios.post(`http://localhost/PharmacyAtHome/public/api/update_manager/${id}`,
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
                navigate('/PharmacyAtHome/public/jefes')
            }

        }).catch(error => {
            console.log(error);
        });
        //navigate('/')
    }

    useEffect(() => {
        const getManagerById = async () => {
            const response = await axios.get(`http://localhost/PharmacyAtHome/public/api/show_manager/${id}`)
            setName(response.data.manager_name)
            setPhone(response.data.manager_phone)
            setMail(response.data.manager_mail)
            setAddress(response.data.manager_address)
            console.log(id)
        }
        getManagerById()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Row className='mt-5 justify-content-center'>
            <Card style={{ width: '30rem' }}>
                <Card.Body>
                    <Card.Title className='fw-bold fs-3'>Actualizar Datos de Jefe de Almacén</Card.Title>
                    <Form onSubmit={updateManager}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" placeholder="Nombre"
                                name="manager_name" value={manager_name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicTelephone">
                            <Form.Label>Telefono</Form.Label>
                            <Form.Control type="number" placeholder="Numero de telefono"
                                name="manager_phone" value={manager_phone} onChange={(e) => setPhone(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Correo Electronico vigente"
                                name="manager_mail" value={manager_mail} onChange={(e) => setMail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Domicilio</Form.Label>
                            <Form.Control type="text" placeholder="Domicilio"
                                name="manager_address" value={manager_address} onChange={(e) => setAddress(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit">Actualizar registro</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Row>
    );
}

export default UpdateJefeAlmacen;