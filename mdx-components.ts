import {useMDXComponents as getThemeComponents} from 'nextra-theme-docs'

const themeComponents = getThemeComponents()

export function useMDXComponents<T>(components: T) {
  return {
    ...themeComponents,
    ...components
  }
}