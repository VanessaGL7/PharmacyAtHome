import React, { useState, useEffect, useHistory, useContext } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { get } from 'lodash';
import Modal from 'react-bootstrap/Modal';
import { AuthContext } from '../Auth/AuthContext';

function ProductTable() {

  const [show, setShow] = useState(false);
  const { token } = useContext(AuthContext);
  const { userLogged, setUserLogged } = useContext(AuthContext);
  const [selectedId, setSelectedID] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [getValue, setGetValue] = useState([]);
  //HOOKS PARA BUSQUEDA
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllManagers()
  }, [])

  let config = {
    headers: { 'Access-Control-Allow-Origin': '*' },
    crossdomain: true
  };
  const getAllManagers = () => {
    axios.get("http://localhost/web-development/public/api/get_products", { config }).then(response => {
      //console.log(response);
      setGetValue(response.data);

    }).catch(error => {
      console.log(error);
    });
  }
  //METODO DE BUSQUEDA
  const searcher = (e) => {
    setSearch(e.target.value)
    //console.log(e.target)
  }
  const cambiarID = (e) => {
    console.log(e.target.value);
    setSelectedID(e.target.value);
    handleShow();
  }
  const deleteManager = (id) => {
    axios.delete(`http://localhost/web-development/public/api/delete_product/${id}`,{
      headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
      }
  }).then(response => {
      console.log('response:');
      console.log(response);
      setGetValue(response.data);
      handleClose();
    }).catch(error => {
      console.log(error);
    });
  }
  //FILTRADO
  let resultadoBusqueda = [];
  if (!search) {
    resultadoBusqueda = getValue;
  } else {
    resultadoBusqueda = getValue.filter((dato) =>
      dato.product_description.toLowerCase().includes(search.toLowerCase()))
  }
  /*<Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />*/

  return (
    <>
      <Container className='mt-5'>
        <Row>
          <Col><h1>Productos</h1></Col>
          {userLogged && (<Col className='justify-content-end d-flex'><Button variant="primary mb-3" as={Link} to="create-product">Nuevo +</Button></Col>)}
        </Row>
        <Form className="d-flex mb-4 mt-2">
          <input value={search} onChange={searcher} type="text" className='form-control me-3' placeholder='Search' />
          <Button variant="outline-primary">Search</Button>
        </Form>
        <Table striped bordered>
          <thead>
            <tr>
              <th>ID</th>
              <th>Key</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Location</th>
              <th>Warehouse</th>
              <th>Area</th>
              <th>Imagen</th>
              {userLogged && (
                <>
                  <th>Update</th>
                  <th>Delete</th></>
              )}
            </tr>
          </thead>
          <tbody>
            {resultadoBusqueda.map((get) => (
              <tr key={get.product_id}>
                <td>{get.product_id}</td>
                <td>{get.product_key}</td>
                <td>{get.product_description}</td>
                <td>{get.product_price}</td>
                <td>{get.product_stock}</td>
                <td>{get.product_location}</td>
                <td>{get.id_warehouse}</td>
                <td>{get.id_area}</td>
                <td><img src={get.product_image} width='60px'></img></td>
                {userLogged && (
                  <>
                    <td><Link to={`update_product/${get.product_id}`} className="btn btn-outline-primary">Update</Link></td>
                    <td><button onClick={cambiarID} value={get.product_id} className="btn btn-outline-danger">Delete</button></td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>Estás seguro que deseas eliminar este producto?: ID-{selectedId}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={() => deleteManager(selectedId)}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>

  );
}

export default ProductTable;