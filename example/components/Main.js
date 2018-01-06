var Main = new Snejok('Main', {
	showTitle: true,
	title: 'Main title',
	num1: 10,
	num2: 20,
	description: {
		name: 'new app',
		date: 'nedavno'
	},

	template: `
		<Header class="bg2"></Header>

		{: (5 * 5) + num1 :}
		<br>
		{: 5 + (num1 * 5) + num2 :}
		<br>
		{: ((6 % 5)) :}
		<br>
		{: 5 / 5 :}

		{# Comment  number 1 .... some text and dots      #}
		
		{#
			Comment  number 2
		#}

		<br>

		{*if showTitle*}
			{*title*} {: 5 / 5 + (20 * 20) :}
		{*endif*}

		<ul>
			{*obj description*}
				<li>{*prop*} - {*val*}</li>
			{*endobj*}
		</ul>


		<Content class="bg2"></Content>
	`
});



