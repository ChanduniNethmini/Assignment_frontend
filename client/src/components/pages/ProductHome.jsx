import React, { Component } from 'react';
import axios from "axios";
import swal from "sweetalert";
import "./myStyles.css";


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

	onDelete = (id) => {
		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover this data again!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
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
        <div className="col-md-6 mb-4">
          <form class="form-inline">
            <i class="fas fa-search" aria-hidden="true"></i>
            <input
              className="form-control form-control-sm ml-3 w-75"
              type="search"
              placeholder="search"
              name="searchQuery"
              onChange={this.handleSearchArea}
            ></input>
          </form>
        </div>

        <table class="table table-striped" style={{ fontSize: "17px" }}>
          <thead>
            <tr>
            <th scope="col">NUMBER</th>
              <th scope="col">SKU</th>
              <th scope="col">IMAGE</th>
              <th scope="col">PRODUCT NAME</th>
              
              <th scope="col">PRICE</th>
              <th scope="col">action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((posts, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  <a href={`/product/post/${posts._id}`} style={{ textDecoration: "none" }}>
                    {posts.sku}
                  </a>
                </td>
                
                <td><img src={`/uploads/${posts.articleImage}`} width={160} alt='......'/></td>
                <td>{posts.name}</td>
                <td>{posts.price}</td>

                <td>
                  &nbsp;
                  <a className="btn btn-warning" href={`/update/${posts._id}`}>
                    <i className="fas fa-edit"></i>
                  </a>
                  &nbsp;
                  <a className="btn btn-danger" href="#" onClick={() => this.onDelete(posts._id)}>
                    <i className="fas fa-trash-alt"></i>
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
