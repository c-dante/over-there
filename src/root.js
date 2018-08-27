import { Scene, Geom } from 'phaser';
import cards from './deck/cards';

const genDeck = ({ size = 20} = {}) => new Array(size).fill(undefined).map(
	(_, i) => cards[Math.floor(Math.random() * cards.length) % cards.length]
);

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
	x = 0, y = 0, width = 300, height = 450,
	// Ugh
	textStyle = {
		color: '#000',
		stroke: '#000',
		strokeThickness: 2,
		fontSize: '24px',
		wordWrap: { width },
	},
} = {}) => {
	const rect = new Geom.Rectangle(0, 0, width, height);

	// Render the rect
	const gfx = scene.add.graphics({
		lineStyle: { color: 0x0000FF, width: 5 },
		fillStyle: { color: 0xFF00FF },
	});
	gfx.fillRectShape(rect);
	gfx.strokeRectShape(rect);
	gfx.setInteractive(rect, Geom.Rectangle.Contains);

	// Render the text
	const titleTxt = scene.add.text(0, 0, title, textStyle);
	const descTxt = scene.add.text(0, height / 4, desc, textStyle);

	// Wrap it all into a container
	const card = scene.add.container(x, y, [ gfx, titleTxt, descTxt ]);

	// Center it maybe?
	centerChildren(card, width / 2, height / 2);

	// Just give it all back -- card is the important thing
	return { card, gfx, rect, titleTxt, descTxt };
};

const rand = n => (Math.random() > 0.5 ? 1 : -1) * Math.random() * n;

export class RootScene extends Scene {
	constructor() {
		super({ key: 'RootScene' });
	}

	create() {
		console.log(this);
		// Build the deck
		this.deck = genDeck().map((card, i) => {
			const c = makeCard({
				...card,
				scene: this,
			});

			c.card.setScale(0.5);
			c.card.setPosition(
				this.sys.game.config.width / 2 + rand(20),
				this.sys.game.config.height / 2 + rand(20),
			);
			// c.card.data.set('card', card);
		});

		//		this.input.on('pointerdown', (ptr, obj) => {
		//			console.log(ptr, obj);
		//		});
	}

	update() {
		const { worldX, worldY } = this.input.activePointer;
		// this.c.card.setPosition(worldX, worldY);
	}
}

export default (phaser) => {
	phaser.scene.start('RootScene');
};

