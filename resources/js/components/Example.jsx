import React, { useState }from 'react';
import { Button, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import axios from 'axios';


function Example() {
const [formValue, setformValue] = useState({
  email: '',
  password: ''
})
//const [email, setEmail] = useState('')

const [students, setStudents] = useState([])

const onChange = (e) => {
  e.persist();
  setformValue({...formValue, [e.target.name]: e.target.value});
}

const handleSubmit = (e) => {
  if (e && e.preventDefault()) e.preventDefault()
  const formData = new FormData();
  formData.append("email", formValue.email)
  formData.append("password", formValue.password)
  axios.post("http://localhost/web-development/public/api/show_test",
  formData,
  {headers: {'Content-Type': 'multipart/form-data', 'Accept': 'application/jason'}}
  ).then (response => {
    console.log('response')
    console.log(response.status)
    if(response.status == 200){
      console.log(response.data)
      //setEmail(response.data[0]['email'])
      //setname(response.data[0]['name'])
      setStudents(response.data)
    }

  }).catch(error => {
    console.log(error)
  })
}

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
                <Form.Control type="text" placeholder="Enter email" name="email" 
                value={formValue.email} onChange={onChange}/>
              <Form.Text className="text-muted">
              We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" 
                value={formValue.password} onChange={onChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
            Submit
            </Button>
          </Form>
        </Col>
      <Col>
      
       {students.map((students)=>(
          <Card style={{ width: '18rem' }} key={students.id}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>{students.email}</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
          </Card>
        ))}
        </Col>
      </Row>
    </Container>
    );
}

export default Example;


