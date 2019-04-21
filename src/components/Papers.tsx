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
import { CardActionArea } from '@material-ui/core';
import { PaperStruct, EmptyPaper, GetApi } from './Public';
import { ReactComponent } from '*.svg';
import { render } from 'react-dom';
import Axios, { AxiosError } from 'axios';

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

interface Props extends WithStyles<typeof styles> { }

interface State {
    papers: PaperStruct[];
}


class Papers extends React.Component<Props, State> {
    state: State = {
        papers: [
            EmptyPaper,
        ]
    }

    componentDidMount() {
        this.getPaper();
    }
    getPaper = () => {
        Axios.get<PaperStruct[]>(GetApi() + '/api/papers?limit=10&page=1&')
            .then(res => {
                this.setState({ papers: res.data });
            })
            .catch((err: AxiosError) => {
                console.log(err.response);
            });
    }

    render() {
        const { classes } = this.props;
        const { papers } = this.state;
        return (
            <React.Fragment>
                <Link
                    component={props => <RouterLink {...props} to={"/paper/" + papers[0].id} />}
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
                                        {papers[0].title}
                                    </Typography>
                                    <Hidden xsDown>
                                        <Typography variant="h5" color="inherit" paragraph>
                                            {papers[0].abstract}
                                        </Typography>
                                    </Hidden>
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                </Link>
                <Grid container spacing={40} className={classes.cardGrid}>
                    {papers.slice(1).map(paper => (
                        <Grid item key={paper.title} xs={12} md={12}>
                            <Link
                                component={props => <RouterLink {...props} to={"/paper/" + paper.id} />}
                                underline="none"
                            >
                                <CardActionArea>

                                    <Card className={classes.card}>
                                        <div className={classes.cardDetails}>
                                            <CardContent>
                                                <Typography component="h2" variant="h5">
                                                    {paper.title}
                                                </Typography>
                                                <Typography variant="subtitle1" color="textSecondary" paragraph>
                                                    Abstract: {paper.abstract}
                                                </Typography>
                                                <Typography variant="subtitle1" color="textSecondary">
                                                    {new Date(paper.created_at * 1000).toLocaleDateString()}
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
                </Grid>
            </React.Fragment >
        );
    }
}

(Papers as React.ComponentClass<Props>).propTypes = {
    classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(Papers);

