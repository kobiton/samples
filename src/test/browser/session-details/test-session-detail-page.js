import 'babel-polyfill'
import {assert} from 'chai'
import LoginPage from '../../../framework/page-objects/portal/intro/login'
import config from '../../../framework/config/test'
import SessionDetailsPage from '../../../framework/page-objects/portal/user/session-detail'
import SessionAPI from '../../../framework/api/session'
import faker from 'faker'
import {equalArrays} from '../../../framework/util'

const {username1: username, password1: password, portalUrl: portalUrl} = {...config}
let sessionDetailsPage
let loginPage
const newSessionName = faker.random.words(5)
const veryShortSessionName = 'abc'
const veryLongSessionName = faker.random.words(10)
const newSessionDescription = faker.random.words(20)
let sessionInfoFromAPI
let commandsFromAPI
let sessionInfo
let sessionID

describe('Verifying on session details page', () => {

  before(() => {
    loginPage = new LoginPage()
    loginPage.open()
    sessionDetailsPage = new SessionDetailsPage()
    loginPage.login(username, password)
  })

  beforeEach(async () => {
    if (!sessionID) {
      sessionID = (await SessionAPI.getSessions())[0].data[0].id
      sessionInfoFromAPI = (await SessionAPI.getASession(sessionID))[0]
      commandsFromAPI = await getAllCommandsFromAPI(sessionID)
    }
  })

  beforeEach(() => {
    sessionDetailsPage.openSession(sessionID)
  })

  it('should click on back arrow to get back session list page', () => {
    sessionDetailsPage.getBackSessionListPage()
    const currentUrl = sessionDetailsPage.getUrlPage()
    const expectedUrl = `${portalUrl}/sessions`
    assert.equal(currentUrl, expectedUrl, 'Current url is not expected')
  })

  it('should display session overview in session details page correctly', () => {
    const sessionOverviewFromUI = sessionDetailsPage.getSessionOverview()
    const sessionTypeFromUI = sessionOverviewFromUI.Type
    const deviceNameFromUI = sessionOverviewFromUI.DeviceInfo.DeviceName
    const sessionTypeFromAPI = sessionInfoFromAPI.type
    const deviceNameFromAPI = sessionInfoFromAPI.executionData.actual.deviceName
    assert.equal(sessionOverviewFromUI.Name, sessionInfoFromAPI.name,
      'Session name is not displayed correctly')
    assert.equal(sessionOverviewFromUI.Description, sessionInfoFromAPI.description,
      'Session description is not displayed correctly')
    assert.isTrue(sessionTypeFromUI.toLowerCase().includes(sessionTypeFromAPI.toLowerCase()),
      'Session type is not displayed correctly')
    assert.isTrue(deviceNameFromUI.includes(deviceNameFromAPI),
      'Device name is not displayed correctly')
  })

  it('should edit session name successfully', () => {
    sessionDetailsPage.editSessionName(newSessionName)
    const message = sessionDetailsPage.getNotificationMessage()
    assert.equal(message, 'Session has been updated successfully',
      'Notification message is not expected')
    const sessionName = sessionDetailsPage.getSessionOverview().Name
    assert.equal(sessionName, newSessionName, 'Session Name is not set correctly')
  })

  it('should be failed if session name is set to a string < 5 characters', () => {
    const nameBeforeChange = sessionDetailsPage.getSessionOverview().Name
    sessionDetailsPage.editSessionName(veryShortSessionName)
    const message = sessionDetailsPage.getNotificationMessage()
    assert.equal(message, 'Session name must be between 5 and 80 characters',
      'Notification message is not expected')
    const nameAfterChange = sessionDetailsPage.getSessionOverview().Name
    assert.equal(nameBeforeChange, nameAfterChange, 'Session Name is not set correctly')
  })

  it('should be failed if session name is set to a string > 80 characters', () => {
    const nameBeforeChange = sessionDetailsPage.getSessionOverview().Name
    sessionDetailsPage.editSessionName(veryLongSessionName)
    const message = sessionDetailsPage.getNotificationMessage()
    assert.equal(message, 'Session name must be between 5 and 80 characters',
      'Notification message is not expected')
    const nameAfterChange = sessionDetailsPage.getSessionOverview().Name
    assert.equal(nameBeforeChange, nameAfterChange, 'Session Name is not set correctly')
  })

  it('should edit session description successfully', () => {
    sessionDetailsPage.editSessionDescription(newSessionDescription)
    const message = sessionDetailsPage.getNotificationMessage()
    assert.equal(message, 'Session has been updated successfully',
      'Notification message is not expected')
    const sessionDescription = sessionDetailsPage.getSessionOverview().Description
    assert.equal(sessionDescription, newSessionDescription,
      'Session Description is not set correctly')
  })

  it('4 tabs displayed in session details page', () => {
    sessionInfo = sessionDetailsPage.getSessionDetails()
    const tabs = Object.keys(sessionInfo)
    const expectedTabs = (sessionInfo.SessionOverview.Type === 'Manual')
      ? ['SessionOverview', 'ActionsPerformed', 'Video', 'Logs']
      : ['SessionOverview', 'HttpCommands', 'Video', 'Logs']
    assert.isTrue(equalArrays(tabs, expectedTabs), 'Tabs are not displayed correctly')
  })

  it('check video and log links displayed correctly in session details page', () => {
    sessionInfo = sessionDetailsPage.getSessionDetails()
    const downloadLogLink = removeDynamicString(sessionInfoFromAPI.log.downloadUrl)
    const videoLink = removeDynamicString(sessionInfoFromAPI.video.path)
    //Verify urls
    assert.isTrue(removeDynamicString(sessionInfo.Logs.DownloadLink) === downloadLogLink,
      'Download log path is not expected')
    assert.isTrue(removeDynamicString(sessionInfo.Video.VideoLink) === videoLink,
      'Video path is not expected')
  })

  it('should display commands list in session details page correctly', () => {
    sessionInfo = sessionDetailsPage.getSessionDetails()
    let commandsFromUI
    commandsFromUI = (sessionInfo.SessionOverview.Type === 'Manual')
      ? sessionInfo.ActionsPerformed
      : sessionInfo.HttpCommands
    assert.isTrue(compareTwoCommandsList(commandsFromUI, commandsFromAPI,
      sessionInfo.SessionOverview.Type), '2 sessions have different commands')
  })

})

/**
 * Compare 2 command arrays if they are equal on data of Method, requestBody, responseBody
 * @param commandsFromUI {Array} - Listd of commands from UI
 * @param commandsFromAPI {Array} - List of commands from API
 * @param sessionType {string} - session type, either Manual or Auto
 * Return a boolean
 */
function compareTwoCommandsList(commandsFromUI, commandsFromAPI, sessionType) {
  let result = false
  if (commandsFromUI.length === commandsFromAPI.length && commandsFromUI.length !== 0) {
    for (let i = 0; i < commandsFromUI.length; i++) {
      let commandFromUI = commandsFromUI[i]
      let commandFromAPI = commandsFromAPI[i]
      result = (sessionType === 'Manual')
        // eslint-disable-next-line max-len
        ? compareTwoObjects(commandFromUI.Action.toLowerCase(), commandFromAPI.data.action.toLowerCase())
        // eslint-disable-next-line max-len
        : compareTwoObjects(commandFromUI.Method.toLowerCase(), commandFromAPI.data.method.toLowerCase()) &&
          compareTwoObjects(commandFromUI.RequestBody, commandFromAPI.data.requestBody) &&
          compareTwoObjects(commandFromUI.ResponseBody, commandFromAPI.data.responseBody)
      if (!result) {
        return false
      }
    }
  }
  else if (commandsFromUI.length === 0 && commandsFromAPI.length === 0) {
    result = true
  }
  return result
}

/**
 * Compare 2 key objects if they are the same or not
 * Return a boolean
 */
function compareTwoObjects(obj1, obj2) {
  let result
  if (obj1 === undefined || obj2 === undefined) {
    result = (obj1) ? Object.keys(obj1).length === 0 && obj2 === undefined
            : Object.keys(obj2).length === 0 && obj1 === undefined
  }
  else {
    // eslint-disable-next-line max-len
    result = convertToString(obj1).replace(/[^a-zA-Z0-9]/g, '') === convertToString(obj2).replace(/[^a-zA-Z0-9]/g, '')
  }
  return result
}

/**
 * Convert an object to a string
 * @param obj {object or string}
 * Return a string
 */
function convertToString(obj) {
  return (typeof obj === 'string') ? obj : JSON.stringify(obj)
}

/**
 * Remove a dynamic string from a given url
 * @param url {string}
 * Return a string without the dynamic string
 */
function removeDynamicString(url) {
  return (url) ? url.substring(0, url.indexOf('&Expires=')) : url
}

/**
 * Get total of commands of a given session via API
 * @param sessionID {string}
 * Return an array of commands
 */
async function getAllCommandsFromAPI(sessionID) {
  let totalCommands = []
  const totalPages = (await SessionAPI.getASession(sessionID))[0].totalPages
  for (let i = 1; i <= totalPages; i++) {
    let commandsOnCurrentPage = (await SessionAPI.getASession(sessionID, i))[0].commands
    totalCommands = totalCommands.concat(commandsOnCurrentPage)
  }
  return totalCommands
}
