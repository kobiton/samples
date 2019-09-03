
type ICodeceptCallback = (i?: CodeceptJS.I, current?:any, ...args: any) => void;

declare class FeatureConfig {
  retry(times: number): FeatureConfig
  timeout(seconds: number): FeatureConfig
  config(config: object): FeatureConfig
  config(helperName: string, config: object): FeatureConfig
}

declare class ScenarioConfig {
  throws(err: any): ScenarioConfig;
  fails(): ScenarioConfig;
  retry(times: number): ScenarioConfig
  timeout(timeout: number): ScenarioConfig
  inject(inject: object): ScenarioConfig
  config(config: object): ScenarioConfig
  config(helperName: string, config: object): ScenarioConfig
  injectDependencies(dependencies: { [key: string]: any }): ScenarioConfig
}

interface ILocator {
  id?: string;
  xpath?: string;
  css?: string;
  name?: string;
  frame?: string;
  android?: string;
  ios?: string;
}

type LocatorOrString = string | ILocator | Locator;

declare class Container {
  create(config: Object, opts: Object): void
  plugins(name?: string): Object
  support(name?: string): Object
  helpers(name?: string): Object
  translation(): Object
  mocha(): Object
  append(newContainer: Object): void
  clear(newHelpers: Object, newSupport: Object, newPlugins: Object): void
}

declare class RecorderSession {
  running: boolean
    start(name: string): void
    restore(name: string): void
    catch(fn: CallableFunction): void
}

declare class Recorder {
  retries: Object[]
  start(): void
  isRunning(): boolean
  startUnlessRunning(): void
  errHandler(fn: CallableFunction): void
  reset(): void
  session: RecorderSession
  add(taskName: string, fn?: CallableFunction, force?: boolean, retry?: boolean): Promise<any>
  retry(opts: Object): Promise<any>
  catch(customErrFn: CallableFunction): Promise<any>
  catchWithoutStop(customErrFn: CallableFunction ): Promise<any>
  throw(err: Error): Promise<any>
  saveFirstAsyncError(err: Error): void
  getAsyncErr(): Promise<Error>
  cleanAsyncErr(): void
  stop():void
  promise(): Promise<any>
  scheduled(): string[]
  toString(): string
  add(hookName: string, fn: CallableFunction, force?: boolean): void
  catch(customErrFn: CallableFunction): void
}

declare class CodeceptJSEvent {
  dispatcher: NodeJS.EventEmitter
  test: {
    started: string
    before: string
    after: string
    passed: string
    failed: string
    finished: string
  }
  suite: {
    before: string,
    after: string,
  }
  hook: {
    started: string,
    passed: string,
  }
  step: {
    before: string,
    after: string,
    started: string,
    passed: string,
    failed: string,
    finished: string,
  }
  all: {
    before: string,
    after: string,
    result: string,
  }
  multiple: {
    before: string,
    after: string,
  }
  emit(event: string, param: string): void
  cleanDispatcher(): void
}

declare class Output {
  colors: any
  styles: {
    error: any,
    success: any,
    scenario: any,
    basic: any,
    debug: any,
    log: any,
  }

  print(msg: string): void
  stepShift: number
  level(level: number): number
  process(process: string): string
  debug(msg: string): void
  log(msg: string): void
  error(msg: string): void
  success(msg: string): void
  plugin(name: string, msg: string): void
  step(step: any): void
  suite: {
    started: Function
  }
  test: {
    started(test: string): void
    passed(test: string): void
    failed(test: string): void
    skipped(test: string): void
  }
  scenario: {
    started(test: string): void
    passed(test: string): void
    failed(test: string): void
  }
  say(message: string, color?: string): void
  result(passed: number, failed: number, skipped: number, duration: string): void
}

declare class Config {
  create(newConfig: Object): Object
  load(configFile: string): Config
  get(key: string, val: any): any
  append(additionalConfig: Object): Object
  reset(): Object
}

declare class Helper {
  /** Abstract method to provide required config options */
  static _config(): any;
  /** Abstract method to validate config */
  _validateConfig<T>(config: T): T;
  /** Sets config for current test */
  _setConfig(opts: any): void;
  /** Hook executed before all tests */
  _init(): void
  /** Hook executed before each test. */
  _before(): void
  /** Hook executed after each test */
  _after(): void
  /**
   * Hook provides a test details
   * Executed in the very beginning of a test
   */
  _test(test: () => void): void
  /** Hook executed after each passed test */
  _passed(test: () => void): void
  /** Hook executed after each failed test */
  _failed(test: () => void): void
  /** Hook executed before each step */
  _beforeStep(step: () => void): void
  /** Hook executed after each step */
  _afterStep(step: () => void): void
  /** Hook executed before each suite */
  _beforeSuite(suite: () => void): void
  /** Hook executed after each suite */
  _afterSuite(suite: () => void): void
  /** Hook executed after all tests are executed */
  _finishTest(suite: () => void): void
  /**Access another configured helper: this.helpers['AnotherHelper'] */
  readonly helpers: any
  /** Print debug message to console (outputs only in debug mode) */
  debug(msg: string): void

  debugSection(section: string, msg: string): void
}

declare class Locator {
  constructor(locator: LocatorOrString, defaultType?: string);

  or(locator: LocatorOrString): Locator;
  find(locator: LocatorOrString): Locator;
  withChild(locator: LocatorOrString): Locator;
  withDescendant(locator: LocatorOrString): Locator;
  at(position: number): Locator;
  first(): Locator;
  last(): Locator;
  inside(locator: LocatorOrString): Locator;
  before(locator: LocatorOrString): Locator;
  after(locator: LocatorOrString): Locator;
  withText(text: string): Locator;
  withAttr(attrs: object): Locator;
  as(output: string): Locator;
}


declare function actor(customSteps?: {
  [action: string]: (this: CodeceptJS.I, ...args: any[]) => void
}): CodeceptJS.I;
declare function actor(customSteps?: {}): CodeceptJS.I;
declare function Feature(title: string, opts?: {}): FeatureConfig;
declare const Scenario: {
  (title: string, callback: ICodeceptCallback): ScenarioConfig;
  (title: string, opts: {}, callback: ICodeceptCallback): ScenarioConfig;
  only(title: string, callback: ICodeceptCallback): ScenarioConfig;
  only(title: string, opts: {}, callback: ICodeceptCallback): ScenarioConfig;
}
declare interface IScenario {
  Scenario(title: string, callback: ICodeceptCallback): ScenarioConfig;
  Scenario(title: string, opts: {}, callback: ICodeceptCallback): ScenarioConfig;
}
declare function xScenario(title: string, callback: ICodeceptCallback): ScenarioConfig;
declare function xScenario(title: string, opts: {}, callback: ICodeceptCallback): ScenarioConfig;
declare interface IData {
  Scenario(title: string, callback: ICodeceptCallback): ScenarioConfig;
  Scenario(title: string, opts: {}, callback: ICodeceptCallback): ScenarioConfig;
  only: IScenario;
}
declare function Data(data: any): IData;
declare function xData(data: any): IData;
declare function Before(callback: ICodeceptCallback): void;
declare function BeforeSuite(callback: ICodeceptCallback): void;
declare function After(callback: ICodeceptCallback): void;
declare function AfterSuite(callback: ICodeceptCallback): void;

declare function inject(): {
  I: CodeceptJS.I
};
declare function locate(selector: LocatorOrString): Locator;
declare function within(selector: LocatorOrString, callback: Function): Promise<any>;
declare function session(selector: LocatorOrString, callback: Function): Promise<any>;
declare function session(selector: LocatorOrString, config: any, callback: Function): Promise<any>;
declare function pause(): void;
declare function secret(secret: any): string;

declare const codeceptjs: any;

declare namespace CodeceptJS {
  export const container: Container
  export const recorder: Recorder
  export const event: CodeceptJSEvent
  export const output: Output
  export const config: Config

  export interface I {
    runOnIOS(caps: string, fn: Function) : void,
    runOnAndroid(caps: string, fn: Function) : void,
    runInWeb(fn: Function) : void,
    seeAppIsInstalled(bundleId: string) : void,
    seeAppIsNotInstalled(bundleId: string) : void,
    installApp(path: string) : void,
    removeApp(appId: string, bundleId: string) : void,
    seeCurrentActivityIs(currentActivity: string) : void,
    seeDeviceIsLocked() : void,
    seeDeviceIsUnlocked() : void,
    seeOrientationIs(orientation: string) : void,
    setOrientation(orientation: string) : void,
    grabAllContexts() : Promise<string>,
    grabContext() : Promise<string>,
    grabCurrentActivity() : Promise<string>,
    grabNetworkConnection() : Promise<string>,
    grabOrientation() : Promise<string>,
    grabSettings() : Promise<string>,
    switchToWeb(context: LocatorOrString) : void,
    switchToNative(context?: LocatorOrString) : void,
    startActivity(appPackage: string, appActivity: string) : void,
    setNetworkConnection(value: string) : void,
    setSettings(settings: string) : void,
    hideDeviceKeyboard(strategy: string, key: string) : void,
    sendDeviceKeyEvent(keyValue: string) : void,
    openNotifications() : void,
    makeTouchAction(locator: LocatorOrString, action: string) : void,
    tap(locator: LocatorOrString) : void,
    swipe(locator: LocatorOrString, xoffset: string, yoffset: string, speed?: string) : void,
    performSwipe(from: string, to: string) : void,
    swipeDown(locator: LocatorOrString, yoffset?: string, speed: string) : void,
    swipeLeft(locator: LocatorOrString, xoffset?: string, speed: string) : void,
    swipeRight(locator: LocatorOrString, xoffset?: string, speed: string) : void,
    swipeUp(locator: LocatorOrString, yoffset?: string, speed: string) : void,
    swipeTo(searchableLocator: string, scrollLocator: string, direction: string, timeout: string, offset: number, speed: string) : void,
    touchPerform(actions: string) : void,
    pullFile(path: string, dest: string) : void,
    shakeDevice() : void,
    rotate(x: string, y: string, duration: string, radius: string, rotation: string, touchCount: string) : void,
    setImmediateValue(id: string, value: string) : void,
    simulateTouchId(match: string) : void,
    closeApp() : void,
    appendField() : void,
    checkOption() : void,
    click() : void,
    dontSeeCheckboxIsChecked() : void,
    dontSeeElement() : void,
    dontSeeInField() : void,
    dontSee() : void,
    fillField() : void,
    grabTextFrom() : Promise<string>,
    grabValueFrom() : Promise<string>,
    seeCheckboxIsChecked() : void,
    seeElement() : void,
    seeInField() : void,
    see() : void,
    selectOption() : void,
    waitForElement() : void,
    waitForVisible() : void,
    waitForInvisible() : void,
    waitForText() : void,
    defineTimeout(timeouts: string) : void,
    amOnPage(url: string) : void,
    doubleClick(locator: LocatorOrString, context?: LocatorOrString) : void,
    rightClick(locator: LocatorOrString, context: LocatorOrString) : void,
    clearField(field: LocatorOrString) : void,
    attachFile(locator: LocatorOrString, pathToFile: string) : void,
    uncheckOption(field: LocatorOrString, context?: LocatorOrString) : void,
    grabHTMLFrom(locator: LocatorOrString) : Promise<string>,
    grabCssPropertyFrom(locator: LocatorOrString, cssProperty: string) : Promise<string>,
    grabAttributeFrom(locator: LocatorOrString, attr: string) : Promise<string>,
    seeInTitle(text: string) : void,
    seeTitleEquals(text: string) : void,
    dontSeeInTitle(text: string) : void,
    grabTitle() : Promise<string>,
    seeTextEquals(text: string, context?: LocatorOrString) : void,
    seeElementInDOM(locator: LocatorOrString) : void,
    dontSeeElementInDOM(locator: LocatorOrString) : void,
    seeInSource(text: string) : void,
    grabSource() : Promise<string>,
    grabBrowserLogs() : Promise<string>,
    grabCurrentUrl() : Promise<string>,
    dontSeeInSource(text: string) : void,
    seeNumberOfElements(locator: LocatorOrString, num: number) : void,
    seeNumberOfVisibleElements(locator: LocatorOrString, num: number) : void,
    seeCssPropertiesOnElements(locator: LocatorOrString, cssProperties: string) : void,
    seeAttributesOnElements(locator: LocatorOrString, attributes: string) : void,
    grabNumberOfVisibleElements(locator: LocatorOrString) : Promise<string>,
    seeInCurrentUrl(url: string) : void,
    dontSeeInCurrentUrl(url: string) : void,
    seeCurrentUrlEquals(url: string) : void,
    dontSeeCurrentUrlEquals(url: string) : void,
    executeScript(fn: Function) : void,
    executeAsyncScript(fn: Function) : void,
    scrollTo(locator: LocatorOrString, offsetX?: number, offsetY?: number) : void,
    moveCursorTo(locator: LocatorOrString, offsetX?: number, offsetY?: number) : void,
    saveScreenshot(fileName: string, fullPage?: string) : void,
    setCookie(cookie: string) : void,
    clearCookie(cookie: string) : void,
    seeCookie(name: string) : void,
    dontSeeCookie(name: string) : void,
    grabCookie(name: string) : Promise<string>,
    acceptPopup() : void,
    cancelPopup() : void,
    seeInPopup(text: string) : void,
    grabPopupText() : Promise<string>,
    pressKey(key: string) : void,
    resizeWindow(width: number, height: number) : void,
    dragAndDrop(srcElement: string, destElement: string) : void,
    dragSlider(locator: LocatorOrString, offsetX?: number) : void,
    grabAllWindowHandles() : Promise<string>,
    grabCurrentWindowHandle() : Promise<string>,
    switchToWindow(window: string) : void,
    closeOtherTabs() : void,
    wait(sec: number) : void,
    waitForEnabled(locator: LocatorOrString, sec?: number) : void,
    waitUntilExists(locator: LocatorOrString, sec?: number) : void,
    waitInUrl(urlPart: string, sec?: number) : void,
    waitUrlEquals(urlPart: string, sec?: number) : void,
    waitForValue(field: LocatorOrString, value: string, sec?: number) : void,
    waitNumberOfVisibleElements(locator: LocatorOrString, num: number, sec?: number) : void,
    waitToHide(locator: LocatorOrString, sec?: number) : void,
    waitForStalenessOf(locator: LocatorOrString, sec?: number) : void,
    waitForDetached(locator: LocatorOrString, sec?: number) : void,
    waitForFunction(fn: Function, argsOrSec?: string, sec?: number) : void,
    waitUntil(fn: Function, sec?: number, timeoutMsg?: string, interval?: string) : void,
    switchTo(locator: LocatorOrString) : void,
    switchToNextTab(num?: number, sec?: number) : void,
    switchToPreviousTab(num?: number, sec?: number) : void,
    closeCurrentTab() : void,
    openNewTab() : void,
    grabNumberOfOpenTabs() : Promise<string>,
    refreshPage() : void,
    scrollPageToTop() : void,
    scrollPageToBottom() : void,
    grabPageScrollPosition() : Promise<string>,
    setGeoLocation(latitude: string, longitude: string, altitude?: string) : void,
    grabGeoLocation() : Promise<string>,
    debug(msg: string) : void,
    debugSection(section: string, msg: string) : void,
    say: () => any; 
    retryStep(opts: string) : void,

  }

}

declare module "codeceptjs" {
  export = CodeceptJS;
}
