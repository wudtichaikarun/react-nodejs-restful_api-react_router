import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class SidebarContainer extends Component {
  state = {
    categories: []
  }

  componentDidMount() {
    fetch('/categories')
      .then(res => res.json())
      .then(({ categories }) => this.setState({ categories }) )
  }

  render() {
    return (
     <div className='col-5'>
       <nav className='list-group'>
         {
           this.state.categories.map(({ id, title }) => 
              <Link
                key={id} 
                to={`/categories/${id}/articles`} >
                  {title}
              </Link> 
           )
         }
       </nav>
     </div> 
    )
  }
}

export default SidebarContainer