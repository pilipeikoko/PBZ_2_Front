import React, {Component} from "react";
import {Button, FormSelect, Modal} from "react-bootstrap";

class LinkUserModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectValue: "",
            users:[]
        }

        this.handleDropdownChange = this.handleDropdownChange.bind(this);
    };

    handleDropdownChange(e) {
        this.setState({selectValue: e.target.value});
    }

    refreshList() {
        fetch('https://localhost:44329/api/users')
            .then(response => response.json())
            .then(data => {
                this.setState({users: data});
            });
    }

    handleSubmit(){
        var value = this.state.selectValue;
        fetch('https://localhost:44329/api/users/link/'+ this.props.Id,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Id:this.state.selectValue,
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

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        //this.refreshList();
    }

    render() {
        return (
            <div>
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
                        <div className="container">
                            <FormSelect id="dropdown" onChange={this.handleDropdownChange}>
                                {this.state.users.map(user=><option value={user.Id}>{user.FullName}</option>)}
                            </FormSelect>
                            <Button className="mr-2" variant="success"
                                    onClick={()=>this.handleSubmit()}>
                                Link
                            </Button>
                            <p>{`You selected ${this.state.selectValue}`}</p>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default LinkUserModal;