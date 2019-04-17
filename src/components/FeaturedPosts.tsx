import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Link from '@material-ui/core/Link';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import { Link as RouterLink } from 'react-router-dom';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { ContentData } from './Content';

const styles = (theme: Theme) =>
	createStyles({
		mainFeaturedPost: {
			backgroundColor: theme.palette.grey[800],
			color: theme.palette.common.white,
			marginBottom: theme.spacing.unit * 4,
		},
		mainFeaturedPostContent: {
			padding: `${theme.spacing.unit * 6}px`,
			[theme.breakpoints.up('md')]: {
				paddingRight: 0,
			},
		},
		cardGrid: {
			paddingTop: theme.spacing.unit * 3,
			paddingBottom: theme.spacing.unit * 3,
		},
		card: {
			display: 'flex',
		},
		cardDetails: {
			flex: 1,
		},
		cardMedia: {
			width: 160,
		},
	});

export interface Props extends WithStyles<typeof styles> {
	posts: ContentData[];
}

function FeaturedPosts(props: Props) {
	const { classes, posts } = props;

	return (
		<React.Fragment>
			{/* Main featured post */}
			<Paper className={classes.mainFeaturedPost}>
				<Grid container>
					<Grid item md={6}>
						<div className={classes.mainFeaturedPostContent}>
							<Typography component="h1" variant="h3" color="inherit" gutterBottom>
								{posts[0].title}
							</Typography>
							<Typography variant="h5" color="inherit" paragraph>
								{posts[0].abstract}
							</Typography>
						</div>
					</Grid>
				</Grid>
			</Paper>
			{/* End main featured post */}
			{/* Sub featured posts */}
			<Grid container spacing={40} className={classes.cardGrid}>
				{posts.slice(1).map(post => (
					<Grid item key={post.title} xs={12} md={12}>
						<Card className={classes.card}>
							<div className={classes.cardDetails}>
								<CardContent>
									<Typography component="h2" variant="h5">
										{post.title}
									</Typography>
									<Typography variant="subtitle1" color="textSecondary">
										{post.created_at}
									</Typography>
									<Typography variant="subtitle1" paragraph>
										{post.abstract}
									</Typography>
									<Link component={props => <RouterLink {...props} to={"/paper/" + post.id} />}>
										<Typography variant="subtitle1" color="primary">
											Continue reading...
										</Typography>
									</Link>
								</CardContent>
							</div>
							<Hidden xsDown>
								<CardMedia
									className={classes.cardMedia}
									image=""
									title="Image title"
								/>
							</Hidden>
						</Card>
					</Grid>
				))}
			</Grid>
			{/* End sub featured posts */}
		</React.Fragment>
	);
}

FeaturedPosts.propTypes = {
	classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(FeaturedPosts);

