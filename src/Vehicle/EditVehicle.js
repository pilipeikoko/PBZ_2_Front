import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditVehicle extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch('https://localhost:44329/api/vehicles/'+ event.target.Id.value,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Id:event.target.Id.Value,
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
                            Edit Vehicle
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="Id">
                                        <Form.Label>Id</Form.Label>
                                        <Form.Control type="text" name="vehicleId" required
                                                      disabled
                                                      defaultValue={this.props.vehicleId}
                                                      placeholder={this.props.vehicleId}/>
                                    </Form.Group>

                                    <Form.Group controlId="RegistrationNumber">
                                        <Form.Label>Registration Number</Form.Label>
                                        <Form.Control type="text" name="RegistrationNumber" required
                                                      placeholder="Registration Number" defaultValue={this.props.RegistrationNumber} />
                                    </Form.Group>

                                    <Form.Group controlId="Latitude">
                                        <Form.Label>Latitude</Form.Label>
                                        <Form.Control type="text" name="Latitude" required
                                                      placeholder="Latitude" defaultValue={this.props.latitude}/>
                                    </Form.Group>

                                    <Form.Group controlId="Longitude">
                                        <Form.Label>Longitude</Form.Label>
                                        <Form.Control type="text" name="Longitude" required
                                                      placeholder="Longitude" defaultValue={this.props.longitude}/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Edit
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