import React, { Component } from 'react'
import "../../components/pages/myStyles.css"
import frame from '../../img/frame.png'
import axios from "axios";

export default class Heading extends Component {
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
      <div>
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
      </div>
    )
  }
}
