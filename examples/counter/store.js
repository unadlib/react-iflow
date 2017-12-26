import iFlow from 'iflow'

const store = iFlow({
  count: {
    add: function (number) {
      this.arr.push(number)
    },
    calculate: (number, self) => {
      self.counter += number
    },
    counter: 0,
    arr: [1, 2, 3, 4],
  }
}).create()

export default store