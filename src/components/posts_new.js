import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { createPost } from '../actions';
import { connect } from 'react-redux';

class PostsNew extends Component {

  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          type="text"
          className="form-control"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            name="title"
            label="Title"
            component={this.renderField}
          />
          <Field
            name="categories"
            label="Categories"
            component={this.renderField}
          />
          <Field
            name="content"
            label="Post Content"
            component={this.renderField}
          />
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to='/' className="btn btn-danger">
            Cancel
          </Link>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  // Here I should validate all the fields
  if (!values.title) {
    errors.title = "Enter a Title";
  }
  if (!values.categories) {
    errors.categories = "Enter a Categorie";
  }
  if (!values.content) {
    errors.content = "Enter a Content";
  }

  // If errors object is empty, reduxForm understand that there's no error.
  // If errors has any properties, reduxForm assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
);