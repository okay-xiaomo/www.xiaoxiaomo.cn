import { onMounted, ref } from 'vue'

const THEME_STORE_KEY = 'CURRENT_THEME_KEY'
const DEFAULT_THEME = 'system'

export interface IThemeOptions {
  defaultTheme?: string
}

/**
 * 使用主题
 * @param {IThemeOptions} options 主题配置
 * */
const useTheme = (options?: IThemeOptions) => {
  const { defaultTheme = DEFAULT_THEME } = options || {}
  const currentTheme = ref<string>(defaultTheme)

  const getTheme = () => {
    return currentTheme.value
  }

  const setTheme = (mode: string) => {
    currentTheme.value = mode
    localStorage.setItem(THEME_STORE_KEY, mode)
    applyTheme()
  }

  const applyTheme = () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const themeToApply =
      currentTheme.value === DEFAULT_THEME ? (prefersDark ? 'dark' : 'light') : currentTheme.value
    document.documentElement.setAttribute('data-theme', themeToApply)
  }

  const init = () => {
    setTheme(localStorage.getItem(THEME_STORE_KEY) || DEFAULT_THEME)
    // 监听系统主题变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme)
  }

  onMounted(init)

  return {
    currentTheme,
    getTheme,
    setTheme,
    applyTheme,
  }
}

export default useTheme
