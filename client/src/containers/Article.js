import React, { Component } from 'react'

class ArticleContainer extends Component {
  state = {
    title: '',
    content: ''
  }

  componentDidMount() {
    this.loadArticle()
  }

  loadArticle() {
    const { id } = this.props.match.params

    fetch(`/articles/${id}`)
      .then(res => res.json())
      .then(({ article }) => this.setState({ ...article }))
  }

  render() {
    const { title, content } = this.state
    
    return( 
      <div>
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    )
  }
}

export default ArticleContainer