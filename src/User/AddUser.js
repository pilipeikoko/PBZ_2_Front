import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form, Image} from 'react-bootstrap';
import '../FileBase64';
import FileBase64 from "../FileBase64";

export class AddUser extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        fetch('https://localhost:44329/api/users/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                FullName: event.target.FullName.value,
                PhoneNumber: event.target.PhoneNumber.value,
                Location: {
                    Latitude: event.target.Latitude.value,
                    Longitude: event.target.Longitude.value
                },
                DrivingYearExperience: event.target.DrivingYearExperience.value,
                Rating: event.target.Rating.value,
            })
        })
            .then(res => res.json())
            .then((result) => {
                    alert(result);
                },
                (error) => {
                    alert('Failed');
                })
    }

    render() {
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
                            Add User
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="FullName">
                                        <Form.Label>Full name</Form.Label>
                                        <Form.Control type="text" name="FullName" required
                                                      placeholder="Full name"/>
                                    </Form.Group>

                                    <Form.Group controlId="PhoneNumber">
                                        <Form.Label>Phone number</Form.Label>
                                        <Form.Control type="text" name="PhoneNumber" required
                                                      placeholder="Phone number"/>
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

                                    <Form.Group controlId="DrivingYearExperience">
                                        <Form.Label>Driving year experience</Form.Label>
                                        <Form.Control type="text" name="DrivingYearExperience" required
                                                      placeholder="Driving year experience"/>
                                    </Form.Group>

                                    <Form.Group controlId="Rating">
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control type="text" name="Rating" required
                                                      placeholder="Rating"/>
                                    </Form.Group>


                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add user
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