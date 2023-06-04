import React, { useState, useEffect ,useContext} from 'react';
import ReactDOM from 'react-dom/client';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
//VALIDACION
import Alert from 'react-bootstrap/Alert';
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from '../Auth/AuthContext';
function AlmacenesForm() {

    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const { userLogged, setUserLogged } = useContext(AuthContext);
    const [formValue, setformValue] = useState({
        product_key: '',
        product_description: '',
        product_price: '',
        product_stock: '',
        product_location: '',
        product_image: '',
        id_area: '',
        id_warehouse: ''
    })

    const onChange = (e) => {
        e.persist();
        setformValue({ ...formValue, [e.target.name]: e.target.value });
        //console.log(e.target.value)
    }
    //VALIDACION
    const [formOk, setFormOk] = useState(true);
    const [textError, setTextError] = useState('');




    const handleSubmit = (e) => {
        //VALIDACION
        e.preventDefault();
        setFormOk(true);
        if (formValue.product_key.trim() === "" || formValue.product_description.trim() === "" || formValue.product_price.trim() === ""
            || formValue.product_stock.trim() === "" || formValue.product_location.trim() === "" || formValue.id_area.trim() === ""|| formValue.product_image.trim() === "" || formValue.id_warehouse.trim() === "") {
            setTextError('Error, todos los campos son obligatorios');
            setFormOk(false);
            return;
        }

        if (formOk) {
            if (e && e.preventDefault()) e.preventDefault();
            const formData = new FormData();
            formData.append("product_key", formValue.product_key)
            formData.append("product_description", formValue.product_description)
            formData.append("product_price", formValue.product_price)
            formData.append("product_stock", formValue.product_stock)
            formData.append("product_location", formValue.product_location)
            formData.append("product_image", formValue.product_image)
            formData.append("id_area", formValue.id_area)
            formData.append("id_warehouse", formValue.id_warehouse)
            axios.post("http://localhost/web-development/public/api/create_product",
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
                    navigate("/web-development/public");
                }
            }).catch(error => {
                console.log(error);

            });
        }
    };

    const [getWarehouse, setGetWarehouse] = useState([])
    useEffect(() => {
        getAllWarehouses()
    }, [])

    const getAllWarehouses = () => {
        axios.get("http://localhost/web-development/public/api/get_warehouses").then(response => {
            console.log('response:');
            console.log(response);

            setGetWarehouse(response.data);

        }).catch(error => {
            console.log(error);
        });
    }
    const [getArea, setGetArea] = useState([])
    useEffect(() => {
        getAllAreas()
    }, [])

    const getAllAreas = () => {
        axios.get("http://localhost/web-development/public/api/get_areas").then(response => {
            console.log('response:');
            console.log(response);

            setGetArea(response.data);

        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <Row className='mt-5 justify-content-center'>
            {!formOk && (<Alert key='danger' variant='danger'>{textError}</Alert>)}
            {userLogged && (
            <Card style={{ width: '30rem' }}>
                <Card.Body>
                    <Card.Title className='fw-bold fs-3'>Registrar Producto</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Clave</Form.Label>
                            <Form.Control type="text" placeholder="Clave"
                                name="product_key" value={formValue.product_key} onChange={onChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicTelephone">
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control type="text" placeholder="Descripcion del producto"
                                name="product_description" value={formValue.product_description} onChange={onChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control type="number" placeholder="Precio del producto"
                                name="product_price" value={formValue.product_price} onChange={onChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Existencia</Form.Label>
                            <Form.Control type="number" placeholder="Existencia en almacen"
                                name="product_stock" value={formValue.product_stock} onChange={onChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Localizacion</Form.Label>
                            <Form.Control type="text" placeholder="Localizacion en almacen"
                                name="product_location" value={formValue.product_location} onChange={onChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>URL Imagen</Form.Label>
                            <Form.Control type="text" placeholder="URL de imagen del producto"
                                name="product_image" value={formValue.product_image} onChange={onChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Almacen</Form.Label>
                            <Form.Select aria-label="Default select example" name="id_warehouse"
                                value={formValue.id_warehouse} onChange={onChange}>
                                <option selected="true" value="0">Seleccione un Almacen</option>
                                {getWarehouse.map((warehouse) => (
                                    <option key={warehouse.warehouse_id} name="id_warehouse" value={warehouse.warehouse_id}>{warehouse.warehouse_name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Area</Form.Label>
                            <Form.Select aria-label="Default select example" name="id_area"
                                value={formValue.id_area} onChange={onChange}>
                                <option selected="true" value="0">Seleccione un Area</option>
                                {getArea.map((area) => (
                                    <option key={area.area_id} name="id_area" value={area.area_id}>{area.area_name}</option>
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

export default AlmacenesForm;