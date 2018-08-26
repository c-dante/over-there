import { Scene, Geom } from 'phaser';

const card = ({
	gfx,
	rect = new Geom.Rectangle(-150/2, -200/2, 150, 200),
} = {}) => {
	// Draw the shape
	gfx.lineStyle(2, 0x0000FF);
	gfx.fillStyle(0xFF0000);
	gfx.fillRectShape(rect);
	gfx.strokeRectShape(rect);

	// Uhhhh
	gfx.setInteractive(rect, Geom.Rectangle.Contains);
	console.log(gfx);

	return { rect, gfx };
};

export class RootScene extends Scene {
	constructor() {
		super({ key: 'RootScene' });
	}

	create() {
		this.c = card({
			gfx: this.add.graphics(),
		});

		this.input.on('pointerover', (ptr, obj) => {
			console.log(ptr, obj);
		});
	}

	update() {
		const { worldX, worldY } = this.input.activePointer;
		this.c.gfx.rotation += 0.01;
		this.c.gfx.setPosition(worldX, worldY);
	}
}

export default (phaser) => {
	phaser.scene.start('RootScene');
};

