import React, { Component } from 'react'
import style from '../stylesheets/users.module.css'
import axios from 'axios';

export default class Accessories extends Component {
    constructor(props){
        super(props);
        this.state={
            data:[],
        }
    }
    componentDidMount(){
        axios.get('http://localhost:3004/accessories')
        .then(res=>{
            this.setState({
                data:res.data
            })
        })
        .catch(error=>{
            console.log("Error!!!");
        })
    }
    render() {
        return (
            <>
                <div className={style.main}>
                        <div className={style.header}>
                            <span>Manage Products</span>
                            <button type="button" class="btn btn-success">Add</button>
                        </div>
                        <hr/>
                        <table className={style.table}>
                            <thead>
                                <th>
                                    <th>Product Id</th>
                                    <th>Product Category</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Color</th>              
                                </th>
                            </thead>
                            <tbody>
                                {this.state.data.map(item=>(
                                    <tr>
                                        <td>{item.productId}</td>
                                        <td>{item.category}</td>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.color}</td>
                                        <td><button type="button" className="btn btn-warning">Edit</button></td>
                                        <td><button type="button"  className="btn btn-danger">Delete</button></td>      
                                </tr>
                                ))}
                            </tbody>
                        
                        </table>
                </div>
            </>
        )
    }
}
