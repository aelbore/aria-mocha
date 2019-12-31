import * as assert from 'assert'

export interface ExpectAssertion {
  toBeTrue: () => void;
  toBeFalse: () => void;
  toBeUndefined: () => void;
  toBeDefined: () => void;
  toBeCalled: () => void;
  notToBeCalled: () => void;
  equal: (expected: any) => void;
  notEqual: (expected: any) => void;
  toThrow: (errorMessage: string) => void;
}

export function expect(value: any): ExpectAssertion {
  return {
    toBeTrue() {
      assert.strictEqual(value, true)
    },
    toBeFalse() {
      assert.strictEqual(value, false)
    },
    toBeDefined() {
      assert.ok(value)
    },
    toBeUndefined() {
      assert.strictEqual(value, undefined)
    },
    toBeCalled() {
      assert.strictEqual(value, true)
    },
    notToBeCalled() {
      assert.strictEqual(value, false)
    },
    equal(expected: any) {
      assert.strictEqual(value, expected)
    },
    notEqual(expected: any) {
      assert.notStrictEqual(value, expected)
    },
    toThrow(errorMessage: string) {
      try {
        value()
      } catch(error) {
        assert.throws(() => {
          throw new Error(error)
        }, errorMessage)
      }
    }
  }  
}
