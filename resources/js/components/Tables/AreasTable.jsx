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
//MODAL PARA VALIDACION PARA ELIMINAR
import Modal from 'react-bootstrap/Modal';
import { AuthContext } from '../Auth/AuthContext';

function AreasTable() {
  //HOOKS PARA EL MODAL
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
    axios.get("http://localhost/PharmacyAtHome/public/api/get_areas", { config }).then(response => {
      console.log('response:');
      console.log(response);
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
  //METODO PARA ELIMINAR REGISTRO
  const deleteManager = (id) => {
    axios.delete(`http://localhost/PharmacyAtHome/public/api/delete_area/${id}`,{
      headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
      }
  }).then(response => {
      console.log('response:');
      console.log(response);
      setGetValue(response.data);
      //LLAMAMOS AL HANDLE PARA CERRAR EL MODAL
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
      dato.area_name.toLowerCase().includes(search.toLowerCase()))
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
          <Col><h1>Areas</h1></Col>
          {userLogged && (<Col className='justify-content-end d-flex'><Button variant="primary mb-3" as={Link} to="create-area">Nuevo +</Button></Col>)}
        </Row>
        <Form className="d-flex mb-4 mt-2">
          <input value={search} onChange={searcher} type="text" className='form-control me-3' placeholder='Search' />
          <Button variant="outline-primary">Search</Button>
        </Form>
        <Table striped bordered>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Warehouse</th>
              {userLogged && (
                <>
              <th>Edit</th>
              <th>Delete</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {resultadoBusqueda.map((get) => (
              <tr key={get.area_id}>
                <td>{get.area_id}</td>
                <td>{get.area_name}</td>
                <td>{get.area_description}</td>
                <td>{get.id_warehouse}</td>
                {userLogged && (
                <>
                <td><Link to={`update_area/${get.area_id}`} className="btn btn-outline-primary">Update</Link></td>
                <td><button onClick={cambiarID} value={get.area_id} className="btn btn-outline-danger">Delete</button></td>
                </>
              )}


              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Area</Modal.Title>
        </Modal.Header>
        <Modal.Body>Estas seguro de deseas eliminar esta area?: ID-{selectedId}</Modal.Body>
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

export default AreasTable;