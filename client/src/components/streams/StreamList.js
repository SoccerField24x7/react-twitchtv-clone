import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
	
	componentDidMount() {
		this.props.fetchStreams();
	}
	
	renderAdmin(stream) {
		if (stream.userId === this.props.currentUserId) {
			return (
				<div className="right floated content">
					<Link className="ui button primary" to={`/streams/edit/${stream.id}`}>Edit</Link>
					<Link className="ui button negative" to={`/streams/delete/${stream.id}`}>Delete</Link>
				</div>
			);
		}
	}

	renderList() {
		return this.props.streams.map(stream => {
			return (
				<div className="item" key={stream.id}>
					{this.renderAdmin(stream)}
					<i className="large middle aligned icon camera"></i>
					<div className="content">
						{stream.title}
						<div className="description">
							{stream.description}
						</div>
					</div>
				</div>
			);
		});
	}

	renderCreateButton() {
		if (this.props.isSignedIn !== null) {
			return (
				<Link to="/streams/new" className="ui button primary">
					Create Stream
				</Link>
			);
		}
	}

	render() {
		return (
			<div>
				<h2>Streams</h2>
				<div className="ui celled list">
					{this.renderList()}
				</div>
				<div  style={{ textAlign: 'right' }}>
					{this.renderCreateButton()}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return { 
		streams: Object.values(state.streams),
		currentUserId: state.auth.userId,
		isSignedIn: state.auth.isSignedIn
	};
};

export default connect(mapStateToProps, { fetchStreams }) (StreamList);