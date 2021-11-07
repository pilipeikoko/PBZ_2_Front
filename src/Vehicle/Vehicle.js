import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddVehicle} from './AddVehicle';
import {EditVehicle} from './EditVehicle';

export class Vehicle extends Component{

    constructor(props){
        super(props);
        this.state={vehicles:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch('https://localhost:44329/api/vehicles')
            .then(response=>response.json())
            .then(data=>{
                this.setState({vehicles:data});
            });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        //this.refreshList();
    }

    deleteDep(id){
        if(window.confirm('Are you sure?')){
            fetch('https://localhost:44329/api/vehicles/'+id,{
                method:'DELETE',
                header:{'Accept':'application/json',
                    'Content-Type':'application/json'}
            }).then(res=>res.json())
                .then((result)=>{
                        alert(result);
                        this.refreshList();
                    },
                    (error)=>{
                        alert('Failed');
                    })
        }
    }
    loadLocation(vehicle, locId){
        fetch('https://localhost:44329/api/locations/' + locId)
            .then(response=>response.json())
            .then(data=>{
                vehicle.latitude = data[0].Latitude;
                vehicle.longitude = data[0].Longitude;

                this.setState({vehicle:data[0]});
            });
    }

    render(){
        const {vehicles, vehicleId,RegistrationNumber,latitude,longitude}=this.state;
        let addModalClose=()=>{
            this.setState({addModalShow:false});
        }
        let editModalClose=()=>{
            this.setState({editModalShow:false});
            this.refreshList();
        }
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>RegistrationNumber</th>
                        <th>Location</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Options</th>
                    </tr>
                    </thead>
                    <tbody>
                    {vehicles.map(vehicle=>
                        <tr key={vehicle.Id}>
                            <td>{vehicle.RegistrationNumber	}</td>
                            <td><Button className="mr-3" variant="info"
                                    onClick={()=>this.loadLocation(vehicle, vehicle.LocationId)}>
                                Load location
                            </Button>
                            </td>
                            <td>{vehicle.latitude}</td>
                            <td>{vehicle.longitude}</td>
                            <td>
                                <ButtonToolbar>

                                    <Button className="mr-2" variant="info"
                                            onClick={()=>this.setState({editModalShow:true,
                                                vehicleId:vehicle.Id,RegistrationNumber:vehicle.RegistrationNumber,
                                                latitude:vehicle.latitude, longitude:vehicle.longitude})}>
                                        Edit
                                    </Button>

                                    <Button className="mr-2" variant="danger"
                                            onClick={()=>this.deleteDep(vehicle.Id)}>
                                        Delete
                                    </Button>
                                    <EditVehicle show={this.state.editModalShow}
                                                 onHide={editModalClose}
                                                 vehicleId={vehicleId}
                                                 RegistrationNumber={RegistrationNumber}
                                                 latitude ={latitude}
                                                 longitude ={longitude}
                                    />
                                </ButtonToolbar>

                            </td>

                        </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                            onClick={()=>this.setState({addModalShow:true})}>
                        Add Vehicle</Button>

                    <AddVehicle show={this.state.addModalShow}
                                 onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}
