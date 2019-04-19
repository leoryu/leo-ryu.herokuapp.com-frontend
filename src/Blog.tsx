import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import Bar from './components/Bar';
import FeaturedPosts from './components/FeaturedPosts';
import Paper from './components/Paper';
import Footer from './components/Footer';
import { ContentData } from './components/Content';
import SignIn  from './components/SignIn';
import Editor from './components/Editor';

const styles = (theme: Theme) =>
	createStyles({
		layout: {
			width: 'auto',
			marginLeft: theme.spacing.unit * 3,
			marginRight: theme.spacing.unit * 3,
			[theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
				width: 1100,
				marginLeft: 'auto',
				marginRight: 'auto',
			},
		},
		mainGrid: {
			marginTop: theme.spacing.unit * 3,
		},
	});


export interface Props extends WithStyles<typeof styles> { }

interface State {
	papers: ContentData[];
}

class Blog extends React.Component<Props, State> {
	state: State = {
		papers: [{
			id: "",
			title: "",
			content: "",
			abstract: "",
			created_at: 0,
			edited_at: 0,
		},]
	};
	componentDidMount() {
		this.getPaper();
	}
	getPaper = async () => {
		//let res = await axios.get<ResData>('http://192.168.1.100:7777/api/papers/5cb2a59bb39a75d5dbe2c732')
		let res = await axios.get<ContentData[]>(process.env.REACT_APP_API_URL + '/api/papers?limit=10&page=1&')
		this.setState({ papers: res.data })
	}
	render() {
		const { classes } = this.props;
		return (
			<Router>
				<CssBaseline />
				<div className={classes.layout}>
					<Bar />
					<main>
						<Route
							exact
							path="/"
							render={(props) => <FeaturedPosts {...props} posts={this.state.papers} />}
							/>
						<Route path="/paper/:id" component={Paper} />
						<Route path="/signin" component={SignIn} />
						<Route path="/admin/create" component={Editor} />
						<Route path="/admin/edit/:id"
							render={(props) => <Editor {...props} isModification={true} />}
							/>
					</main>
				</div>
				<Footer />
			</Router>
		);
	}
}

(Blog as React.ComponentClass<Props>).propTypes = {
	classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(Blog);

