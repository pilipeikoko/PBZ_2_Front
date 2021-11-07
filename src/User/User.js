import React, {Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button, ButtonToolbar, Image} from 'react-bootstrap';
import {AddUser} from './AddUser';
import {EditUser} from './EditUser';

export class User extends Component {

    constructor(props) {
        super(props);
        this.state = {users: [], addModalShow: false, editModalShow: false}
    }

    refreshList() {
        fetch('https://localhost:44329/api/users')
            .then(response => response.json())
            .then(data => {
                this.setState({users: data});
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
            fetch('https://localhost:44329/api/users/' + id, {
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

    loadLocation(user, locId) {
        if (locId != null) {
            fetch('https://localhost:44329/api/locations/' + locId)
                .then(response => response.json())
                .then(data => {

                        user.Latitude = data[0].Latitude;
                        user.Longitude = data[0].Longitude;

                        this.setState({user: data[0]});
                    },
                    (error) => {

                    });
        } else {
            this.refreshList();
            alert('Failed. Try again');
        }

    }


    render() {
        const {
            users,
            Id,
            PhoneNumber,
            FullName,
            PassportPhoto,
            DrivingLicensePhoto,
            Latitude,
            Longitude,
            DrivingYearExperience,
            Rating
        } = this.state;
        let addModalClose = () => {
            this.setState({addModalShow: false});
            this.refreshList();
        }
        let editModalClose = () => {
            this.setState({editModalShow: false});
            this.refreshList();
        }
        let rentRecordsModalClose = () => {
            this.setState({rentRecordsModalShow: false});
            this.refreshList();
        }
        return (
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>Full name</th>
                        <th>Phone number</th>
                        <th>Location</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Driving year experience</th>
                        <th>Rating</th>
                        <th>Options</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user =>
                        <tr key={user.Id}>
                            <td>{user.FullName}</td>
                            <td>{user.PhoneNumber}</td>
                            <td><Button className="mr-3" variant="info"
                                        onClick={() => this.loadLocation(user, user.LocationId)}>
                                Load location
                            </Button>
                            </td>
                            <td>{user.Latitude}</td>
                            <td>{user.Longitude}</td>
                            <td>{user.DrivingYearExperience}</td>
                            <th>{user.Rating}</th>
                            <td>
                                <ButtonToolbar>
                                    <Button className="mr-2" variant="info"
                                            onClick={() => this.setState({
                                                editModalShow: true,
                                                Id: user.Id,
                                                FullName: user.FullName,
                                                PhoneNumber: user.PhoneNumber,
                                                DrivingYearExperience: user.DrivingYearExperience,
                                                Rating: user.Rating
                                            })}>
                                        Edit
                                    </Button>
                                    <Button className="mr-2" variant="danger"
                                            onClick={() => this.deleteManager(user.Id)}>
                                        Delete
                                    </Button>

                                    <EditUser show={this.state.editModalShow}
                                              onHide={editModalClose}
                                              Id={Id}
                                              FullName={FullName}
                                              PhoneNumber={PhoneNumber}
                                              DrivingYearExperience={DrivingYearExperience}
                                              Rating={Rating}
                                    />
                                </ButtonToolbar>

                            </td>

                        </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                            onClick={() => this.setState({addModalShow: true})}>
                        Add User</Button>

                    <AddUser show={this.state.addModalShow}
                             onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}