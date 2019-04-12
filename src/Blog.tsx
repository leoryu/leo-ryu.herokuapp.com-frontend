import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Bar from './components/Bar'
import FeaturedPosts from './components/FeaturedPosts'
import Content from './components/Content'
import Footer from './components/Footer'

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

function Blog(props: Props) {
	const { classes } = props;

	return (
		<Router>
			<CssBaseline />
			<div className={classes.layout}>
				<Bar />
				<main>
					<Route exact path="/" component={FeaturedPosts} />
					<Route exact path="/paper" component={Content} />
				</main>
			</div>
			<Footer />
		</Router>
	);
}

Blog.propTypes = {
	classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(Blog);

