/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional base URL for image assets (defaults to same-origin). */
  readonly VITE_ASSET_BASE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
