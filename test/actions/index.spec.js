import { expect } from 'chai'
import * as types from '../../js/constants/ActionTypes'
import * as actions from '../../js/actions'
import BillingAPI, { BILLING_API } from '../../js/middleware/api/billing'

describe('Action Creator', () => {
  it('月の変更をキャッチ', () => {
    expect(actions.changeYearMonth('05')).to.deep.equal({
      type: types.BILLING_INFO_CHANGE,
      payload: {
        index: "05"
      }
    })
  })
})

