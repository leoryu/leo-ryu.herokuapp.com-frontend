import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import { match } from 'react-router-dom';
import Content, { ContentData } from './Content'

const styles = () =>
	createStyles({});

interface MatchParameters {
	id: string;
}

interface Props extends WithStyles<typeof styles> {
	match: match<MatchParameters>;
}
interface State {
	resData: ContentData;
}

class Paper extends React.Component<Props, State> {
	state: State = {
		resData: {
			title: "Loding...",
			content: "",
			abstract: "",
			created_at: 0,
			edited_at: 0,
		},
	};
	componentDidMount() {
		this.getPaper();
	}
	getPaper = async () => {
		//let res = await axios.get<ResData>('http://192.168.1.100:7777/api/papers/5cb2a59bb39a75d5dbe2c732')
		let res = await axios.get<ContentData>(process.env.REACT_APP_API_URL + '/api/papers/' + this.props.match.params.id)
		this.setState({ resData: res.data })
	}
	render() {
		return (
			<Content contentData={this.state.resData} />
		)
	}
}

(Paper as React.ComponentClass<Props>).propTypes = {
	classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(Paper);

