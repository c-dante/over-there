import { Scene, Geom } from 'phaser';
import cards from './deck/cards';
import { drag } from './util';

const genDeck = ({ size = 20} = {}) => new Array(size).fill(undefined).map(
	(_, i) => cards[Math.floor(Math.random() * cards.length) % cards.length]
);

// Rearrange every child to be centered to width/height
const move = (dx, dy) => obj => obj.setPosition(obj.x - dx, obj.y - dy);
const centerChildren = (container, dx, dy) => container.list.forEach(move(dx, dy));

// Makes a card
const makeCard = ({
	scene,
	title = '[title]',
	desc = '[desc]',
	// Position args
	x = 0, y = 0, width = 300, height = 450,
	// Ugh
	textStyle = {
		color: '#FFF',
		stroke: '#FFF',
		strokeThickness: 1,
		fontSize: '24px',
		wordWrap: { width },
	},
} = {}) => {
	const rect = new Geom.Rectangle(0, 0, width, height);

	// Render the rect
	const gfx = scene.add.graphics({
		lineStyle: { color: 0x0000FF, width: 5 },
		fillStyle: { color: 0x333333 },
	});
	gfx.fillRectShape(rect);
	gfx.strokeRectShape(rect);
	const hilight = ({ color = 0xFF0000 } = {}) => {
		gfx.lineStyle(5, color)
		gfx.strokeRectShape(rect);
	};
	const unHilight = () => hilight({ color: 0x0000FF });

	// Render the text
	const titleTxt = scene.add.text(0, 0, title, textStyle);
	const descTxt = scene.add.text(0, height / 4, desc, textStyle);

	// Wrap it all into a container
	const card = scene.add.container(x, y, [ gfx, titleTxt, descTxt ]);

	// Drew it all relative to top left, shift to center
	centerChildren(card, width / 2, height / 2);

	// Add the data to the container
	card.setData('title', title);
	card.setData('desc', desc);
	card.setData('actions', { hilight, unHilight });

	// Interactive via the rect -- also need to center the rect
	const hitRect = Geom.Rectangle.Clone(rect);
	move(width / 2, height / 2)(hitRect);
	card.setInteractive(hitRect, Geom.Rectangle.Contains);

	// Just give it all back -- card is the important thing
	return {
		card, gfx, rect, titleTxt, descTxt,
		hilight, unHilight,
	};
};

const rand = n => (Math.random() > 0.5 ? 1 : -1) * Math.random() * n;

export class RootScene extends Scene {
	constructor() {
		super({ key: 'RootScene' });
	}

	create() {
		// Build the deck
		this.deck = genDeck({ size: 20 }).map((card, i) => {
			const c = makeCard({
				...card,
				scene: this,
			});

			c.card.setScale(0.5);
			c.card.setPosition(
				this.sys.game.config.width / 2 + rand(20),
				this.sys.game.config.height / 2 + rand(20),
			);

			return c;
		});

		this.input.on('pointerdown', (ptr, objs) => {
			objs.forEach(obj => {
				if (!this.data.has('drag')) {
					this.data.set('drag', {
						offsetX: ptr.x - obj.x, offsetY: ptr.y - obj.y, obj
					});
				}
				this.children.bringToTop(obj);
			});
		});

		this.input.on('pointerup', (ptr, objs) => {
				this.data.remove('drag');
		});

		this.input.on('pointerover', (ptr, objs) => {
			objs.forEach(c => {
				c.getData('actions').hilight();
			});
		});

		this.input.on('pointerout', (ptr, objs) => {
			objs.forEach(c => {
				c.getData('actions').unHilight();
			});
		});

		this.input.on('pointermove', (ptr, objs) => {
			if (this.data.has('drag')) {
				const d = this.data.get('drag');
				d.obj.setPosition(ptr.x - d.offsetX, ptr.y - d.offsetY);
			}
		});
	}

	update() {
		// Track which card is under the mouse (?)
		const { worldX, worldY } = this.input.activePointer;
	}
}

