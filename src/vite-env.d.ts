/// <reference types="vite/client" />

// (Opcional) Declara las env que vas a usar para que TS las conozca.
interface ImportMetaEnv {
    readonly VITE_API_BASE_URL?: string;
    readonly VITE_API_URL?: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  