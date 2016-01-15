import {
  assert
}
from 'chai'

describe('Google Compose Email', () => {
  const GOOGLE_URL = 'https://mail.google.com'
  const GOOGLE_URL_HOMEPAGE = 'https://mail.google.com/mail/mu/mp/4/#tl/priority/%5Esmartlabel_personal'
  const TRASH_URL = 'https://mail.google.com/mail/mu/mp/4/#tl/Trash'
  const EMAIL_ADDRESS1 = 'krypton.portal@gmail.com'
  const EMAIL_ADDRESS2 = 'krypton.portal2@gmail.com'
  const PASSWORD = 'Admin@123456'
  const SUBJECT1 = 'It is a subject'
  const BODY1 = 'It is a body'
  const MSG_NOEMAIL = 'You have no mail here.'
  const MSG_NOEMAIL_PRIMARY = 'You have no mail.\nPlease enjoy your day!'

  let driver

  before(async() => {
    driver = await global.createDriver()
    await driver.deleteAllCookies()
  })

  after(async() => {
    await driver.quit()
  })

  it('should Login successfully with Gmail1', async() => {
    await driver
      .get(GOOGLE_URL)
      .waitForElementById('Email')
      .sendKeys(EMAIL_ADDRESS1)
      .waitForElementById('next')
      .click()
      .sleep(1000)
      .waitForElementById('Passwd')
      .sendKeys(PASSWORD)
      .waitForElementById('signIn')
      .click()
      .sleep(5000)
      .get(GOOGLE_URL_HOMEPAGE)
      .refresh()
      .sleep(5000)
      .waitForElementByXPath("//div[@id='views']//div[@aria-label='Compose']")
  })

  it('should compose email successfully by Gmail1', async() => {
    await driver
      .elementByXPath("//div[@id='views']//div[@aria-label='Compose']")
      .click()
      .sleep(1000)
      .elementByXPath("//div[@id='cmcc_composeto']//input[@id='composeto']")
      .sendKeys(EMAIL_ADDRESS2)
      .elementByXPath("//input[@id='cmcsubj']")
      .sendKeys(SUBJECT1)
      .elementById("cmcbody")
      .sendKeys(BODY1)
      .waitForElementByXPath("//div[@id='views']//div[text()='Send']")
      .click()
      .sleep(1000)
      .waitForElementByXPath("//div[@id='views']//div[@aria-label='Compose']")
  })

  it('verify the new email exists on Sent Email folder on Gmail1', async() => {
    const newEmail = await driver
      .waitForElementByXPath("//div[@aria-label='Menu']")
      .click()
      .sleep(1000)
      .waitForElementByXPath("//span[text()='Sent Mail']")
      .click()
      .sleep(1000)
      .waitForElementByXPath("//div[@class='zh mm' and @role='listitem']")
      .waitForElementByXPath("//div[@class='fm']")
      .text()

    assert.equal(true, newEmail.includes(SUBJECT1))
    assert.equal(true, newEmail.includes(BODY1))

    const subject = await driver
      .elementByXPath("//div[contains(@class,'m')]//div[@role='listitem'][1]")
      .click()
      .sleep(1000)
      .elementByXPath("//div[contains(@class,'V j hj') and text()='Details']")
      .click()
      .waitForElementByXPath("//span[@class='kj']/span")
      .text()

    assert.equal(true, subject.includes(SUBJECT1))

    const body = await driver
      .elementByXPath("//div[@class='Hi']")
      .text()

    assert.equal(true, body.includes(BODY1))

    const sentEmail = await driver
      .elementByXPath("//div[@class='Kg']/span")
      .text()

    assert.equal(sentEmail, EMAIL_ADDRESS1)

    const toEmail = await driver
      .waitForElementByXPath("//div[@class='Kh']//span[@class='Hh']//span[@class='Kg ph']")
      .text()
    assert.equal(toEmail, EMAIL_ADDRESS2)
  })

  it('delete email on Sent Email and Trash folder on Gmail1', async() => {
    const noEmailSentEmail = await driver
      .waitForElementByXPath("//div[@id='cv__cntbt']//div[@class='V j Y Mm Kg' and text()='Sent Mail']")
      .click()
      .sleep(1000)
      .waitForElementByXPath("//div[@class='V j cb Ol'][1]")
      .click()
      .sleep(1000)
      .elementByXPath("//div[@class='M j T b hc  Vm Im']//div[@class='V j Xd']")
      .click()
      .sleep(1000)
      .waitForElementByXPath("//div[@class='Wl']")
      .text()

    assert.equal(noEmailSentEmail, MSG_NOEMAIL)

    const noEmailTrash = await driver
      .get(TRASH_URL)
      .sleep(1000)
      .waitForElementByXPath("//div[@class='V j cb Ol'][1]")
      .click()
      .sleep(1000)
      .elementByXPath("//div[@class='M j T b hc q m']//div[text()='Delete forever']")
      .click()
      .waitForElementByXPath("//div[@class='Wl']")
      .text()

    assert.equal(noEmailTrash, MSG_NOEMAIL)

    await driver
      .elementByXPath("//div[@aria-label='Menu']")
      .click()
      .waitForElementByXPath("//div[contains(@class,'V Y Rx Kg')]")
      .click()
      .waitForElementByXPath("//button[@id='signout']")
      .click()
      .sleep(5000)
  })

  it('verify Gmail2 received a new email from Gmail1', async() => {
    const newPrimaryEmail = await driver
      .get(GOOGLE_URL)
      .waitForElementById('Email')
      .sendKeys(EMAIL_ADDRESS2)
      .waitForElementById('next')
      .click()
      .sleep(1000)
      .waitForElementById('Passwd')
      .sendKeys(PASSWORD)
      .waitForElementById('signIn')
      .click()
      .sleep(5000)
      .get(GOOGLE_URL_HOMEPAGE)
      .refresh()
      .sleep(5000)
      .waitForElementByXPath("//div[@id='views']//div[@aria-label='Compose']")
      .waitForElementByXPath("//div[@class='fm']")
      .text()
    assert.equal(true, newPrimaryEmail.includes(SUBJECT1))
    assert.equal(true, newPrimaryEmail.includes(BODY1))

    const subject = await driver
      .waitForElementByXPath("//div[contains(@class,'fm')]//div[@role='listitem'][1]")
      .click()
      .sleep(1000)
      .waitForElementByXPath("//div[contains(@class,'V j hj') and text()='Details']")
      .click()
      .waitForElementByXPath("//span[@class='kj']/span")
      .text()

    assert.equal(true, subject.includes(SUBJECT1))

    const body = await driver
      .waitForElementByXPath("//div[@class='Hi']")
      .text()

    assert.equal(true, body.includes(BODY1))

    const sentEmail = await driver
      .waitForElementByXPath("//div[@class='Kg']/span")
      .text()

    assert.equal(sentEmail, EMAIL_ADDRESS1)

    const toEmail = await driver
      .waitForElementByXPath("//div[@class='Kh']//span[@class='Hh']//span[@class='Kg ph']")
      .text()

    assert.equal(toEmail, EMAIL_ADDRESS2)
  })

  it('delete email on Primary Email and Trash folder on Gmail2', async() => {
    const noEmailPrimary = await driver
      .waitForElementByXPath("//div[contains(@class,'M j T b hc Om o')]//div[text()='Primary'][1]")
      .click()
      .sleep(1000)
      .waitForElementByXPath("//div[@class='zh mm' and @role='listitem']")
      .elementByXPath("//div[@class='V j cb Ol'][1]")
      .click()
      .sleep(1000)
      .elementByXPath("//div[@class='M j T b hc  Vm Im']//div[@class='V j Xd']")
      .click()
      .waitForElementByXPath("//div[@class='Wl']")
      .text()

    assert.equal(noEmailPrimary, MSG_NOEMAIL_PRIMARY)

    const noEmailTrash = await driver
      .get(TRASH_URL)
      .sleep(1000)
      .waitForElementByXPath("//div[@class='V j cb Ol'][1]")
      .click()
      .sleep(1000)
      .elementByXPath("//div[@class='M j T b hc q m']//div[text()='Delete forever']")
      .click()
      .waitForElementByXPath("//div[@class='Wl']")
      .text()

    assert.equal(noEmailTrash, MSG_NOEMAIL)
  })
})
