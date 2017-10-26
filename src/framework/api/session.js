import Base from './_base'
import {debug} from '@kobiton/core-util'

const searchTypeEnum = {
  STATE: 'state',
  TYPE: 'type',
  PLATFORM: 'platform',
  USERID: 'userId',
  KEYWORD: 'keyword',
  PAGE: 'page',
  STARTDATE: 'startDate',
  ENDDATE: 'endDate'
}

class Session extends Base {

  async getSessions() {
    return await this.get({
      path: 'sessions'
    })
  }

  async filterSessionsBySingleInput(searchType, searchData) {
    if (searchTypeEnum.hasOwnProperty(searchType.toUpperCase())) {
      const [sessionInfo] = await this.get({
        path: `sessions?${searchType}=${searchData.toUpperCase()}`
      })
      return sessionInfo
    }
    debug.error(`Invalid search type: ${searchType}`)
    return
  }

  async filterSessionsByMultiInput(searchTypes) {
    let path = 'sessions?'
    let subPath = ''
    Object.keys(searchTypes).forEach((type) => {
      let value = searchTypes[type]
      if (searchTypeEnum.hasOwnProperty(type.toUpperCase())) {
        subPath = `${type}=${value.toString().toUpperCase()}&`
        path = path.concat(subPath)
      }
    })

    const [sessionInfo] = await this.get({
      path: path.substring(0, path.length - 1)
    })
    return sessionInfo
  }
}

export default new Session()