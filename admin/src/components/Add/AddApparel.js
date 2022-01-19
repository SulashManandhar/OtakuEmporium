import React, { Component } from 'react'
import axios from 'axios'
import '../../stylesheets/bootstrap.min.css'
import '../../stylesheets/apparel.css'

export default class AddApparel extends Component {
    constructor(props){
        super(props);
        this.addData=this.addData.bind(this);
    }
    addData=event=>{
        event.preventDefault();
        var listArray= [];
        var checkboxes = document.querySelectorAll('.btn-check');
     
        for(var checkbox of checkboxes){
            if(checkbox.checked){
                //console.log("checkbox:"+checkbox.value);
                listArray.push(checkbox.value);
            }
        }
     //   console.log("Array:"+listArray);
 

       axios.post("http://localhost:3004/apparels",{
           name:document.getElementById('productName').value,
           category:document.getElementById('inputGroupSelect01').value,
           description:document.getElementById('product-description').value,
           color:document.getElementById('product-color').value,
           size:listArray,
           price:document.getElementById('product-price').value,
       }).then(res=>{
           console.log(res);
       });
       event.target.reset();
       alert("Successfully added the data");
   }
    render() {
        return (
            <div>
                <span className='header'>Add a apparel</span>
                <hr/>
               <div className="apparelMain">
                <form className="row g-3" onSubmit={this.addData}>

                    {/* Product Name */}
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-default">Product Name</span>
                        <input type="text" id="productName" className="form-control" aria-label="Name of Product" aria-describedby="inputGroup-sizing-default"/>
                    </div>
                
                
                    {/* Product Category  */}
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="CategorySelection">Category</label>
                        <select className="form-select" id="inputGroupSelect01" aria-label="Product Category selection">
                            <option defaultValue="T-shirt">Choose...</option>
                            <option value="SweatShirt">SweatShirt</option>
                            <option value="Hoodie">Hoodie</option>
                            <option value="Full-sleeve T-shirt">Full-sleeve T-shirt</option>
                            <option value="Half-sleeve T-shirt">Half-sleeve T-shirt</option>
                        </select>
                    </div>
                
                    {/* Description */}
                   <div className="input-group mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-default">Description</span>
                        <input type="text" id="product-description" className="form-control" aria-label="Description of Product" aria-describedby="inputGroup-sizing-default"/>
                    </div>

                    {/* Product Color */}
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-default">Product Color</span>
                        <input type="text" id="product-color" className="form-control" aria-label="Color of Product" aria-describedby="inputGroup-sizing-default"/>
                    </div>

                    {/* Product Price */}
                    <div className="input-group col-mb-2">
                        <span className="input-group-text" id="inputGroup-sizing-default">Product Price</span>
                        <input type="number" id ="product-price" className="form-control" aria-label="Price of Product" aria-describedby="inputGroup-sizing-default"/>
                    </div>

                    {/* Product Size */}
                    <div className="btn-group col-mb-2" role="group" aria-label="Product Size selection">
                        <input type="checkbox" value="small" className="btn-check" id="btncheck1" autoComplete="off" />
                        <label id="checkbox" className="btn btn-outline-success" htmlFor="btncheck1">Small</label>

                        <input type="checkbox" value="medium" className="btn-check" id="btncheck2" autoComplete="off" defaultChecked />
                        <label id="checkbox" className="btn btn-outline-success" htmlFor="btncheck2">Medium</label>

                        <input type="checkbox" value="large" className="btn-check" id="btncheck3" autoComplete="off"/>
                        <label id="checkbox" className="btn btn-outline-success" htmlFor="btncheck3">Large</label>
                    </div>
                    <br/>
   

                    <div className="col-12">
                        <button className="btn btn-primary" type="submit">Submit form</button>
                    </div>
                </form>
               </div>
            </div>
        )
    }
}
