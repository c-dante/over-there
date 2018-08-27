
// Card
const card = ({ ...props } = {}) => ({ ...props });

const location = ({ ...props } = {}) => ({
	...card(props),
	type: 'location',
});
const character = ({ ...props } = {}) => ({
	...card(props),
	type: 'character',
});

// Actions
const traverseCost = (cost) => ({ type: 'traverse', cost });
const encounter = (odds) => ({ type: 'encounter', odds });

// Instances
export default [
	// Locations -- array of objects mapped then spread
	...[
		{
			title: 'Dusty Road',
			desc: 'A stretch of road leading to the horizon.',
			actions: [
				traverseCost(1),
				encounter(0.1),
			],
		},
		{
			title: 'Backwater',
			desc: 'A common stopping place for merchants and travellers. A nearby water source prevents this crossroads from disappearing into the wastes.',
			actions: [],
		},
	].map(x => location(x)),

	// Characters
	...[
		{
			title: 'Herpa derp',
			desc: 'I just want to get this displaying now.',
			actions: [],
		}
	].map(x => character(x)),
];
