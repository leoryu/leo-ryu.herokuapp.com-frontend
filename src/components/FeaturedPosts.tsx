import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { ContentData } from './Content';
import { Unixtime2Date } from './TimeConvert';
import { CardActionArea } from '@material-ui/core';

const styles = (theme: Theme) =>
    createStyles({
        mainFeaturedPost: {
            backgroundColor: theme.palette.grey[800],
            color: theme.palette.common.white,
            marginBottom: theme.spacing.unit * 4,
        },
        mainFeaturedPostContent: {
            padding: `${theme.spacing.unit * 6}px`,
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
            <Link
                component={props => <RouterLink {...props} to={"/paper/" + posts[0].id} />}
                underline="none"
            >
                <Paper className={classes.mainFeaturedPost}>
                    <Grid container>
                        <Grid item>
                            <div className={classes.mainFeaturedPostContent}>
                                <Typography
                                    component="h1"
                                    variant="h3"
                                    color="inherit"
                                    gutterBottom
                                >
                                    {posts[0].title}
                                </Typography>
                                <Hidden xsDown>
                                    <Typography variant="h5" color="inherit" paragraph>
                                        {posts[0].abstract}
                                    </Typography>
                                </Hidden>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            </Link>
            {/* End main featured post */}
            {/* Sub featured posts */}
            <Grid container spacing={40} className={classes.cardGrid}>
                {posts.slice(1).map(post => (
                    <Grid item key={post.title} xs={12} md={12}>
                        <Link
                            component={props => <RouterLink {...props} to={"/paper/" + post.id} />}
                            underline="none"
                        >
                            <CardActionArea>

                                <Card className={classes.card}>
                                    <div className={classes.cardDetails}>
                                        <CardContent>
                                            <Typography component="h2" variant="h5">
                                                {post.title}
                                            </Typography>
                                            <Typography variant="subtitle1" color="textSecondary" paragraph>
                                                Abstract: {post.abstract}
                                            </Typography>
                                            <Typography variant="subtitle1" color="textSecondary">
                                                {Unixtime2Date(post.created_at)}
                                            </Typography>
                                        </CardContent>
                                    </div>
                                    <Hidden xsDown>
                                        <CardMedia
                                            image=""
                                            title="Image title"
                                        />
                                    </Hidden>
                                </Card>
                            </CardActionArea>
                        </Link>
                    </Grid>
                ))}
            </Grid> {/* End sub featured posts */}
        </React.Fragment >
    );
}

FeaturedPosts.propTypes = {
    classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(FeaturedPosts);

