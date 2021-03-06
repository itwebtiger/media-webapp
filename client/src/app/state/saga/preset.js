import { all, call, take, fork, put, select } from 'redux-saga/effects'
import serializeError from 'serialize-error'

import Preset from 'models/preset'
import { actions, types, selectors } from 'state/interface'

import { addToast } from './toast'

const createLoop = function*() {
  while (true) {
    const action = yield take(types['PRESET/CREATE'])

    try {
      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const { preset, identifier } = action.payload

      const newPreset = yield call(
        Preset.create,
        { preset, identifier },
        session.token
      )

      yield all([
        put(actions.createPresetCompleted({
          preset: newPreset,
          identifier
        })),
        fork(addToast, {
          type: 'success',
          message: 'Preset created.'
        })
      ])
    } catch (e) {
      yield put(actions.createPresetFailed(serializeError(e)))
      continue
    }
  }
}

const deleteLoop = function*() {
  while (true) {
    const action = yield take(types['PRESET/REMOVE'])

    try {
      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const { preset, identifier } = action.payload

      const destroyed = yield call(
        Preset.deletePreset,
        { preset, identifier },
        session.token
      )

      if (!destroyed) {
        throw new Error('Cannot delete preset')
      }

      yield all([
        put(actions.deletePresetCompleted({ preset, identifier })),
        put(actions.hideDialog({ dialog: 'ConfirmDeletePresetDialog' })),
        fork(addToast, {
          type: 'success',
          message: 'Preset deleted.'
        })
      ])
    } catch (e) {
      yield put(actions.deletePresetFailed(serializeError(e)))
      continue
    }
  }
}

const getLoop = function*() {
  while (true) {
    const action = yield take(types['PRESET/GET'])

    try {
      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const { contentType, identifier } = action.payload

      const preset = yield call(Preset.get, session.token, identifier, contentType)
      yield put(actions.getPresetCompleted({ preset, identifier }))
    } catch (e) {
      yield put(actions.getPresetFailed(serializeError(e)))
      continue
    }
  }
}

const updateLoop = function*() {
  while (true) {
    const action = yield take(types['PRESET/UPDATE'])

    try {
      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const { preset } = action.payload

      const newPreset = yield call(Preset.update, session.token, preset)

      yield all([
        put(actions.updatePresetCompleted({
          preset: newPreset,
          identifier
        })),
        fork(addToast, {
          type: 'success',
          message: 'Preset updated.'
        })
      ])
    } catch (e) {
      yield put(actions.updatePresetFailed(serializeError(e)))
      continue
    }
  }
}


export default function*() {
  yield take('@@INITIALIZED')
  yield fork(createLoop)
  yield fork(deleteLoop)
  yield fork(getLoop)
  yield fork(updateLoop)
}
