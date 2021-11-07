import React,{Component} from 'react';
import {Button, ButtonToolbar, Modal, Table} from "react-bootstrap";

export class ListUserModal extends Component{

    constructor(props) {
        super(props);
        this.state={users:[]}
    }

    refreshList(){
        fetch('https://localhost:44329/api/users/manager/' + this.props.Id)
            .then(response=>response.json())
            .then(data=>{
                this.setState({users:data});
            });
    }s

    componentDidMount(){
        this.refreshList();
    }

    render(){
        const {users}=this.state;
        return(
            <div className="container">

                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header clooseButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Linked users
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Table className="mt-4" striped bordered hover size="sm">
                            <thead>
                            <tr>
                                <th>Full name</th>
                                <th>PhoneNumber</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map(user=>
                                <tr key={user.Id}>
                                    <td>{user.FullName	}</td>
                                    <td>{user.PhoneNumber}</td>
                                </tr>)}
                            </tbody>

                        </Table>


                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}