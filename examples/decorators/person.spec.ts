import { expect } from 'chai'
import { Person, Watch } from './person'

import * as sinon from 'sinon';

describe('Person', () => {
  let person: Person

  beforeEach(() => {
    person = new Person()
  })

  afterEach(() => {
    person = null
  })

  it('should set the property [name]', () => {
    person.name = 'Jane'
    expect(person.name).eq('Jane')
  })

  it('should get the property [name]', () => {
    expect(person.name).eq(undefined)
  })

  it('should call onPropertyChanged', () => {
    const onChanged = sinon.spy(person, 'onPropertyChanged')

    person.name = 'Jane'
    expect(onChanged.called).to.true
  })

  it('should set the initial value of props', () => {
    class PersonFake {
      public static props
      onChanged() { }
    }

    Watch('name')(PersonFake, 'onChanged')

    /// @ts-ignore
    expect(PersonFake.constructor.props['name']).to.eq('onChanged')
  })

  it('should not set the initial value of props', () => {
    class PersonFake {
      public static props = {}
      onChanged() { }
    }

    Watch('name')(PersonFake, 'onChanged')
    /// @ts-ignore
    expect(PersonFake.constructor.props['name']).to.eq('onChanged')    
  })

})