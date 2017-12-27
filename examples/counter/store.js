import iFlow from 'iflow'


const store = iFlow({
  c:[],
  calculate(){
    this.c.push(1)
    console.log(this.c)
  }
})
  .create()

export default store