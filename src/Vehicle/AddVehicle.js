import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class AddVehicle extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch('https://localhost:44329/api/vehicles/',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Location:{
                    Latitude:event.target.Latitude.value,
                    Longitude:event.target.Longitude.value
                },
                RegistrationNumber:event.target.RegistrationNumber.value
            })
        })
            .then(res=>res.json())
            .then((result)=>{
                    alert(result);
                },
                (error)=>{
                    alert('Failed');
                })
    }
    render(){
        return (
            <div className="container">

                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header clooseButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Vehicle
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="RegistrationNumber">
                                        <Form.Label>Registration Number</Form.Label>
                                        <Form.Control type="text" name="RegistrationNumber" required
                                                      placeholder="Registration Number"/>
                                    </Form.Group>

                                    <Form.Group controlId="Latitude">
                                        <Form.Label>Latitude</Form.Label>
                                        <Form.Control type="text" name="Latitude" required
                                                      placeholder="Latitude"/>
                                    </Form.Group>

                                    <Form.Group controlId="Longitude">
                                        <Form.Label>Longitude</Form.Label>
                                        <Form.Control type="text" name="Longitude" required
                                                      placeholder="Longitude"/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add Vehicle
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>

                </Modal>

            </div>
        )
    }

}