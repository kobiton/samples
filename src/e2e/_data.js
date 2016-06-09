import moment from 'moment'

export const actual = {
  id: '0',
  createdAt: null,
  endedAt: null,
  duration: null,
  endState: null,
  udid: null,
  deviceName: null
}

export const expected = {
  createdAt: moment(),
  endedAt: null,
  duration: null
}
