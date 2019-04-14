import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import Blog from '../src/Blog'
import Content from '../src/components/Content'

storiesOf('Blog', module)
	.add('Blog', () => <Blog />);

storiesOf('Content', module).add('Content', () => <Content />);

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
