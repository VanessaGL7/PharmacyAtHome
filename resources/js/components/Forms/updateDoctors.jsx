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

function UpdateDoctors() {

    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    const [doctor_name, setName] = useState('')
    const [professional_license, setLicense] = useState('')
    const [institution, setInstitution] = useState('')
    const [doctor_address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const { id } = useParams()

    const updateDoctor = (e) => {

        const formData = new FormData();
        formData.append("doctor_name", doctor_name)
        formData.append("professional_license", professional_license)
        formData.append("institution", institution)
        formData.append("doctor_address", doctor_address)
        formData.append("phone", phone)

        e.preventDefault()
        axios.post(`http://localhost/PharmacyAtHome/public/api/update_doctor/${id}`,
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
                navigate('/PharmacyAtHome/public/doctors')
            }

        }).catch(error => {
            console.log(error);
        });
        //navigate('/')
    }

    useEffect(() => {
        const getDoctorById = async () => {
            const response = await axios.get(`http://localhost/PharmacyAtHome/public/api/show_doctor/${id}`)
            setName(response.data.doctor_name)
            setLicense(response.data.professional_license)
            setInstitution(response.data.institution)
            setAddress(response.data.doctor_address)
            setPhone(response.data.phone)
            console.log(id)
        }
        getDoctorById()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Row className='mt-5 justify-content-center'>
            <Card style={{ width: '30rem' }}>
                <Card.Body>
                    <Card.Title className='fw-bold fs-3'>Update doctor data</Card.Title>
                    <Form onSubmit={updateDoctor}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Doctor name</Form.Label>
                            <Form.Control type="text" placeholder="Name"
                                name="doctor_name" value={doctor_name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicTelephone">
                            <Form.Label>Professional_license</Form.Label>
                            <Form.Control type="number" placeholder="professional license"
                                name="professional_license" value={professional_license} onChange={(e) => setLicense(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Institution</Form.Label>
                            <Form.Control type="text" placeholder="Name of institution"
                                name="institution" value={institution} onChange={(e) => setInstitution(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Doctor address</Form.Label>
                            <Form.Control type="text" placeholder="Address"
                                name="doctor_address" value={doctor_address} onChange={(e) => setAddress(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicTelephone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="number" placeholder="Phone"
                                name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit">Update</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Row>
    );
}

export default UpdateDoctors;