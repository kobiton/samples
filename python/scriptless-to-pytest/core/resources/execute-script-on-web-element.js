const element = arguments[0]
const command = arguments[1]

switch (command) {
  case "isElementVisible":
    const visible = !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length)
    return visible ? 'true': 'false'
  case "scrollIntoView":
    element.scrollIntoView({
      behavior: "auto",
      block: "center",
      inline: "center"
    })
    return true
  case "getBoundingClientRect":
    const {devicePixelRatio} = window
    const rect = element.getBoundingClientRect()

    const result = {
      x: Math.round(rect.x * devicePixelRatio),
      y: Math.round(rect.y * devicePixelRatio),
      width: Math.round(rect.width * devicePixelRatio),
      height: Math.round(rect.height * devicePixelRatio),
      windowInnerHeight: Math.round(window.innerHeight * devicePixelRatio)
    }

    return JSON.stringify(result)

  case "insertKobitonWebview":
    const elementId = '__kobiton_webview__'
    let webView = document.getElementById(elementId)
    if (webView) return true

    webView = document.createElement('kobiton-webview-element')
    webView.id = elementId
    webView.style.left = '0px'
    webView.style.top = '0px'
    webView.style.width = '100%'
    webView.style.height = '100%'
    webView.style.position = 'fixed'
    webView.setAttribute('aria-label', elementId)
    webView.appendChild(document.createTextNode(elementId))

    webView.style.pointerEvents = 'none';
    webView.style.zIndex = '-2147483647';
    webView.style.color = 'transparent';
    webView.style.backgroundColor = 'transparent';
    webView.style.border = 'none';
    webView.style.outline = 'none';
    webView.style.margin = '0 0 0 0';
    webView.style.padding = '0 0 0 0';
    webView.style.overflow = 'hidden';

    document.body.appendChild(webView)
    return true
  default:
    throw new Error(`Unsupported command: ${command}`)
}
