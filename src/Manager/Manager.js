import React, {Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddManager} from './AddManager';
import {ListUserModal} from '../User/ListUserModal';
import {EditManager} from './EditManager';
import LinkUserModal from "../User/LinkUserModal";


export class Manager extends Component {

    constructor(props) {
        super(props);
        this.state = {managers: [], addModalShow: false, editModalShow: false}
    }

    refreshList() {
        fetch('https://localhost:44329/api/managers')
            .then(response => response.json())
            .then(data => {
                this.setState({managers: data});
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        //this.refreshList();
    }

    deleteManager(id) {
        if (window.confirm('Are you sure?')) {
            fetch('https://localhost:44329/api/managers/' + id, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then((result) => {
                        alert(result);
                        this.refreshList();
                    },
                    (error) => {
                        alert('Failed');
                    })
        }
    }

    render() {
        const {managers, Id, WorkingYearExperience, PhoneNumber, FullName} = this.state;
        let addModalClose = () => {
            this.setState({addModalShow: false});
            this.refreshList();
        }
        let editModalClose = () => {
            this.setState({editModalShow: false});
            this.refreshList();
        }
        let usersModalClose = () => {
            this.setState({usersModalShow: false});
            this.refreshList();
        }
        let linkUserModalClose = () => {
            this.setState({linkUserModalShow: false});
            this.refreshList();
        }
        return (
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>Working year experience</th>
                        <th>Phone number</th>
                        <th>Full name</th>
                        <th>Options</th>
                    </tr>
                    </thead>
                    <tbody>
                    {managers.map(manager =>
                        <tr key={manager.Id}>
                            <td>{manager.WorkingYearExperience}</td>
                            <td>{manager.PhoneNumber}</td>
                            <td>{manager.FullName}</td>
                            <td>
                                <ButtonToolbar>
                                    <Button className="mr-2" variant="info"
                                            onClick={() => this.setState({
                                                editModalShow: true,
                                                Id: manager.Id,
                                                WorkingYearExperience: manager.WorkingYearExperience,
                                                PhoneNumber: manager.PhoneNumber,
                                                FullName: manager.FullName
                                            })}>
                                        Edit
                                    </Button>

                                    <Button className="mr-2" variant="danger"
                                            onClick={() => this.deleteManager(manager.Id)}>
                                        Delete
                                    </Button>

                                    <Button className="mr-2" variant="primary"
                                            onClick={() => this.setState({usersModalShow: true, Id: manager.Id})}>
                                        Linked users

                                    </Button>

                                    <Button className="mr-2" variant="success"
                                            onClick={() => {
                                                this.setState({linkUserModalShow: true, Id: manager.Id})
                                            }}>
                                        Link a user
                                    </Button>

                                    {this.state.usersModalShow && <ListUserModal show={this.state.usersModalShow}
                                                                          onHide={usersModalClose}
                                                                          Id={Id}/>}


                                    <EditManager show={this.state.editModalShow}
                                                 onHide={editModalClose}
                                                 Id={Id}
                                                 WorkingYearExperience={WorkingYearExperience}
                                                 PhoneNumber={PhoneNumber}
                                                 FullName={FullName}/>


                                    <LinkUserModal show={this.state.linkUserModalShow}
                                                   onHide={linkUserModalClose}
                                                   Id={Id}/>
                                </ButtonToolbar>

                            </td>

                        </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                            onClick={() => this.setState({addModalShow: true})}>
                        Add Manager</Button>

                    <AddManager show={this.state.addModalShow}
                                onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}