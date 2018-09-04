import 'phaser';

import { RootScene } from './root';

const config = {
	type: Phaser.AUTO,
	parent: 'over-there',
	width: 800,
	height: 600,
	scene: [ RootScene ],
};

const game = new Phaser.Game(config);

