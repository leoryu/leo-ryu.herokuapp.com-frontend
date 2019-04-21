import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = (theme: Theme) =>
    createStyles({
        toolbarMain: {
            borderBottom: `1px solid ${theme.palette.grey[300]}`,
        },
        toolbarTitle: {
            flex: 1,
        },
        toolbarSecondary: {
            justifyContent: 'space-evenly',
        },
    });

const sections = [
    'Blog',
    'Profile',
];

export interface Props extends WithStyles<typeof styles> { }

function Bar(props: Props) {
    const { classes } = props;

    return (
        <React.Fragment>
            <Toolbar className={classes.toolbarMain}>
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    className={classes.toolbarTitle}
                >
                    Leo's Blog
          </Typography>
            </Toolbar>
            <Toolbar variant="dense" className={classes.toolbarSecondary}>
                {/* {sections.map(section => (
                    <Typography color="inherit" noWrap key={section}>
                        {section}
                    </Typography>
                ))} */}
            </Toolbar>
        </React.Fragment>
    );
}

Bar.propTypes = {
    classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(Bar);

