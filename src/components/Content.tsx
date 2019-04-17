import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import ReactMarkdown from 'react-markdown';

interface Props {
	contentData: ContentData;
}

export interface ContentData {
	id:string,
	title: string;
	abstract: string;
	content: string;
	created_at: number;
	edited_at: number;
}

function Content(props: Props) {
	const { contentData } = props;
	return (
		<Grid item xs={12} md={12}>
			<Typography variant="h3" gutterBottom>
				{contentData.title}
			</Typography>
			<Divider />
			<ReactMarkdown source={contentData.content} />
		</Grid>
	);
}

export default Content;

