import SettingsPage from './settings'

const elements = {
  orgName: '//form[@data-radium]/div/span',
  orgNameInput: '//form[@data-radium]/div/input',
  orgTotalMembersLabel: '//input[@name="email"]/ancestor::div[4]/div[2]/div',
  orgDesciption: '//form[@data-radium]/div/div',
  orgDesciptionInput: '//form[@data-radium]/div/div[2]/textarea[2]',
  emailInput: '//input[@name="email"]',
  addUserButton: '(//form)[3]//button',
  filterInput: '//input[@name="search"]',
  memberList: '//input[@name="search"]/ancestor::div[3]/div[2]/div',
  notificationMsg: '//span[text()="Organization has been updated successfully"]',
  contextMenu: {
    grantAdminCheckbox: '//input[@type="checkbox"]',
    removeMember: '//div[text()="Remove"]'
  },
  removeConfirmation: {
    cancelButton: '//button/div/span[text()="Cancel"]',
    removeButton: '//button/div/div/span[text()="Remove"]'
  },
  createOrgButton: '//div/button/div/span[contains(text(), "Create Organization")]',
  orgCreationForm: {
    nameInput: '//form/div/input[@name="name"]',
    descriptionArea: '//form/div/div/textarea[@name="description"]',
    cancelButton: '//button/div/span[text()="Cancel"]',
    createButton: '//button//span[contains(text(), "Create your organization")]'
  }
}

const roleEnum = {
  MEMBER: 'MEMBER',
  ADMIN: 'ADMIN'
}

const waitTime = 500 //milliseconds

export default class OrganizationPage extends SettingsPage {

  constructor(specificBrowser = browser) {
    super(specificBrowser)
    this._initElementsGetter(elements)
  }

  /**
   * Open Organization page
   */
  open() {
    super.open('settings/organization')
  }

  /**
   * Get list of org member's info
   * Return an array of member info
   */
  getMemberList() {
    this.wait(waitTime)
    let memberElements = this.getElements(elements.memberList)
    let memberData = {}
    let memberDataList = []
    if (memberElements.length > 0) {
      for (let i = 1; i <= memberElements.length; i++) {
        let statusEle = `${elements.memberList}[${i}]/span[2]/span[1]/div[2]`
        let nameEle = `${elements.memberList}[${i}]/span[2]/span[1]/div[1]`
        let emailEle = `${elements.memberList}[${i}]/span[2]/span[2]`
        if (this._browser.isVisible(statusEle)) {
          let eleValue = this._browser.getText(statusEle)
          if (eleValue === 'Pending') {
            memberData.email = this._browser.getText(nameEle)
            memberData.name = null
            memberData.status = eleValue
            memberData.role = null
          }
          else {
            memberData.email = this._browser.getText(emailEle)
            memberData.name = this._browser.getText(nameEle)
            memberData.status = 'Registered'
            memberData.role = eleValue
          }
        }
        else {
          memberData.email = this._browser.getText(emailEle)
          memberData.name = this._browser.getText(nameEle)
          memberData.status = 'Registered'
          memberData.role = 'Member'
        }
        memberDataList.push(memberData)
        memberData = {}
      }
    }
    return memberDataList
  }

  /**
   * Search org members
   * @param: filterString
   */
  filterMember(filterString) {
    this._browser.setValue(elements.filterInput, filterString)
    this.wait(waitTime)
  }

   /**
   * Remove a member from the org
   * @param: memberEmail
   * @Param: confirm is true means will remove this membet, otherwise cancel
   */
  removeMember(memberEmail, confirm = true) {
    this.filterMember(memberEmail)
    if (this.getElements(elements.memberList).length > 0) {
      this._openMemberContextMenu(memberEmail)
      this._browser.click(elements.contextMenu.removeMember)
      if (confirm) {
        this._browser.click(elements.removeConfirmation.removeButton)
        this.waitForLoadingProgressDone()
      }
      else {
        this._browser.click(elements.removeConfirmation.cancelButton)
      }
    }
  }

   /**
   * Remove users from the organization
   * @param: emails
   */
  removeMembers(emails) {
    emails.map((email) => {
      this.removeMember(email)
    })
  }

  /**
   * Edit org name
   * @param: newOrgName
   */
  setOrgName(newOrgName) {
    this._browser.click(elements.orgName)
                 .setValue(elements.orgNameInput, newOrgName)
                 .click(elements.orgTotalMembersLabel)
    this.waitForLoadingProgressDone()
  }

  /**
   * Edit org Description
   * @param: newOrgDescription
   */
  setOrgDescription(newOrgDescription) {
    this._browser.click(elements.orgDesciption)
                 .setValue(elements.orgDesciptionInput, newOrgDescription)
                 .click(elements.orgTotalMembersLabel)
    this.waitForLoadingProgressDone()
  }

  /**
   * Get org name
   * Return a string of org name
   */
  getOrgName() {
    return this._browser.getText(elements.orgName)
  }

  /**
   * Get org Description
   * Return a string of org description
   */
  getOrgDescription() {
    return this._browser.getText(elements.orgDesciption)
  }

  /**
   * Return true if notification message is displayed, otherwise false
   */
  isNotificationMessageExisting() {
    return this._browser.isExisting(elements.notificationMsg)
  }

  /**
   * Return true if the user has an organization already, otherwise false
   */
  hasOrganization() {
    return !this._browser.isExisting(elements.createOrgButton)
  }

  /**
   * Create an organization
   * @param: name - Org name
   * @param: description - Org description
   * @param: submit - default is true, it means submit the creation, otherwise cancel
   */
  createOrganization(name, description, submit = true) {
    this._browser.click(elements.createOrgButton)
    this._browser.setValue(elements.orgCreationForm.nameInput, name)
    this._browser.setValue(elements.orgCreationForm.descriptionArea, description)
    if (submit) {
      this._browser.click(elements.orgCreationForm.createButton)
      this.waitForLoadingProgressDone()
    }
    else {
      this._browser.click(elements.orgCreationForm.cancelButton)
    }
  }

  /**
   * Get organization's member label
   * Return a string of total members label
   */
  getTotalMembersLabel() {
    return this._browser.getText(elements.orgTotalMembersLabel)
  }

  /**
   * Add member to the organization
   * @param: email string
   */
  addMember(email) {
    this._browser.setValue(elements.emailInput, email)
    this._browser.click(elements.addUserButton)
    this.waitForLoadingProgressDone()
  }

  /**
   * Add list of members to the organization
   * @param: emails array
   */
  addMembers(emails) {
    emails.map((email) => {
      this.addMember(email)
    })
  }

  /**
   * Click on an icon to open context menu of specific member in members list
   */
  _openMemberContextMenu(email) {
    this.filterMember(email)
    if (this.getMemberList().length > 0) {
      this._browser.click(`${elements.memberList}[1]/span[3]`)
    }
    this.wait(waitTime)
  }

  _closeMemberContextMenu() {
    this._browser.click(elements.orgTotalMembersLabel)
  }

  /**
   * Change a member to a specific role. Either ADMIN or MEMBER
   */
  changeMemberRole(email, role) {
    this._openMemberContextMenu(email)
    const adminRole = this._browser.isSelected(elements.contextMenu.grantAdminCheckbox)
    switch (role.toUpperCase()) {
      case roleEnum.MEMBER:
        (adminRole) ? this._browser.click(elements.contextMenu.grantAdminCheckbox)
        : this._closeMemberContextMenu()
        break
      case roleEnum.ADMIN:
        (!adminRole) ? this._browser.click(elements.contextMenu.grantAdminCheckbox)
        : this._closeMemberContextMenu()
        break
    }
  }

  getRole(email) {
    this._openMemberContextMenu(email)
    if (this._isExisting(elements.contextMenu.grantAdminCheckbox) &&
      this._browser.isSelected(elements.contextMenu.grantAdminCheckbox)) {
      return 'Admin'
    }
    else {
      return 'Member'
    }
  }

}
