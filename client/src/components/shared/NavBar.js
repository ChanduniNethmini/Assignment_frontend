import React, { Component } from 'react'
import eclipse from '../../img/user.png'
import "../../components/pages/myStyles.css"

export default class NavBar extends Component {
  render() {
    return (
      <div>
<nav class="navbar ">
<div class="dropdown" style={{marginLeft:"82%",  display: "inline-block"}}>
  <button class="btn dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Admin
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
    <button class="dropdown-item" type="button">Action</button>
    <button class="dropdown-item" type="button">Another action</button>
    <button class="dropdown-item" type="button">Something else here</button>
  </div>
</div>
<img className = 'c1' src={eclipse} style={{marginLeft:"90%", marginTop:"-2.5%", display: 'inline-block'}}/>
</nav>


      </div>
    )
  }
}
