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
import { AuthContext } from '../Auth/AuthContext';

function MedicinesForm() {

    const navigate = useNavigate();

    const { token } = useContext(AuthContext);
    const { userLogged, setUserLogged } = useContext(AuthContext);
    const [formValue, setformValue] = useState({
        tradename: '',
        active_ingredient: '',
        presentation: '',
        dose: '',
        original_amount: '',
        current_amount: '',
        route_of_administration: '',
        expiration: '',
        type_id: ''
    })

    const onChange = (e) => {
        e.persist();
        setformValue({ ...formValue, [e.target.name]: e.target.value });
        //console.log(e.target.value)
    }


    const handleSubmit = (e) => {
        if (e && e.preventDefault()) e.preventDefault();
        const formData = new FormData();
        formData.append("tradename", formValue.tradename)
        formData.append("active_ingredient", formValue.active_ingredient)
        formData.append("presentation", formValue.presentation)
        formData.append("dose", formValue.dose)
        formData.append("original_amount", formValue.original_amount)
        formData.append("current_amount", formValue.current_amount)
        formData.append("route_of_administration", formValue.route_of_administration)
        formData.append("expiration", formValue.expiration)
        formData.append("type_id", formValue.type_id)
        axios.post("http://localhost/PharmacyAtHome/public/api/create_medicine",
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
                navigate("/PharmacyAtHome/public/medicines");
            }
        }).catch(error => {
            console.log(error);

        });
    };

    const [getType, setGetType] = useState([])
    useEffect(() => {
        getAllTypes()
    }, [])

    const getAllTypes = () => {
        axios.get("http://localhost/PharmacyAtHome/public/api/get_medicinetypes").then(response => {
            console.log('response:');
            console.log(response);

            setGetType(response.data);

        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <Row className='mt-5 justify-content-center'>
            {userLogged && (
                <Card style={{ width: '30rem' }}>
                    <Card.Body>
                        <Card.Title className='fw-bold fs-3'>Register new medicine</Card.Title>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Medicine name</Form.Label>
                                <Form.Control type="text" placeholder="Tradename"
                                    name="tradename" value={formValue.tradename} onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicTelephone">
                                <Form.Label>Active ingredient</Form.Label>
                                <Form.Control type="text" placeholder="Active ingredient"
                                    name="active_ingredient" value={formValue.active_ingredient} onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Presentation</Form.Label>
                                <Form.Control type="text" placeholder="Presentation"
                                    name="presentation" value={formValue.presentation} onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Dose</Form.Label>
                                <Form.Control type="text" placeholder="Dose"
                                    name="dose" value={formValue.dose} onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicTelephone">
                                <Form.Label>Original amount</Form.Label>
                                <Form.Control type="text" placeholder="Original amount"
                                    name="original_amount" value={formValue.original_amount} onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Current amount</Form.Label>
                                <Form.Control type="text" placeholder="Current amount"
                                    name="current_amount" value={formValue.current_amount} onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Route of administration</Form.Label>
                                <Form.Control type="text" placeholder="Route of administration"
                                    name="route_of_administration" value={formValue.route_of_administration} onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Expiration</Form.Label>
                                <Form.Control type="text" placeholder="Expiration"
                                    name="expiration" value={formValue.expiration} onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Medicine type</Form.Label>
                                <Form.Select aria-label="Default select example" name="type_id"
                                    value={formValue.type_id} onChange={onChange}>
                                    <option selected="true" value="0">Select a medicine type</option>
                                    {getType.map((medicinetype) => (
                                        <option key={medicinetype.type_id} name="type_id" value={medicinetype.type_id}>{medicinetype.type_name}</option>
                                    ))}
                                </Form.Select>
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

export default MedicinesForm;