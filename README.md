# Snegyok Javascirpt Template Engine

Trying to create javascript template engine.

## Hello World!

'''
var Main = new Snegyok('Main', {
	greet: 'Hello World!'
	template: `
		{*greet*}
	`
});
'''

## Another features

### Objects
'''
var newInstance = new Snegyok('NewInstance', {
	user: { name: 'John', age: 21 },
	template: `
		<ul>
			{*obj user1*}
				<li>{$ + 1}. {*prop*} - {*val*}</li>
			{*endobj*}
		</ul>
	`
}
'''

### Arrays
'''
var newInstance = new Snegyok('NewInstance', {
	nav: ['About', 'FAQ', 'Contacts'],
	template: `
		<ul>
			{*for nav*}
				<li><a href="">{*}</a></li> 
			{*endfor*}
		</ul>
	`
}
'''

### Conditions
'''
var newInstance = new Snegyok('NewInstance', {
	title: 'Title',
	template: `
		{*if showTitle*}
			<h2>{*title*}</h2>
		{*endif*}
	`
}
'''

### Expressions
'''
var newInstance = new Snegyok('NewInstance', {
	num: 4,
	template: `
		{: num * 5 / 5 + (20 * 20) :}
	`
}
'''

### Comments
'''
{# This is comment #}
'''

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Ruslan Timurziyev** - *Initial work* - [PurpleBooth](https://github.com/sawuer)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details