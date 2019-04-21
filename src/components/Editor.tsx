import React from 'react';
import PropTypes, { string } from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Axios, { AxiosError } from 'axios';
import { match } from 'react-router-dom';
import { PaperStruct, GetApi, TokenKey, EmptyPaper } from './Public';

const styles = (theme: Theme) =>
    createStyles({
        paper: {
            marginTop: theme.spacing.unit * 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
        },
        avatar: {
            margin: theme.spacing.unit,
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing.unit,
        },
        submit: {
            marginTop: theme.spacing.unit * 3,
        },
    });

interface Props extends WithStyles<typeof styles> {
    isModification: boolean;
    match: match<{ id: string }>;
}
interface State extends PaperStruct {
}

class Editor extends React.Component<Props> {
    state: State = EmptyPaper;

    onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (this.props.isModification) {
            this.modifyPaper();
        } else {
            this.createPaper();
        }
    }

    createPaper = () => {
        Axios.post(GetApi() + '/api/papers', this.state, {
            headers: { Authorization: localStorage.getItem(TokenKey) }

        })
            .catch((err: AxiosError) => {
                localStorage.removeItem(TokenKey);
                console.log(err.response);
            })
    }

    modifyPaper = () => {
        Axios.put(GetApi() + '/api/papers/' + this.props.match.params.id, this.state, {
            headers: { Authorization: localStorage.getItem(TokenKey) }

        })
            .catch((err: AxiosError) => {
                localStorage.removeItem(TokenKey)
                console.log(err.response)
            })
    }

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    componentDidMount() {
        if (this.props.isModification) {
            this.getPaper()
        }
    }

    getPaper = () => {
        Axios.get<PaperStruct>(GetApi() + '/api/papers/' + this.props.match.params.id)
            .then(res => {
                this.setState(res.data)
            })
            .catch((err: AxiosError) => {
                console.log(err.response)
            })
    }
    deletePaper = () => {
        Axios.delete(GetApi() + '/api/papers/' + this.props.match.params.id)
            .catch((err: AxiosError) => {
                console.log(err.response)
            })
    }

    render() {
        const { classes, isModification } = this.props;
        const { title, abstract, content } = this.state;
        return (
            <Grid>
                <Button
                    type="submit"
                    variant="contained"
                    disabled={!isModification}
                    onClick={() => this.deletePaper()}
                >
                    Delete
		        </Button>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Paper editor
                    </Typography>
                    <form className={classes.form} onSubmit={this.onSubmit}>
                        <FormControl margin="normal" required fullWidth>
                            <TextField
                                label="Title"
                                id="title"
                                name="title"
                                value={title}
                                onChange={this.onChange}
                                autoFocus
                            />
                        </FormControl>
                        <FormControl margin="normal" fullWidth>
                            <TextField
                                label="Abstract"
                                name="abstract"
                                id="abstract"
                                rows="4"
                                value={abstract}
                                onChange={this.onChange}
                                multiline
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <TextField
                                label="Content"
                                name="content"
                                id="content"
                                value={content}
                                onChange={this.onChange}
                                multiline
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Submit
						</Button>
                    </form>
                </Paper>
            </Grid>
        );
    }
}

(Editor as React.ComponentClass<Props>).propTypes = {
    classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(Editor);

