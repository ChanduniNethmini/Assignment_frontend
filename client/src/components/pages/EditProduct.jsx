import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";
import "./myStyles.css";
import arrow from "../../img/arrow.svg";

export default class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sku:"",
      name: "",
      qty: "",
      description: "",
    }
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value
    })

  }

  onSubmit = (e) => {

    e.preventDefault();
    const id = this.props.match.params.id;

    const { sku, name, qty, description } = this.state;

    const data = {
      sku: sku,
      name: name,
      qty: qty,
      description: description,

    }

    console.log(data)
    const re = /^[0-9\b]+$/;
		if (name == "" || sku == "" ) {
			swal("Please fill the form correctly", "Form values cannot be empty", "error");
		} else if (name.length < 2) {
			swal("User name invalid", "length should be greater than 2", "error");
		} else {
    axios.put(`http://localhost:8000/product/update/${id}`, data).then((res) => {
      if (res.data.success) {

        swal("Update Successful", "Update is recorder", "success");
        this.setState(
          {
            sku:"",
            name: "",
            qty: "",
            description: "",

          }
        )
      }
    })
  }
  }
  componentDidMount() {

    const id = this.props.match.params.id;


    axios.get(`http://localhost:8000/product/${id}`).then((res) => {

      if (res.data.success) {
        this.setState({

          sku: res.data.post.sku,
          name: res.data.post.name,
          qty: res.data.post.qty,
          description: res.data.post.description,

        });

        console.log(this.state.post);
      }
    })

  }
  render() {
    return (
    <div className="container font1" style={{marginLeft:'15%'}}>
    <div className="topic c1">PRODUCTS</div>&nbsp;
    <img src={arrow} className="image1 c1" />&nbsp;&nbsp;
    <div className="subtopic c1" style={{color:'#001EB9'}}>Edit Product</div>
 
 <form>
    <div class="mb-3 inputstyle">
    <br/>
      <label for="exampleFormControlInput1" class="form-label">
        SKU
      </label>
      <input
        type="text"
        class="form-control spacestyle"
        id="exampleFormControlInput1"
        name="sku"
        value={this.state.sku}
        placeholder=""
        onChange={this.handleInputChange}
        required
      />
    </div>
    <div className="row">
        <div className="col">
        <div class="mb-3 inputstyle">
      <label for="exampleFormControlInput1" class="form-label">
        Name
      </label>
      <input
        type="text"
        class="form-control spacestyle"
        id="exampleFormControlInput1"
        placeholder=""
        name="name"
        value={this.state.name}
        onChange={this.handleInputChange}
        required
      />
    </div>
        </div>
<div className="col">
<div class="mb-3 inputstyle">
      <label for="exampleFormControlInput1" class="form-label">
        QTY
      </label>
      <input
        type="string"
        class="form-control spacestyle"
        id="exampleFormControlInput1"
        placeholder=""
        name="qty"
        value={this.state.qty}
        onChange={this.handleInputChange}
        required
      />
    </div>  
</div>
   
    </div>
   
    <div class="mb-3 inputstyle">
      <label for="exampleFormControlTextarea1" class="form-label">
      Product Description
      </label>
      <h6 style={{color: '#162427'}}>A small description about the product</h6>
      <textarea
        class="form-control inputareastyle"
        id="exampleFormControlTextarea1"
        rows="3"
        name="description"
        placeholder=""
        value={this.state.description}
        onChange={this.handleInputChange}
        required
      ></textarea>
    </div>
    <div className="form-group">
      <label htmlFor="file" className="inputstyle">Product Image</label>
      <h6 style={{color: '#162427'}}>JPEG, PNG, SVG or GIF (Maximum file size 50MB)</h6>
      <input type="file" filename='articleImage' className="form-control-file"/>
    </div>
    <div>
    <button type="submit" class="btn btnstyle" style={{color:"white"}}  onClick={this.onSubmit}>Edit Product</button>
</div>
</form>
    
  </div>
  )
    }}
