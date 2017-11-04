# Snegyok Javascirpt Template Engine

Trying to create my own javascript template engine. It's can be used in conjunction with backend. It's workring like php template engine "<?php ... ?>". Enjoy the snow.

## Hello World!

```
// in some.js
var Main = new Snegyok('Main', {
  greet: 'Hello World!'
  template: `
    {*greet*}
  `
});

// in some.html:
<Main></Main>
```

### You can create nested components

```
// in some.js
var Hello = new Snegyok('Hello', {
  greet: 'Hello World!'
});

var Main = new Snegyok('Main', {
  template: `
    <Hello></Hello>
  `
});

// in some.html:
<Main></Main>
```


## Another features

### Objects
```
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
```

### Arrays
```
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
```

### Conditions
```
var newInstance = new Snegyok('NewInstance', {
  title: 'Title',
  template: `
    {*if showTitle*}
      <h2>{*title*}</h2>
    {*endif*}
  `
}
```

### Expressions
```
var newInstance = new Snegyok('NewInstance', {
  num: 4,
  template: `
    {: num * 5 / 5 + (20 * 20) :}
  `
}
```

### Comments
```
{# This is comment #}
```

## Authors

* **Ruslan Timurziyev** - [github.com/sawuer](https://github.com/sawuer)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details