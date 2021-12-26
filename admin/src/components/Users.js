import React, { Component } from 'react'
import axios from 'axios';
import style from '../stylesheets/users.module.css'
import '../stylesheets/bootstrap.min.css'


export default class Users extends Component {
    constructor(props){
        super(props);
        this.state={
            data:[],
            flag:0,
        }
    }
    componentDidMount(){
        axios.get('http://localhost:3004/users')
        .then(res=>{
            this.setState({
                data:res.data
            })
        })
        .catch(error=>{
            console.log("Error!!!");
        })
    }
    getId=event=>{
        
        // console.log(event);
        console.log(event.target.key);
    }
   

    deleteData=event=>{
        console.log("Clicked Delete Button");

    }

    
    render() {
        return (
            <>
                <div className={style.main}>
                        <div className={style.header}>
                            <h1>Manage Users</h1>
                            
                        </div>
                        <hr/>
                        <table className={style.table}>
                            <thead>
                                <tr>
                                    <th>User Id</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data.map(item=>(
                                    <tr>
                                        <td key={item.id}>{item.id}</td>
                                        <td>{item.fname}</td>
                                        <td>{item.lname}</td>
                                        <td className={style.email}>{item.email}</td>
                                        <td><button type="button" className="btn btn-secondary" onClick={this.deleteData, this.getId}>Delete</button></td>
                                        <td><button type="button" className="btn btn-danger">Ban</button></td>
                                </tr>
                                ))}
                            </tbody>
                        
                        </table>
                </div>
            </>
        )
    }
}
