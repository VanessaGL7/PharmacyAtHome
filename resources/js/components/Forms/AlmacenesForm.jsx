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

function AlmacenesForm() {

    const navigate = useNavigate();

    const { token } = useContext(AuthContext);
    const { userLogged, setUserLogged } = useContext(AuthContext);
    const [formValue, setformValue] = useState({
        warehouse_name: '',
        warehouse_description: '',
        warehouse_adress: '',
        id_manager: ''
    })

    const onChange = (e) => {
        e.persist();
        setformValue({ ...formValue, [e.target.name]: e.target.value });
        //console.log(e.target.value)
    }


    const handleSubmit = (e) => {
        if (e && e.preventDefault()) e.preventDefault();
        const formData = new FormData();
        formData.append("warehouse_name", formValue.warehouse_name)
        formData.append("warehouse_description", formValue.warehouse_description)
        formData.append("warehouse_adress", formValue.warehouse_adress)
        formData.append("id_manager", formValue.id_manager)
        axios.post("http://localhost/PharmacyAtHome/public/api/create_warehouse",
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
                navigate("/PharmacyAtHome/public/almacenes");
            }
        }).catch(error => {
            console.log(error);

        });
    };

    const [getManager, setGetManager] = useState([])
    useEffect(() => {
        getAllManagers()
    }, [])

    const getAllManagers = () => {
        axios.get("http://localhost/PharmacyAtHome/public/api/getwarehousemanager").then(response => {
            console.log('response:');
            console.log(response);

            setGetManager(response.data);

        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <Row className='mt-5 justify-content-center'>
            {userLogged && (
                <Card style={{ width: '30rem' }}>
                    <Card.Body>
                        <Card.Title className='fw-bold fs-3'>Registrar Almacén</Card.Title>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" placeholder="Nombre"
                                    name="warehouse_name" value={formValue.warehouse_name} onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicTelephone">
                                <Form.Label>Descripcion</Form.Label>
                                <Form.Control type="text" placeholder="Descripcion del almacen"
                                    name="warehouse_description" value={formValue.warehouse_description} onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Direccion</Form.Label>
                                <Form.Control type="text" placeholder="Direccion del almacen"
                                    name="warehouse_adress" value={formValue.warehouse_adress} onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Encargado</Form.Label>
                                <Form.Select aria-label="Default select example" name="id_manager"
                                    value={formValue.id_manager} onChange={onChange}>
                                    <option selected="true" value="0">Seleccione un Jefe de Almacen</option>
                                    {getManager.map((manager) => (
                                        <option key={manager.id} name="id_manager" value={manager.id}>{manager.manager_name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Button variant="primary" type="submit">Guardar registro
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>)}

            {!userLogged && (
                <Row className='justify-content-center mt-5 text-center'>
                    <h1>NO AUTORIZADO, INICIA SESION PARA ACCEDER A ESTA PAGINA</h1>
                </Row>
            )}
        </Row>
    );
}

export default AlmacenesForm;