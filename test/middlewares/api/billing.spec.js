import { expect } from 'chai'
import sinon from 'sinon'
import nock from 'nock'
import * as types from '../../../js/constants/ActionTypes'
import BillingAPI, { BILLING_API } from '../../../js/middleware/api/billing'

const createFakeStore = fakeData => ({
  getState() {
    return fakeData
  }
})

const dispatchWithStoreOf = (storeData, action, fn) => {

  const dispatch = BillingAPI(createFakeStore(storeData))(fn)

  // Middlewareを実行します
  return dispatch(action)
};

describe('Middleware', () => {

  it('通信処理の成功確認', () => {

    // テストで使用するActionを作成します
    const action = {
      type: BILLING_API,
      payload: {
        types: [ types.BILLING_REQUEST, types.BILLING_SUCCESS, types.BILLING_FAILURE ],
        endpoint: `http://localhost:3000/billing?month=05&year=2020`
      }
    }

     // 通信処理をモックにします
    nock('http://localhost:3000/')
      .get('/billing?month=05&year=2020')
      .reply(200, {
        title: 'test title1'
      })

    // スパイを作成します
    const spy = sinon.spy()

    // Middlewareを実行するヘルパーファンクションを実行します
    return dispatchWithStoreOf({}, action, spy)
          .then(function(res) {

            // Middleware内でnextが2回呼び出されたことを確認します
            expect(spy.calledTwice).to.be.true

            // nextが次の引数で呼ばれたことを確認します
            expect(spy.withArgs({
              type: types.BILLING_REQUEST
            }).calledOnce).to.be.true

            // nextが次の引数で呼ばれたことを確認します
            expect(spy.withArgs({
              type: types.BILLING_SUCCESS,
              payload: {
                data: {
                  title: 'test title1'
                }
              }
            }).calledOnce).to.be.true
          })
  })
})