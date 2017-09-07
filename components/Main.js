var Main = new Snegyok('Main', {
	showTitle: true,
	title: 'Main title',
	num1: 10,
	num2: 20,
	description: {
		name: 'New app',
		date: 'nedavno'
	},

	template: `
		<Header class="bg2"></Header>

		{: (5 - 5) + num1 :}
		{: 5 + (num1 * 5) + num2 :}
		{: 6 % 5 :}
		{: 5 / 5 :}

		{# Comment  number 1 .... some text and dots      #}
		
		{#
			Comment  number 2
		#}

		{*if showTitle*}
			<h2>{*title*} {: 5 / 5 + (20 * 20) :}</h2>
		{*endif*}

		<p>Description:</p>
		<ul>
			{*obj description*}
				<li>{*prop*} - {*val*}</li>
			{*endobj*}
		</ul>


		<Content class="bg2"></Content>
	`
});
