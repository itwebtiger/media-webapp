import delay from 'delay'
import { call, fork, put, take } from 'redux-saga/effects'

import { actions, types } from 'state/interface'

const loop = function*() {
  while (true) {
    yield take(types['LAYOUT/CLOSE'])

    yield call(delay, 500)

    yield put(actions.destroySession())
  }
}

export default function*() {
  yield take('@@INITIALIZED')

  yield fork(loop)
}
