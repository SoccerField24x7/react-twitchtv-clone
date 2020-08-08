import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions';

class StreamCreate extends React.Component {

	renderError( {error, touched} ) {
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header">{ error }</div>
				</div>
			);
		}
	}

	renderInput = (formProps)  => {
		const className = `field ${formProps.meta.error && formProps.meta.touched ? 'error' : ''}`;
		return (
			<div className={className}>
				<label>{formProps.label}</label>
				<input {...formProps.input} autoComplete="off" />
				{this.renderError(formProps.meta)}
			</div>
		);
	}

	onSubmit = (formProps) => {
		this.props.createStream(formProps);
	}

	render() {
		return (
			<form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
				<Field name="title" component={this.renderInput} label="Enter Title" />
				<Field name="description" component={this.renderInput} label="Enter Description" />
				<button className="ui button primary">Submit</button>
			</form>
		);
	};
};

const validate = (formProps) => {
	let error = {};

	if (!formProps.title) {
		error.title = 'You must enter a title';
	}

	if (!formProps.description) {
		error.description = 'You must enter a description';
	}

	return error;
};

// separate the redux form
const formWrapped = reduxForm({
	form: 'streamCreate',
	validate: validate
})(StreamCreate);

export default connect(null, { createStream })(formWrapped);