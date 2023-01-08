import React, { Component } from 'react';
import axios from "axios";
import swal from "sweetalert";
import "./myStyles.css";
import Heading from '../shared/Heading';
import frame from '../../img/frame.png'
import edit from '../../img/edit-icon.svg';
import del from '../../img/delete-icon.svg'
import star from '../../img/star.svg'


export default class ProductHome extends Component {
  constructor(props) {
		super(props);

		this.state = {
			posts: [],
		};
	}
	componentDidMount() {
		this.retrievePosts();
	}

  //displaying exisiting posts
	retrievePosts() {
		axios.get("http://localhost:8000/products").then((res) => {
			if (res.data.success) {
				this.setState({
					posts: res.data.existingPosts,
				});
				console.log(this.state.posts);
			}
		});
	}

  //calling delete function
	onDelete = (id) => {
		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover this data again!",
			icon: "warning",
			buttons: true,
			dangerMode: false,
		}).then((willDelete) => {
			if (willDelete) {
				axios.delete(`http://localhost:8000/product/delete/${id}`).then((res) => {
					swal("Deleted Successful", "Order is removed", "success");

					this.retrievePosts();
				});
			} else {
				swal("Your data is safe!");
			}
		});
	};

  //searching
	filterData(posts, searchKey) {
		const result = posts.filter(
			(post) => post.name.toLowerCase().includes(searchKey) || post.sku.toLowerCase().includes(searchKey)
		);
		this.setState({ posts: result });
	}

	handleSearchArea = (e) => {
		const searchKey = e.currentTarget.value;

		axios.get("http://localhost:8000/products").then((res) => {
			if (res.data.success) {
				this.filterData(res.data.existingPosts, searchKey);
			}
		});
	};
  render() {
    return (
      <div>	<div>
      <div className="container">
      <div className="topic c1">PRODUCTS</div>
        <div className='row'>
          <div className='col'>
            <br/>
          <div className="col-md-6 mb-4">
          <form class="form-inline">
            <i class="fas fa-search" aria-hidden="true"></i>
            <input
            style={{backgroundColor:"#F7F7F7"}}
              className="form-control sbar"
              type="search"
              placeholder="Search for products"
              name="searchQuery"
              onChange={this.handleSearchArea}
            ></input>
          </form>
        </div>
          </div>
          <div className='col'>
            <br/>
          <button type="button" class="btn btn-lg addbutton" ><a href='/add' style={{color:"white", textDecoration:'none'}}>New Product</a></button>
          </div>
          <div className='col'>
          <img src={frame} style={{marginLeft: "30%"}} className='frame'/>
          </div>
        </div>

        <table class="table" style={{ fontSize: "17px" }}>
          <thead>
            <tr>
            <th scope="col" style={{color:'#001EB9'}}>ID</th>
              <th scope="col" style={{color:'#001EB9'}}>SKU</th>
              <th scope="col" style={{color:'#001EB9'}}>IMAGE</th>
              <th scope="col"style={{color:'#001EB9'}}>PRODUCT NAME</th>
              
              <th scope="col" style={{color:'#001EB9'}}>PRICE</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((posts, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                    {posts.sku}
                </td>
                
                <td><img src={`/uploads/${posts.articleImage}`} width={160} alt='......' style={{height:"100px", width:"100px"}}/></td>
                <td>{posts.name}</td>
                <td>${posts.price}</td>

                <td>
                  &nbsp;
                  <a className="btn" href={`/update/${posts._id}`}>
                    <img src={edit}/>
                  </a>
                  &nbsp;
                  <a className="btn" href="#" onClick={() => this.onDelete(posts._id)}>
                  <img src={del}/></a>
                  &nbsp;
                  <a className="btn" href="#">
                  <img src={star}/>

                  </a>
                </td>
              </tr>
            ))}
          </tbody>
          <br />
          <br />
        </table>
    
      
      </div>
    </div></div>
    )
  }
}
