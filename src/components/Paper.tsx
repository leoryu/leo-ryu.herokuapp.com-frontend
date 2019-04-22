import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ReactMarkdown from 'react-markdown';
import Axios, { AxiosError } from 'axios';
import { match } from 'react-router-dom';
import { PaperStruct, GetApi } from './Public';
import CodeBlock from './CodeBlock';

const styles = () =>
	createStyles({});

interface MatchParameters {
	id: string;
}

interface Props extends WithStyles<typeof styles> {
	match: match<MatchParameters>;
}
interface State {
	paper: PaperStruct;
}

class Paper extends React.Component<Props, State> {
	state: State = {
		paper: {
			id: "",
			title: "",
			content: "",
			abstract: "",
			created_at: 0,
			edited_at: 0,
		},
	};
	componentDidMount() {
		this.getPaper();
	}
	getPaper = async () => {
		Axios.get<PaperStruct>(GetApi() + '/api/papers/' + this.props.match.params.id)
			.then(res => {
				this.setState({ paper: res.data });
			})
			.catch((err: AxiosError) => {
				console.log(err.response);
			});
	}
	render() {
		const { paper } = this.state;
		return (
			<Grid item xs={12} md={12}>
				<Typography variant="h3" gutterBottom>
					{paper.title}
				</Typography>
				<Divider />
				<ReactMarkdown source={paper.content} renderers={{ code: CodeBlock }} />
			</Grid>
		)
	}
}

(Paper as React.ComponentClass<Props>).propTypes = {
	classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(Paper);

