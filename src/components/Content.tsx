import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
//import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ReactMarkdown from 'react-markdown';
import axios, { AxiosPromise } from 'axios';
//import * as post1 from './post1.md'

//const posts = [String(post1)];

const styles = (theme: Theme) =>
	createStyles({});


export interface Props extends WithStyles<typeof styles> { }

interface State {
	resData: ResData;
}

export interface ResData {
	content: string;
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
		let res = await axios.get<ResData>('http://192.168.1.100:7777/api/papers/5cb2a59bb39a75d5dbe2c732')
		this.setState({ resData: res.data })
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

