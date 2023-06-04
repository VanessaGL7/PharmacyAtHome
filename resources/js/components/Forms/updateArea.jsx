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

function UpdateArea() {

    const navigate = useNavigate();

    const [area_name, setName] = useState('')
    const { token } = useContext(AuthContext);
    const [area_description, setDescription] = useState('')
    const [id_warehouse, setWarehouse] = useState('')
    const { id } = useParams()

    const updateWarehouse = (e) => {

        const formData = new FormData();
        formData.append("area_name", area_name)
        formData.append("area_description", area_description)
        formData.append("id_warehouse", id_warehouse)

        e.preventDefault()
        axios.post(`http://localhost/PharmacyAtHome/public/api/update_warehouse/${id}`,
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
                navigate('/PharmacyAtHome/public/areas')
            }

        }).catch(error => {
            console.log(error);
        });
        //navigate('/')
    }
    const [getWarehouse, setGetWarehouse] = useState([]);
    useEffect ( () => {
        getAllWarehouse()
    },[])
    const getAllWarehouse = () =>{
        axios.get("http://localhost/PharmacyAtHome/public/api/get_warehouses")
        .then(response => {
            console.log('response:');
            console.log(response);
            setGetWarehouse(response.data);
          
    
        }).catch(error => {
        console.log(error);
        });
    }
    useEffect(() => {
        const getAreaById = async () => {
            const response = await axios.get(`http://localhost/PharmacyAtHome/public/api/show_area/${id}`)
            console.log("Hasta aqui si jala"+response.data)
            setName(response.data.area_name)
            setDescription(response.data.area_description)
            setWarehouse(response.data.id_warehouse)
        }
        getAreaById()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Row className='mt-5 justify-content-center'>
            <Card style={{ width: '30rem' }}>
                <Card.Body>
                    <Card.Title className='fw-bold fs-3'>Actualizar datos de Area</Card.Title>
                    <Form onSubmit={updateWarehouse}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" placeholder="Nombre del Area"
                                name="area_name" value={area_name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicTelephone">
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control type="text" placeholder="Descripcion del Area"
                                name="area_description" value={area_description} onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Almacen</Form.Label>
                            <Form.Select aria-label="Default select example" name="id_warehouse"
                                value={id_warehouse} onChange={(e) => setWarehouse(e.target.value)}>
                                {getWarehouse.map((warehouse) => (
                                    <option value={warehouse.warehouse_id}> {warehouse.warehouse_name} </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Button variant="primary" type="submit">Actualizar registro
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Row>
    );
}

export default UpdateArea;