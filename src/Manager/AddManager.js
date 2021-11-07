import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class AddManager extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch('https://localhost:44329/api/managers/',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                WorkingYearExperience:event.target.WorkingYearExperience.value,
                PhoneNumber:event.target.PhoneNumber.value,
                FullName:event.target.FullName.value
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
                            Add Manager
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="WorkingYearExperience">
                                        <Form.Label>Working year experience</Form.Label>
                                        <Form.Control type="text" name="WorkingYearExperience" required
                                                      placeholder="Working year experience"/>
                                    </Form.Group>

                                    <Form.Group controlId="PhoneNumber">
                                        <Form.Label>Phone number</Form.Label>
                                        <Form.Control type="text" name="PhoneNumber" required
                                                      placeholder="Phone number"/>
                                    </Form.Group>

                                    <Form.Group controlId="FullName">
                                        <Form.Label>Full name</Form.Label>
                                        <Form.Control type="text" name="FullName" required
                                                      placeholder="Full name"/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add manager
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