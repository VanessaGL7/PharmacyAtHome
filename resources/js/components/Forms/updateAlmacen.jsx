import React, { useState, useEffect ,useContext} from 'react';
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
import AuthContext from '../Auth/AuthContext';

function UpdateAlmacen() {

    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const [warehouse_name, setName] = useState('')
    const [warehouse_description, setDescription] = useState('')
    const [warehouse_adress, setAdress] = useState('')
    const [id_manager, setManager] = useState('')
    const { id } = useParams()

    const updateWarehouse = (e) => {

        const formData = new FormData();
        formData.append("warehouse_name", warehouse_name)
        formData.append("warehouse_description", warehouse_description)
        formData.append("warehouse_adress", warehouse_adress)
        formData.append("id_manager", id_manager)

        e.preventDefault()
        axios.post(`http://localhost/web-development/public/api/update_warehouse/${id}`,
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
                navigate('/web-development/public/almacenes')
            }

        }).catch(error => {
            console.log(error);
        });
        //navigate('/')
    }

    useEffect(() => {
        const getWarehouseById = async () => {
            const response = await axios.get(`http://localhost/web-development/public/api/show_warehouse/${id}`)
            setName(response.data.warehouse_name)
            setDescription(response.data.warehouse_description)
            setAdress(response.data.warehouse_adress)
            setManager(response.data.id_manager)
            console.log(response.data)
        }
        getWarehouseById()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [getManager, setGetManager] = useState([]);
    useEffect ( () => {
        getAllManagers()
    },[])
    const getAllManagers = () =>{
        axios.get("http://localhost/web-development/public/api/getwarehousemanager")
        .then(response => {
            console.log('response:');
            console.log(response);
            setGetManager(response.data);
          
    
        }).catch(error => {
        console.log(error);
        });
    }

    return (
        <Row className='mt-5 justify-content-center'>
            <Card style={{ width: '30rem' }}>
                <Card.Body>
                    <Card.Title className='fw-bold fs-3'>Actualizar datos de Almacén</Card.Title>
                    <Form onSubmit={updateWarehouse}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" placeholder="Nombre"
                                name="warehouse_name" value={warehouse_name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicTelephone">
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control type="text" placeholder="Descripcion del almacen"
                                name="warehouse_description" value={warehouse_description} onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Direccion</Form.Label>
                            <Form.Control type="text" placeholder="Direccion del almacen"
                                name="warehouse_adress" value={warehouse_adress} onChange={(e) => setAdress(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Encargado</Form.Label>
                            <Form.Select aria-label="Default select example" name="id_manager"
                                value={id_manager} onChange={(e) => setManager(e.target.value)}>
                                {getManager.map((manager) => (
                                    <option value={manager.id}> {manager.manager_name} </option>
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

export default UpdateAlmacen;