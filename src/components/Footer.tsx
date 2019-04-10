import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
//import Button from '@material-ui/core/Button';

const styles = (theme: Theme) =>
	createStyles({
		footer: {
			backgroundColor: theme.palette.background.paper,
			marginTop: theme.spacing.unit * 8,
			padding: `${theme.spacing.unit * 6}px 0`,
		},
	});


export interface Props extends WithStyles<typeof styles> { }

function Footer(props: Props) {
	const { classes } = props;

	return (
			<footer className={classes.footer}>
				<Typography variant="h6" align="center" gutterBottom>
					Footer
        </Typography>
				<Typography variant="subtitle1" align="center" color="textSecondary" component="p">
					Something here to give the footer a purpose!
        </Typography>
			</footer>
	);
}

Footer.propTypes = {
	classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(Footer);

