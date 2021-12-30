import React, { Component } from 'react'
import style from '../stylesheets/users.module.css'
import { AiOutlinePlusCircle, AiOutlineMinusCircle,AiOutlineEdit} from 'react-icons/ai'
import axios from 'axios';
import {Link} from 'react-router-dom';

export default class Apparels extends Component {
    constructor(props){
        super(props);
        this.state={
            data:[],
            flag:null,
        }
    }
    componentDidMount(){
        axios.get('http://localhost:3004/apparels')
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
        axios.get('http://localhost:3004/apparels')
        .then(res=>{
            this.setState({
                data:res.data
            })
        })
        .catch(error=>{
            console.log("Error!!!");
        })
    }

    getId=(event)=>{ 
        this.setState({
            flag:event.target.value,
        })
        console.log(this.state.flag)
    }

    deleteData=event=>{
        var confimation = window.confirm(
            "Do you want to delete this data?(You cannot undo this command)"
        )
        if(confimation){
            axios.delete('http://localhost:3004/apparels/'+this.state.flag)            
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
    }
    render() {
        return (
            <>
                <div className={style.main}>
                        {/* Header  */}
                        <div className={style.header}>
                            <span>Manage Products</span>     
                        </div>
                        <div className={style.crudButton}>
                            <Link to="/addApparels"><button type="button" class="btn btn-success">Add <AiOutlinePlusCircle/></button></Link>
                            <button type="button" className="btn btn-warning" >Edit <AiOutlineEdit/></button>
                            <button  type="button" className="btn btn-danger" onClick={this.deleteData}>Delete <AiOutlineMinusCircle/></button>
                        </div>
                        
                        {/* Clearfix  */}
                        <div className={style.clearfix}> </div>
                        <hr/>

                        {/* Table Data  */}
                        <table className={style.table}>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Product Id</th>
                                    <th>Product Category</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Color</th>    
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data.map(item=>(
                                    <tr key={item.id}>
                                        <td> <input type="radio" onClickCapture={this.getId} value={item.id} id={item.id} name="userId"/></td>
                                        <td>{item.id}</td>
                                        <td>{item.category}</td>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.color}</td>                            
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                </div>
            </>
        )
    }
}
