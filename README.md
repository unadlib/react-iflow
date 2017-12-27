# React iFlow
The connector for React and iFlow state management.

### Features
* Least possible time selector
* Automatic array diff
* Full support comprehensive selector

### Install
```bash
yarn add react-iflow
//or
npm install --save react-iflow
```
### Getting started
To Edit
### The Gist
```javascript
import iFlow from 'iflow'

const pipe = iFlow({
  calculate: function(number) {
    this.counter += number
  },
  counter: 0,
})

```
### API

### License

---
MIT