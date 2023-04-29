declare module 'vue' {
  interface InputHTMLAttributes {
    webkitdirectory?: boolean
  }

  interface ComponentCustomProps {
    [attrName: string]: any
  }
}

export {}
