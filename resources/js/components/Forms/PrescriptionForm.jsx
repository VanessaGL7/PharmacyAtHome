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

function PrescriptionForm() {

    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const { userLogged, setUserLogged } = useContext(AuthContext);
    const [formValue, setformValue] = useState({
        frequency: '',
        duration: '',
        indications: '',
        doctor_id: '',
        medicine_id: ''
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
        if (formValue.frequency.trim() === "" || formValue.duration.trim() === "" || formValue.indications.trim() === ""
            || formValue.doctor_id.trim() === "" || formValue.medicine_id.trim() === "") {
            setTextError('Error, todos los campos son obligatorios');
            setFormOk(false);
            return;
        }

        if (formOk) {
            if (e && e.preventDefault()) e.preventDefault();
            const formData = new FormData();
            formData.append("frequency", formValue.frequency)
            formData.append("duration", formValue.duration)
            formData.append("indications", formValue.indications)
            formData.append("doctor_id", formValue.doctor_id)
            formData.append("medicine_id", formValue.medicine_id)
            axios.post("http://localhost/PharmacyAtHome/public/api/create_prescription",
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
                    navigate("/PharmacyAtHome/public");
                }
            }).catch(error => {
                console.log(error);

            });
        }
    };

    const [getDoctor, setGetDoctor] = useState([])
    useEffect(() => {
        getAllDoctors()
    }, [])

    const getAllDoctors = () => {
        axios.get("http://localhost/PharmacyAtHome/public/api/get_doctors").then(response => {
            console.log('response:');
            console.log(response);

            setGetDoctor(response.data);

        }).catch(error => {
            console.log(error);
        });
    }
    const [getMedicine, setGetMedicine] = useState([])
    useEffect(() => {
        getAllMedicines()
    }, [])

    const getAllMedicines = () => {
        axios.get("http://localhost/PharmacyAtHome/public/api/get_medicines").then(response => {
            console.log('response:');
            console.log(response);

            setGetMedicine(response.data);

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
                    <Card.Title className='fw-bold fs-3'>Register new prescription</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Frequency</Form.Label>
                            <Form.Control type="text" placeholder="Frequency"
                                name="frequency" value={formValue.frequency} onChange={onChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicTelephone">
                            <Form.Label>Duration</Form.Label>
                            <Form.Control type="text" placeholder="Duration"
                                name="duration" value={formValue.duration} onChange={onChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Indications</Form.Label>
                            <Form.Control type="number" placeholder="Indications"
                                name="indications" value={formValue.indications} onChange={onChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Doctor</Form.Label>
                            <Form.Select aria-label="Default select example" name="doctor_id"
                                value={formValue.doctor_id} onChange={onChange}>
                                <option selected="true" value="0">Select a doctor</option>
                                {getDoctor.map((doctor) => (
                                    <option key={doctor.doctor_id} name="doctor_id" value={doctor.doctor_id}>{doctor.doctor_name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Medicine</Form.Label>
                            <Form.Select aria-label="Default select example" name="medicine_id"
                                value={formValue.medicine_id} onChange={onChange}>
                                <option selected="true" value="0">Select a medicine</option>
                                {getMedicine.map((medicine) => (
                                    <option key={medicine.medicine_id} name="medicine_id" value={medicine.medicine_id}>{medicine.medicine_id}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Button variant="primary" type="submit">Save
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            )}
            {!userLogged && (
                <Row className='justify-content-center mt-5 text-center'>
                    <h1>NOT AUTHORIZED, LOGIN TO ACCESS THIS PAGE</h1>
                </Row>
            )}
        </Row>
    );
}

export default PrescriptionForm;