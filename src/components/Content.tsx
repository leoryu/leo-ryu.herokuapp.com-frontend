import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
//import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
//import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

function Content() {
	return (
		<Grid item xs={12} md={12}>
			<Typography variant="h6" gutterBottom>
				From the Firehose
              </Typography>
			<Divider />
			{/* {posts.map(post => (
								<Markdown className={classes.markdown} key={post.substring(0, 40)}>
									{post}
								</Markdown>
							))} */}
		</Grid>
	);
}

Content.propTypes = {
	classes: PropTypes.object.isRequired,
} as any;

export default Content;

