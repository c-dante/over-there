import { Scene } from 'phaser';
import dawgData from './data.csv';

console.debug(dawgData);






/**
 * Gameplay flow:
 * https://mermaidjs.github.io/mermaid-live-editor/#/view/eyJjb2RlIjoiZ3JhcGggTFJcbkFbQ2hvb3NlIFBsYXllcnNdIC0tPiBCO1xuQltTaHVmZmxlIHJlbWFpbmluZyBjYXJkc10gLS0-IEM7XG5DW1BsYXkgdW50aWwgbm8gY2FyZHMgcmVtYWluXSAtLT4gRDtcbkR7U2NvcmUgdXAufSIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In19
 */




/**
 * Scene to play dawg
 * @see: https://hackmd.io/s/ryiNjY5Ym
 */
export default class DawgScene extends Scene {
	constructor() {
		super({ key: 'DawgScene' });
	}

	create() {

	}
};
