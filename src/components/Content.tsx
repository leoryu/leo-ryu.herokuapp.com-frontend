import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';

const styles = (theme: Theme) =>
	createStyles({});

interface MatchParameters {
	id: string;
}
interface ResData {
	content: string;
}

interface Props extends WithStyles<typeof styles>, RouteComponentProps<MatchParameters> { }
interface State {
	resData: ResData;
}

class Content extends React.Component<Props, State> {
	state: State = {
		resData: {
			content: "",
		},
	};
	componentDidMount() {
		this.getPaper();
	}
	getPaper = async () => {
		//let res = await axios.get<ResData>('http://192.168.1.100:7777/api/papers/5cb2a59bb39a75d5dbe2c732')
		let res = await axios.get<ResData>('http://192.168.1.100:7777/api/papers/' + this.props.match.params.id)
		this.setState({ resData: res.data })
		console.log("1")
	}
	render() {
		return (
			<Grid item xs={12} md={12}>
				<Typography variant="h6" gutterBottom>
					From the Firehose
              </Typography>
				<Divider />
				<ReactMarkdown source={this.state.resData.content} />
			</Grid>
		);
	}
}

(Content as React.ComponentClass<Props>).propTypes = {
	classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(Content);

