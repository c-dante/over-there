import 'phaser';
import './index.css';

import DawgScene from './dawg';
// import { RootScene } from './root';
// import ui from './ui';

const config = {
	type: Phaser.AUTO,
	parent: 'over-there',
	width: 800,
	height: 600,
	scene: [ DawgScene ],
};

const game = new Phaser.Game(config);

// Run the UI
// ui(document.body, game);
