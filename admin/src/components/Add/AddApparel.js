import React, { Component } from 'react'
import '../../stylesheets/bootstrap.min.css'
import '../../stylesheets/apparel.css'

export default class AddApparel extends Component {
    render() {
        return (
            <div>
                <span className='header'>Add a apparel</span>
                <hr/>
               <div className="apparelMain">
                <form className="row g-3">
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-default">Product Name</span>
                        <input type="text" class="form-control" aria-label="Name of Product" aria-describedby="inputGroup-sizing-default"/>
                    </div>
                
                
                    <div className="input-group mb-3">
                        <label className="input-group-text" for="CategorySelection">Category</label>
                        <select className="form-select" id="inputGroupSelect01" aria-label="Product Category selection">
                            <option selected>Choose...</option>
                            <option value="1">SweatShirt</option>
                            <option value="2">Hoodie</option>
                            <option value="3">Full-sleeve T-shirt</option>
                            <option value="3">Half-sleeve T-shirt</option>
                        </select>
                    </div>
                

                   <div className="input-group mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-default">Description</span>
                        <input type="text" class="form-control" aria-label="Description of Product" aria-describedby="inputGroup-sizing-default"/>
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-default">Product Color</span>
                        <input type="text" class="form-control" aria-label="Color of Product" aria-describedby="inputGroup-sizing-default"/>
                    </div>

                    <div className="input-group col-mb-2">
                        <span className="input-group-text" id="inputGroup-sizing-default">Product Price</span>
                        <input type="number" class="form-control" aria-label="Price of Product" aria-describedby="inputGroup-sizing-default"/>
                    </div>

                    <div className="btn-group col-mb-2" role="group" aria-label="Product Size selection">
                        <input type="checkbox" className="btn-check" id="btncheck1" autocomplete="off"/>
                        <label class="btn btn-outline-success" for="btncheck1">Small</label>

                        <input type="checkbox" className="btn-check" id="btncheck2" autocomplete="off"/>
                        <label class="btn btn-outline-success" for="btncheck2">Medium</label>

                        <input type="checkbox" className="btn-check" id="btncheck3" autocomplete="off"/>
                        <label class="btn btn-outline-success" for="btncheck3">Large</label>
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
