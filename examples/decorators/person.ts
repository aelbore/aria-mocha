
export const Watch = (prop: string) => {
  return (target: any, propertyName: string) => {
    if (!target.constructor.props) {
      target.constructor.props = {}
    } 
    target.constructor.props[prop] = propertyName
  }
}

export class Person {
  public static props
  private _name: string

  constructor() {
    /// @ts-ignore
    const propKeys = Object.keys(this.constructor.props)
    propKeys.forEach(propKey => {
      const descriptor = Object.getOwnPropertyDescriptor(this.constructor.prototype, propKey)
      Object.defineProperty(this, propKey, {
        ...descriptor, 
        set(value) {
          descriptor.set.call(this, value)
          this[this.constructor.props[propKey]]()
        }
      })
    })
  }

  get name() {
    return this._name
  }

  set name(value: string) {
    this._name = value
  }

  @Watch('name')
  onPropertyChanged() { }

}
