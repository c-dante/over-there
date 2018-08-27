import { Scene, Geom } from 'phaser';

// Rearrange every child to be centered to width/height
const centerChildren = (container, dx, dy) => container.list.forEach(obj => obj.setPosition(
	obj.x - dx,
	obj.y - dy,
));

// Makes a card
const makeCard = ({
	scene,
	title = '[title]',
	desc = '[desc]',
	// Position args
	x = 0, y = 0, width = 150, height = 200,
	// Ugh
	textStyle = {
		color: '#000',
		stroke: '#000',
		fontSize: '16px',
	},
} = {}) => {
	const rect = new Geom.Rectangle(0, 0, width, height);

	// Render the rect
	const gfx = scene.add.graphics({
		lineStyle: { color: 0xFF0000, width: 2 },
		fillStyle: { color: 0xFF00FF },
	});
	gfx.fillRectShape(rect);
	gfx.strokeRectShape(rect);
	gfx.setInteractive(rect, Geom.Rectangle.Contains);

	// Render the text
	const titleTxt = scene.add.text(0, 0, title, textStyle);
	const descTxt = scene.add.text(0, height / 2, desc, textStyle);

	// Wrap it all into a container
	const card = scene.add.container(x, y, [ gfx, titleTxt, descTxt ]);

	// Center it maybe?
	centerChildren(card, width / 2, height / 2);

	// Just give it all back -- card is the important thing
	return { card, gfx, rect, titleTxt, descTxt };
};

export class RootScene extends Scene {
	constructor() {
		super({ key: 'RootScene' });
	}

	create() {
		this.c = makeCard({
			scene: this,
		});

		this.input.on('pointerdown', (ptr, obj) => {
			console.log(ptr, obj);
		});
	}

	update() {
		const { worldX, worldY } = this.input.activePointer;
		this.c.card.rotation += 0.05;
		this.c.card.setPosition(worldX, worldY);
	}
}

export default (phaser) => {
	phaser.scene.start('RootScene');
};

