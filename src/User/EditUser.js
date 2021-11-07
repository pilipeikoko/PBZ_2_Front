import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditUser extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch('https://localhost:44329/api/users/'+ event.target.Id.value,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                FullName:event.target.FullName.value,
                PhoneNumber:event.target.PhoneNumber.value,
                DrivingYearExperience:event.target.DrivingYearExperience.value,
                Rating:event.target.Rating.value
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
                            Edit User
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
                                                      defaultValue={this.props.Id}
                                                      placeholder={this.props.Id}/>
                                    </Form.Group>

                                    <Form.Group controlId="FullName">
                                        <Form.Label>Full name</Form.Label>
                                        <Form.Control type="text" name="FullName" required
                                                      placeholder="FullName" defaultValue={this.props.FullName} />
                                    </Form.Group>

                                    <Form.Group controlId="PhoneNumber">
                                        <Form.Label>Phone number</Form.Label>
                                        <Form.Control type="text" name="PhoneNumber" required
                                                      placeholder="Phone number" defaultValue={this.props.PhoneNumber}/>
                                    </Form.Group>

                                    <Form.Group controlId="DrivingYearExperience">
                                        <Form.Label>Driving year experience</Form.Label>
                                        <Form.Control type="text" name="DrivingYearExperience" required
                                                      placeholder="Driving year experience" defaultValue={this.props.DrivingYearExperience}/>
                                    </Form.Group>
                                    <Form.Group controlId="Rating">
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control type="text" name="Rating" required
                                                      placeholder="Rating" defaultValue={this.props.Rating}/>
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