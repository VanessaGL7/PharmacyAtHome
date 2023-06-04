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

function AreasForm() {

    const navigate = useNavigate();

    const { token } = useContext(AuthContext);
    const { userLogged, setUserLogged } = useContext(AuthContext);
    const [formValue, setformValue] = useState({
        area_name: '',
        area_description: '',
        id_warehouse: ''
    })

    const onChange = (e) => {
        e.persist();
        setformValue({ ...formValue, [e.target.name]: e.target.value });
        //console.log(e.target.value)
    }


    const handleSubmit = (e) => {
        if (e && e.preventDefault()) e.preventDefault();
        const formData = new FormData();
        formData.append("area_name", formValue.area_name)
        formData.append("area_description", formValue.area_description)
        formData.append("id_warehouse", formValue.id_warehouse)
        axios.post("http://localhost/PharmacyAtHome/public/api/create_area",
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
                navigate("/PharmacyAtHome/public/areas");
            }
        }).catch(error => {
            console.log(error);

        });
    };

    const [getWarehouse, setGetWarehouse] = useState([])
    useEffect(() => {
        getAllWarehouses()
    }, [])

    const getAllWarehouses = () => {
        axios.get("http://localhost/PharmacyAtHome/public/api/get_warehouses").then(response => {
            console.log('response:');
            console.log(response);

            setGetWarehouse(response.data);

        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <Row className='mt-5 justify-content-center'>
            {userLogged && (
                <Card style={{ width: '30rem' }}>
                    <Card.Body>
                        <Card.Title className='fw-bold fs-3'>Registrar Area</Card.Title>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" placeholder="Nombre"
                                    name="area_name" value={formValue.area_name} onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicTelephone">
                                <Form.Label>Descripcion</Form.Label>
                                <Form.Control type="text" placeholder="Descripcion del area"
                                    name="area_description" value={formValue.area_description} onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Almacen</Form.Label>
                                <Form.Select aria-label="Default select example" name="id_warehouse"
                                    value={formValue.id_warehouse} onChange={onChange}>
                                    <option selected="true" value="0">Seleccione un Almacen</option>
                                    {getWarehouse.map((Warehouse) => (
                                        <option key={Warehouse.warehouse_id} name="id_warehouse" value={Warehouse.warehouse_id}>{Warehouse.warehouse_name}</option>
                                    ))}
                                </Form.Select>
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

export default AreasForm;