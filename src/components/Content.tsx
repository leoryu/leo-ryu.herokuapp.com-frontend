import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
//import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
//import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ReactMarkdown from 'react-markdown';
import * as post1 from './post1.md'

const posts = [String(post1)];

function Content() {
	return (
		<Grid item xs={12} md={12}>
			<Typography variant="h6" gutterBottom>
				From the Firehose
              </Typography>
			<Divider />
			{
				posts.map(post => (
					<ReactMarkdown source={post} />
				))
			}
		</Grid>
	);
}

Content.propTypes = {
	classes: PropTypes.object.isRequired,
} as any;

export default Content;

