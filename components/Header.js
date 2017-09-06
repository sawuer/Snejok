var Header = new Snegyok('Header', {
	title: 'Header',
	text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, ipsam!',
	
	nav: ['About', 'FAQ', 'Contacts'],
	
	user1: { name: 'Vasya', age: 21 },
	user2: { name: 'Nevasya', age: 23 },
	
	template: `

		<h2>{*title*}</h2>
		<p>{*text*}</p>
		<ul>
			{*for nav*}
				<li><a href="">{*}</a></li>
			{*endfor*}
		</ul>

		<ul>
			{*obj user1*}
				<li>{*prop*} - {*val*}</li>
			{*endobj*}
		</ul>

		<ul>
			{*obj user2*}
				<li>{*prop*} - {*val*}</li>
			{*endobj*}
		</ul>

	`
});
