var ComponentOne = new Snegyok('#temp1', {
	title: 'Hello world',
	text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, ipsam!',
	list: [787, 'some2', 'some3', 'some4'],
	list2: ['somelist1', 'somelist2', 'somelist3', 'somelist4', 'somelist6', 'somelist2', 'somelist3'],
});



var ComponentTwo = new Snegyok('#temp2', {
	name: 'Sowyer',
	age: 21,
	music: ['some1', 'some2']
});


setTimeout(function() {
	ComponentOne.data.title = 'Hello 2';
	ComponentOne.data.list = ['some1','some2'];
	ComponentOne.render();
}, 1000);



