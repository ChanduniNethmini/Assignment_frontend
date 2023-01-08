import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import "./myStyles.css";
import arrow from "../../img/arrow.svg";

const AddProduct = () => {

  const [sku , setSku] = useState("");
  const [name , setName] = useState("");
  const [price , setPrice] = useState("");
  const [description , setDescription] = useState("");
  const [qty , setQty] = useState("");
  const [fileName, setFileName] = useState("");
  const [message, setMessage] = useState("")

  const onChangeFile = (e) => {
    setFileName(e.target.files[0]);
  }

  //save to db
  const changeOnClick = (e) => {
    e.preventDefault();
const formData = new FormData();

formData.append("sku", sku);
formData.append("name", name);
formData.append("price", price);
formData.append("description", description);
formData.append("qty", qty);
formData.append("articleImage", fileName);

setSku("");
setName("");
setPrice("");
setDescription("");
setQty("");

//API binding

          axios
          .post("http://localhost:8000/product/save", formData)
          .then((res) => setMessage(res.data))
          .catch((err) => {
            console.log(err);
          });
            
        
  };

    return (
      <div className="container font1" style={{marginLeft:'15%'}}>
        <div className="topic c1">PRODUCTS</div>&nbsp;
        <img src={arrow} className="image1 c1" />&nbsp;&nbsp;
        <div className="subtopic c1"  style={{color:'#001EB9'}}>Add new product</div>
     <span className='message'>{message}</span>
     <form onSubmit={changeOnClick} encType='multipart/form-data'>
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
            value={sku}
            placeholder=""
            onChange={(e) => setSku(e.target.value)}
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={qty}
            onChange={(e) => setQty(e.target.value)}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-2">
            <label htmlFor="file" className="inputstyle">Product Image</label>
          <h8 style={{color: '#162427'}}>JPEG, PNG, SVG or GIF <br/> (Maximum file size 50MB)</h8>
            </div>
            <div className="col">
            <input type="file" filename='articleImage' className="form-control-file" onChange={onChangeFile}/>
            </div>
          </div>
         
         
        </div>
        <div>
        <button type="submit" class="btn btnstyle" style={{color:"white"}}>Add Product</button>
</div>
</form>
        
      </div>
    );
  }

  export default AddProduct;