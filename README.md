# Snejok

Backend side Javascript template engine

## Hello World!

```
// in some.js
var Main = new Snejok('Main', {
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
var Hello = new Snejok('Hello', {
  greet: 'Hello World!'
});

var Main = new Snejok('Main', {
  template: `
    <Hello></Hello>
  `
});

// in some.html:
<Main></Main>
```

## Features

### Objects
```
var newInstance = new Snejok('NewInstance', {
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
var newInstance = new Snejok('NewInstance', {
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
var newInstance = new Snejok('NewInstance', {
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
var newInstance = new Snejok('NewInstance', {
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

## Author

* **Ruslan Timurziyev** - [github.com/sawuer](https://github.com/sawuer)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details