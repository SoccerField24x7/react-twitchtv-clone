import React, { Fragment } from 'react';
import Modal from '../Modal';
import history from '../../history';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends React.Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}

	onSubmit = (formValues) => {
		this.props.deleteStream(this.props.match.params.id);
	};

	renderContent() {
		if (!this.props.stream) {
			return 'Are you sure you want to delete this stream?';
		}

		return `Are you sure you want to delete the stream with title: ${this.props.stream.title} `;
	}

	renderActions() {
		return (
			<Fragment>
				<button onClick={this.onSubmit} className="ui button negative">Delete</button>
				<Link className="ui button" to="/">Cancel</Link>
			</Fragment>
		);
	}

	render() {
		return (
			<Modal
				title="Delete Stream"
				content={this.renderContent()}
				actions={this.renderActions()}
				onDismiss={() => history.push('/')}
			/>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return { stream: state.streams[ownProps.match.params.id]};
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);