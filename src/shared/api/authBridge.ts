/** Bridge so shared/api can use auth without importing features (FSD). */

type TokenGetter = () => string | null
type UnauthorizedHandler = () => void

let getTokenImpl: TokenGetter = () => null
let onUnauthorizedImpl: UnauthorizedHandler = () => {}

export function setAuthTokenGetter(getter: TokenGetter) {
  getTokenImpl = getter
}

export function setUnauthorizedHandler(handler: UnauthorizedHandler) {
  onUnauthorizedImpl = handler
}

export function readAuthToken() {
  return getTokenImpl()
}

export function notifyUnauthorized() {
  onUnauthorizedImpl()
}
