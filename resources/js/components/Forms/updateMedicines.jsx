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
import { useParams } from "react-router-dom";
import { AuthContext } from '../Auth/AuthContext';

function UpdateMedicines() {

    const navigate = useNavigate();

    const [tradename, setName] = useState('')
    const { token } = useContext(AuthContext);
    const [active_ingredient, setIngredient] = useState('')
    const [presentation, setPresentation] = useState('')
    const [dose, setDose] = useState('')
    const [original_amount, setOriginal] = useState('')
    const [current_amount, setCurrent] = useState('')
    const [route_of_administration, setRoute] = useState('')
    const [expiration, setExpiration] = useState('')
    const [type_id, setType] = useState('')
    const { id } = useParams()

    const updateMedicine = (e) => {

        const formData = new FormData();
        formData.append("tradename", tradename)
        formData.append("active_ingredient", active_ingredient)
        formData.append("presentation", presentation)
        formData.append("dose", dose)
        formData.append("original_amount", original_amount)
        formData.append("current_amount", current_amount)
        formData.append("route_of_administration", route_of_administration)
        formData.append("expiration", expiration)
        formData.append("type_id", type_id)

        e.preventDefault()
        axios.post(`http://localhost/PharmacyAtHome/public/api/update_medicine/${id}`,
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
                navigate('/PharmacyAtHome/public/medicines')
            }

        }).catch(error => {
            console.log(error);
        });
        //navigate('/')
    }
    const [getType, setGetType] = useState([]);
    useEffect ( () => {
        getAllType()
    },[])
    const getAllType = () =>{
        axios.get("http://localhost/PharmacyAtHome/public/api/get_medicinetype")
        .then(response => {
            console.log('response:');
            console.log(response);
            setGetType(response.data);
          
    
        }).catch(error => {
        console.log(error);
        });
    }
    useEffect(() => {
        const getMedicineById = async () => {
            const response = await axios.get(`http://localhost/PharmacyAtHome/public/api/show_medicines/${id}`)
            setName(response.data.tradename)
            setIngredient(response.data.active_ingredient)
            setPresentation(response.data.presentation)
            setDose(response.data.dose)
            setOriginal(response.data.original_amount)
            setCurrent(response.data.current_amount)
            setRoute(response.data.route_of_administration)
            setExpiration(response.data.expiration)
            setType(response.data.type_id)
        }
        getMedicineById()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Row className='mt-5 justify-content-center'>
            <Card style={{ width: '30rem' }}>
                <Card.Body>
                    <Card.Title className='fw-bold fs-3'>Actualizar datos de Area</Card.Title>
                    <Form onSubmit={updateMedicine}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Medicine name</Form.Label>
                            <Form.Control type="text" placeholder="Tradename"
                                name="tradename" value={tradename} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Active ingredient</Form.Label>
                            <Form.Control type="text" placeholder="Active ingredient"
                                name="active_ingredient" value={active_ingredient} onChange={(e) => setIngredient(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Presentation</Form.Label>
                            <Form.Control type="text" placeholder="Presentation"
                                name="presentation" value={presentation} onChange={(e) => setPresentation(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Dose</Form.Label>
                            <Form.Control type="text" placeholder="Dose"
                                name="dose" value={dose} onChange={(e) => setDose(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicTelephone">
                            <Form.Label>Original amount</Form.Label>
                            <Form.Control type="number" placeholder="number"
                                name="original_amount" value={original_amount} onChange={(e) => setOriginal(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicTelephone">
                            <Form.Label>Current amount</Form.Label>
                            <Form.Control type="number" placeholder="Current amount"
                                name="current_amount" value={current_amount} onChange={(e) => setCurrent(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Route of administration</Form.Label>
                            <Form.Control type="text" placeholder="Route of administration"
                                name="route_of_administration" value={route_of_administration} onChange={(e) => setRoute(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Expiration</Form.Label>
                            <Form.Control type="datetime-local" placeholder="Expiration"
                                name="expiration" value={expiration} onChange={(e) => setExpiration(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Medicine type</Form.Label>
                            <Form.Select aria-label="Default select example" name="type_id"
                                value={type_id} onChange={(e) => setType(e.target.value)}>
                                {getType.map((medicinetype) => (
                                    <option value={medicinetype.type_id}> {medicinetype.type_name} </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Button variant="primary" type="submit">Update
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Row>
    );
}

export default UpdateMedicines;