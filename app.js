var ComponentOne = new Snegyok('#temp1', {
	counter: 0,
	title: 'Hello world',
	text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, ipsam!',
	list: [787, 'some2', 'some3', 'some4'],
	list2: ['somelist1', 'somelist2', 'somelist3', 'somelist4', 'somelist6', 'somelist2', 'somelist3'],
});



var ComponentTwo = new Snegyok('#temp2', {
	name: 'Sowyer',
	age: 21,
	music: ['some1', 'some2'],
	show: false
});


setTimeout(function() {
	ComponentOne.change('title', 'Hello 2');
	ComponentOne.change('list', ['some1','some2']);
}, 500);
setTimeout(function() {
	ComponentOne.change('title', 'Hello 3');
	ComponentOne.change('list', ['some1','some2','some2']);
}, 1000);
setInterval(function() {
	// ComponentOne.data.counter += 1;
	// 	ComponentOne.render();
	ComponentOne.exec(function() {
		ComponentOne.data.counter += 1;
	});

}, 1000);


document.querySelector('#changeName').addEventListener('click', function() {
	setTimeout(function() {
		ComponentTwo.change('name', 'Ramona');
	}, 10);

});