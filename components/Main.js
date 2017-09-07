var Main = new Snegyok('Main', {
	showTitle: true,

	title: 'Main title',

	description: {
		name: 'New app',
		date: '"nedavno"'
	},

	template: `
		{: 5 / 5 + (20 * 20) :}
		{: 5 * 5 :}
		{: 5 - 5 :}
		{: 5 + 5 :}
		{: 6 % 5 :}
		<Header class="bg2"></Header>

		{# Comment  number 1 .... some text and dots      #}
		
		{#
			Comment  number 2
		#}

		{*if showTitle*}
			<h1>{*title*}</h1>
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
