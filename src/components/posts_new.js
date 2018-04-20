import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {
    renderField(field) {
        return (
            <div className="form-group">
                <label>{field.label}</label>
                <input             
                    type="text"
                    className="form-control"
                    { ...field.input }
                />
                {field.meta.touched ? field.meta.error : ''}
            </div>
        );
    }

    onSubmit(values) {
        console.log(values);
    }

    render () {
        const { handleSubmit } = this.props;

        return (
            <div>
                <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
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
                </form>
            </div>
        );
    }
}

function validate(values) {
    console.log(values);
    const errors = {};

    // Here I should validate all the fields
    if (!values.title) {
        errors.title = "Enter a Title"
    }
    if (!values.categories) {
        errors.categories = "Enter a Categorie"
    }
    if (!values.content) {
        errors.content = "Enter a Content"
    }

    // If errors object is empty, reduxForm understand that there's no error.
    // If errors has any properties, reduxForm assumes form is invalid
    return errors;
}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(PostsNew);