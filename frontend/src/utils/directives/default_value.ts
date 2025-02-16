declare module 'solid-js' {

  namespace JSX {
    interface DirectiveFunctions {
      default_value: typeof default_value
    }
  }
}

export function default_value(element: HTMLInputElement) {
  element.value = 'default value'
}
