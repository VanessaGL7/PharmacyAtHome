import React, { useState, useEffect, useContext } from 'react';
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

function AlmacenesTable() {

  //CONFIRMAR ELIMINACION
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
    axios.get("http://localhost/PharmacyAtHome/public/api/get_warehouses", { config }).then(response => {
      console.log('response:');
      console.log(response);
      setGetValue(response.data);

    }).catch(error => {
      console.log(error);
    });
  }
  const deleteManager = (id) => {
    axios.delete(`http://localhost/PharmacyAtHome/public/api/delete_warehouse/${id}`,{
      headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
      }
  }).then(response => {
      console.log('response:');
      console.log(response);
      setGetValue(response.data);
      handleClose()

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
  //FILTRADO
  let resultadoBusqueda = [];
  if (!search) {
    resultadoBusqueda = getValue;
  } else {
    resultadoBusqueda = getValue.filter((dato) =>
      dato.warehouse_name.toLowerCase().includes(search.toLowerCase()))
  }

  return (
    <>
      <Container className='mt-5'>
        <Row>
          <Col><h1>Almacenes</h1></Col>
          {userLogged && (<Col className='justify-content-end d-flex'><Button variant="primary mb-3" as={Link} to="create-warehouse">Nuevo +</Button></Col>)}
        </Row>
        <Form className="d-flex mb-4 mt-2">
          <input value={search} onChange={searcher} type="text" className='form-control me-3' placeholder='Search' />
          <Button variant="outline-primary">Search</Button>
        </Form>
        <Table striped bordered>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Dirección</th>
              <th>Encargado</th>{userLogged && (
                <>
              <th>Edit</th>
              <th>Delete</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {resultadoBusqueda.map((get) => (
              <tr key={get.warehouse_id}>
                <td>{get.warehouse_id}</td>
                <td>{get.warehouse_name}</td>
                <td>{get.warehouse_description}</td>
                <td>{get.warehouse_adress}</td>
                <td>{get.id_manager}</td>
                {userLogged && (
                <>
                <td><Link to={`update_warehouse/${get.warehouse_id}`} className="btn btn-outline-primary">Update</Link></td>
                <td><button onClick={cambiarID} value={get.warehouse_id} className="btn btn-outline-danger">Delete</button></td>
                </>
              )}

              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Almacén</Modal.Title>
        </Modal.Header>
        <Modal.Body>Estas seguro de que deseas eliminar?: ID-{selectedId}</Modal.Body>
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

export default AlmacenesTable;/*() => deleteManager(get.warehouse_id)*/