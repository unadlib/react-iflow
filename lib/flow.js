export default (selector) => {
  return (TargetComponent) => {
    class Species extends TargetComponent {
      constructor (...args){
        super(...args)
        this.props.store.__pipe__.on(
          (...args) => {
            console.log(...args)
            this.forceUpdate()
          }
        )
        // this.props.store.__pipe__.on((...args)=>{
        //   console.log(thisargs.slice(1,-2))
        // })
      }
    }
    return Species
  }
}