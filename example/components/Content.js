var Content = new Snegyok('Content', {
	title: 'Title',
	text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, ipsam!',
	data1: ['some1', 'some2', 'some3', 'some4', 'some5'],
	data2: ['somelist1', 'somelist2', 'somelist3', 'somelist4', 'somelist6', 'somelist2', 'somelist3'],
	template: `
		<p>{*text*}</p>
		<ul>
			{*for data1*}
				<li>{$}. {*}</li>
			{*endfor*}
		</ul>

		<ul>
			{*for data2*}
				<li>{*title*} {: 5 * 5 :}: {*}</li>
			{*endfor*}
		</ul>
	`
});
