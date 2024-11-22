import { JSX } from "solid-js";

type ForwardRef<E extends Element = Element> = Partial<(
  JSX.DirectiveAttributes &
  JSX.DirectiveFunctionAttributes<E> &
  JSX.OnAttributes<E> &
  JSX.CustomEventHandlersNamespaced<E> &
  JSX.OnCaptureAttributes<E> &

  // wont work because there are empty
  // JSX.PropAttributes &
  // JSX.AttrAttributes & 
  // JSX.BoolAttributes &

  { ref: (ref: E) => void }
)>

type Forward<K> = K extends `${string}:${string}` | 'ref' ? K : never
type NonForward<K> = K extends `${string}:${string}` | 'ref' ? never : K

export const forwardRef = <T extends ForwardRef<any> & object>(props: T) => {
  // manual call Directives

  return [
    new Proxy(props, {
      get: (obj: any, key) => {
        if (key === 'ref' || typeof key === 'string' && key.includes(':')) return undefined
        return obj[key]
      },
      ownKeys: () => Object.keys(props).filter(k => !k.includes(':') && k !== 'ref')
    }) as { [K in keyof T as NonForward<K>]: T[K] },

    new Proxy(props, {
      get: (obj: any, key) => {
        if (key === 'ref' || typeof key === 'string' && key.includes(':')) return obj[key]
        return undefined
      },
      ownKeys: () => Object.keys(props).filter(k => k.includes(':') || k === 'ref')
    }) as { [K in keyof T as Forward<K>]: T[K] },
  ] as const
}

// function test(...args: any[]) {
//   console.log('test', args)
// }

// declare module "solid-js" {
//   namespace JSX {
//     interface Directives {
//       // test: [() => any, (v: any) => any];
//     }
//   }
// }

// const Child = (props: ForwardRef<HTMLDivElement> & ParentProps) => {
//   const [others, forward] = forwardRef(props)

//   console.log(props, { others: { ...others }, forward: { ...forward } })

//   return <div {...forward} />
// }

// export const Parent = () => {
//   const [ref, setRef] = createSignal<HTMLElement>()

//   return <Child ref={setRef} on:click={event => { }} use:test={[() => { }, () => { }]} />
// }
