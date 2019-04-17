import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import Blog from '../src/Blog'
import {MemoryRouter} from 'react-router-dom'
import Content from '../src/components/Content'
import FeaturedPosts from '../src/components/FeaturedPosts'

const posts = [
	{
		id: "abc",
		title: "Hello",
		abstract: "abstract World!",
		content: "# World!",
		created_at: 0,
		edited_at: 0,
	},
	{
		id: "124",
		title: "你好",
		abstract: "世界abstract",
		content: "# 世界!",
		created_at: 0,
		edited_at: 0,
	},
]

storiesOf('Blog', module)
	.add('Blog', () => <Blog />);

storiesOf('Content', module)
	.add('Content', () => <Content
		contentData={posts[1]}
	/>);

storiesOf('FeaturedPosts', module)
.addDecorator(story => (
	<MemoryRouter initialEntries={['/paper/:id']}>{story()}</MemoryRouter>
  ))
	.add("Posts", () => <FeaturedPosts posts={posts} />)

storiesOf('Welcom', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
	.add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
	.add('with some emoji', () => (
		<Button onClick={action('clicked')}>
			<span role="img" aria-label="so cool">
				😀 😎 👍 💯
      </span>
		</Button>
	));

