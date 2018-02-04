import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ArticleForm extends Component {

  state = {
    title: '',
    content: ''
  }

  static propType = {
    formType: PropTypes.string.isRequired,
    title: PropTypes.string,
    content: PropTypes.string,
    onSubmit: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    const { title, content } = this.props

    if(prevProps.title === title && prevProps.content === content) return
    this.setState({ title, content })
  }

  onSubmit = event => {
    event.preventDefault()

    this.props.onSubmit(this.state)
  }

  onFieldChange = event => {
    const { name, value } = event.target

    this.setState({ [name]: value })
  }

  render() {
    const { formType } = this.props
    const { title, content } = this.state

    return(
      <form>
        <h2 className='text-center'>{formType} Article Form</h2>
        <hr />
        <div className='form-group'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            className='form-control'
            id='title'
            name='title'
            placeholder='Enter title'
            value={title}
            onChange={this.onFieldChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='content'>Content</label>
          <textarea
            rows='4'
            type='text'
            className='form-control'
            id='content'
            name='content'
            placeholder='Enter content'
            value={content}
            onChange={this.onFieldChange} />
        </div>
        <button
          type='submit'
          className='btn btn-primary'
          onClick={this.onSubmit}>
            {formType}
        </button>
      </form>
    )
  }

}

export default ArticleForm