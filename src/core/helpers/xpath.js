/**
 * formats an xpath text with dynamic boundary quote.
 * It helps fixing the xpath problem
 */
export function normalize(text) {
  
  let boundaryQuote = "'"
  const containsSingleQuote = text.indexOf("'") >= 0
  const containsDoubleQuote = text.indexOf('"') >= 0
  if (containsDoubleQuote && containsSingleQuote) text = text.replace("'", '"')
  else if (containsSingleQuote) boundaryQuote = '"'
  return `${boundaryQuote}${text}${boundaryQuote}`
}
