import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import Bar from './components/Bar';
import Papers from './components/Papers';
import Paper from './components/Paper';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import Editor from './components/Editor';
import { PaperStruct, GetApi } from './components/Public';

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
    papers: PaperStruct[];
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
    render() {
        const { classes } = this.props;
        return (
            <Router>
                <CssBaseline />
                <div className={classes.layout}>
                    <Bar />
                    <main>
                        <Route exact path="/" component={Papers} />
                        <Route path="/paper/:id" component={Paper} />
                        <Route path="/admin/signin" component={SignIn} />
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

