var Content = new Snegyok('Content', {
	title: 'Content',
	text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, ipsam!',

	data1: ['some1', 'some2', 'some3', 'some4'],
	data2: ['somelist1', 'somelist2', 'somelist3', 'somelist4', 'somelist6', 'somelist2', 'somelist3'],
	
	template: `

		<h2>{*title*}</h2>
		<p>{*text*}</p>

		<ul>
			{*for data1*}
				<li><a href="">{*}</a></li>
			{*endfor*}
		</ul>

		<ul>
			{*for data2*}
				<li><a href="">{*title*} {: 5 * 5 :}: {*}</a></li>
			{*endfor*}
		</ul>
		
	`
});
