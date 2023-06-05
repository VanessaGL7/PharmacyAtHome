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

function UpdateMedicineType() {

    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    const [type_name, setName] = useState('')
    const { id } = useParams()

    const updateType = (e) => {

        const formData = new FormData();
        formData.append("type_name", type_name)

        e.preventDefault()
        axios.post(`http://localhost/PharmacyAtHome/public/api/update_type/${id}`,
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
                navigate('/PharmacyAtHome/public/medicinetype')
            }

        }).catch(error => {
            console.log(error);
        });
        //navigate('/')
    }

    useEffect(() => {
        const getTypeById = async () => {
            const response = await axios.get(`http://localhost/PharmacyAtHome/public/api/show_type/${id}`)
            setName(response.data.type_name)
            console.log(id)
        }
        getTypeById()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Row className='mt-5 justify-content-center'>
            <Card style={{ width: '30rem' }}>
                <Card.Body>
                    <Card.Title className='fw-bold fs-3'>Update medicine type data</Card.Title>
                    <Form onSubmit={updateType}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" placeholder="Nombre"
                                name="type_name" value={type_name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit">Update</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Row>
    );
}

export default UpdateMedicineType;