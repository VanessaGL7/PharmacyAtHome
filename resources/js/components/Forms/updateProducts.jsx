import React, { useState, useEffect, useContext} from 'react';
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

function UpdateProducts() {

    const navigate = useNavigate();

    const { token } = useContext(AuthContext);
    const [product_key, setKey] = useState('')
    const [product_description, setDescription] = useState('')
    const [product_price, setPrice] = useState('')
    const [product_stock, setStock] = useState('')
    const [product_location, setLocation] = useState('')
    const [product_image, setImage] = useState('')
    const [id_warehouse, setWarehouse] = useState('')
    const [id_area, setArea] = useState('')
    const { id } = useParams()

    const updateProduct = (e) => {

        const formData = new FormData();
        formData.append("product_key", product_key)
        formData.append("product_description", product_description)
        formData.append("product_price", product_price)
        formData.append("product_stock", product_stock)
        formData.append("product_location", product_location)
        formData.append("product_image", product_image)
        formData.append("id_warehouse", id_warehouse)
        formData.append("id_area", id_area)

        e.preventDefault()
        axios.post(`http://localhost/web-development/public/api/update_product/${id}`,
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
                navigate('/web-development/public/')
            }

        }).catch(error => {
            console.log(error);
        });
        //navigate('/')
    }

    useEffect(() => {
        const getProductById = async () => {
            const response = await axios.get(`http://localhost/web-development/public/api/show_product/${id}`)
            setKey(response.data.product_key)
            setDescription(response.data.product_description)
            setPrice(response.data.product_price)
            setStock(response.data.product_stock)
            setLocation(response.data.product_location)
            setImage(response.data.product_image)
            setWarehouse(response.data.id_warehouse)
            setArea(response.data.id_area)
            console.log(response.data)
        }
        getProductById()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [getWarehouse, setGetWarehouse] = useState([]);
    useEffect ( () => {
        getAllWarehouse()
    },[])
    const getAllWarehouse = () =>{
        axios.get("http://localhost/web-development/public/api/get_warehouses")
        .then(response => {
            console.log('response:');
            console.log(response);
            setGetWarehouse(response.data);
          
    
        }).catch(error => {
        console.log(error);
        });
    }

    const [getArea, setGetArea] = useState([]);
    useEffect ( () => {
        getAllAreas()
    },[])
    const getAllAreas = () =>{
        axios.get("http://localhost/web-development/public/api/get_areas")
        .then(response => {
            console.log('response:');
            console.log(response);
            setGetArea(response.data);
          
    
        }).catch(error => {
        console.log(error);
        });
    }

    return (
        <Row className='mt-5 justify-content-center'>
            <Card style={{ width: '30rem' }}>
                <Card.Body>
                    <Card.Title className='fw-bold fs-3'>Actualizar datos de Almacén</Card.Title>
                    <Form onSubmit={updateProduct}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Clave</Form.Label>
                            <Form.Control type="text" placeholder="Clave del producto"
                                name="product_key" value={product_key} onChange={(e) => setKey(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicTelephone">
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control type="text" placeholder="Descripcion del producto"
                                name="product_description" value={product_description} onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control type="text" placeholder="Precio del producto"
                                name="product_price" value={product_price} onChange={(e) => setPrice(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Existencia</Form.Label>
                            <Form.Control type="text" placeholder="Existencia del producto"
                                name="product_stock" value={product_stock} onChange={(e) => setStock(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Localizacion</Form.Label>
                            <Form.Control type="text" placeholder="Localizacion del producto"
                                name="product_location" value={product_location} onChange={(e) => setLocation(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>URL imagen</Form.Label>
                            <Form.Control type="text" placeholder="URL de imagen del producto"
                                name="product_image" value={product_image} onChange={(e) => setImage(e.target.value)} />
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
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Area</Form.Label>
                            <Form.Select aria-label="Default select example" name="id_area"
                                value={id_area} onChange={(e) => setArea(e.target.value)}>
                                {getArea.map((area) => (
                                    <option value={area.area_id}> {area.area_name} </option>
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

export default UpdateProducts;