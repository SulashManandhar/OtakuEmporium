import React, { Component } from 'react'
import axios from 'axios';
import style from '../stylesheets/users.module.css'
import {AiOutlineMinusCircle} from 'react-icons/ai'
import {HiOutlineBan} from 'react-icons/hi'
import '../stylesheets/bootstrap.min.css'


export default class Users extends Component {
    constructor(props){
        super(props);
        this.state={
            data:[],
            flag:null,
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

    componentDidUpdate(){
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

    //get id of selected users
    getId=(event)=>{ 
        this.setState({
            flag:event.target.value,
        })
        console.log("Id selected:"+this.state.flag);
    }

    banData=event=>{
        var isBan;
        this.state.data.map(item=>(
           (item.id)===this.state.flag?isBan=(item.ban ? true : false) : console.log("Not found")
           
        ))
        //isBan?console.log("Ban is true"):console.log("ban is false");
        console.log(isBan)
        axios.patch("http://localhost:3004/users/"+this.state.flag,{
            ban:(!isBan)
           
        }).then(res=>{
            console.log(res);
        });    
    }
    
    deleteData=event=>{
        var confimation = window.confirm(
            "Do you want to delete this data?(You cannot undo this command)"
        )
        if(confimation){
            axios.delete('http://localhost:3004/users/'+this.state.flag)
            .then(res=>{
                console.log(res);
                console.log("Successfully deleted data.")
                alert("Successfully delete the data");
            })
            .catch(res=>{
                console.log(res)
                alert("Data was not deleted.");
            })
           
        }
        else{
            alert("Data was not deleted.");
        }
       // window.location.reload();
      
    }
 
    render() {
        return (
            <>
                <div className={style.main}>
                        <div className={style.header}>
                            <span>Manage Users</span>
                        </div>
                        <div className={style.crudButton}>
                            <button type="button" className="btn btn-secondary" onClick={this.banData}>Ban <HiOutlineBan/></button>
                            <button  type="button" className="btn btn-danger" onClick={this.deleteData}>Delete <AiOutlineMinusCircle/></button>                           
                        </div>
                        <div className={style.clearfix}>

                        </div>
                        <hr/>
                        <table className={style.table}>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>User ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Ban</th>     
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data.map(item=>(
                                    <tr key={item.id}>
                                        <td> <input type="radio" onClickCapture={this.getId} value={item.id} id={item.id} name="userId"/></td>
                                        <td>{item.id}</td>
                                        <td>{item.fname}</td>
                                        <td>{item.lname}</td>
                                        <td className={style.email}>{item.email}</td>
                                        <td>{item.ban?"Yes":"No"}</td>    
                                </tr>
                                ))}
                            </tbody>
                        
                        </table>
                </div>
            </>
        )
    }
}
