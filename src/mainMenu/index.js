import { h } from 'preact';

const render = (props, state, context) => {
	console.debug({ props, state, context });

	// @todo: 'classes' mixin...?
	const classes = ['main-menu'];
	if (props.class) {
		classes.push(props.class);
	}

	return h('div', {
		class: classes.join(' '),
	}, [
		h('h1', {}, 'Hello world!'),
		h('button', {
			onClick(evt) {
				console.debug('YOU CLICKED ME!', evt, this);
			},
		}, [
			'Click Me',
		]),
	]);
};

export default render;
