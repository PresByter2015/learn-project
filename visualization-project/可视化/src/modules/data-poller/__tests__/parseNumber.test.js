import expect from 'expect'
import NumberFormat from '../numberFormat'

describe('data-poller number', () => {
  it('is thousand format', function () {
    expect(NumberFormat.isThousandFormat('11,111.000')).toEqual(true)
    expect(NumberFormat.isThousandFormat('11111.000')).toEqual(false)
    expect(NumberFormat.parse('11,111.000')).toEqual(11111)
  })
})
