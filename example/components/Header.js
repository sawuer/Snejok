var Header = new Snegyok('Header', {
	title: 'Header',
	text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, ipsam!',
	nav: ['About', 'FAQ', 'Contacts'],
	user: { name: 'Vasya', age: 21 },
	template: `
		<h1>{*title*}</h1>
		<p>{*text*}</p>
		<ul>
			{*for nav*}
				<li>{*}</li>
			{*endfor*}
		</ul>
		<ul>
			{*obj user*}
				<li>{$}. {*prop*} - {*val*}</li>
			{*endobj*}
		</ul>
	`
});
