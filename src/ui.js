import { h, render } from 'preact';

import MainMenu from './mainMenu';

export default (elt, game) => {
	console.debug('Hook in UI', elt, game);
	render(h(MainMenu, {
		class: 'ui',
	}), elt);
};
