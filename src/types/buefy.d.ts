import buefy from 'buefy'
import { Context, NuxtAppOptions } from '@nuxt/types'

declare module '@nuxt/types' {
  interface Context {
    $buefy: typeof buefy
  }
  interface NuxtAppOptions {
    $buefy: typeof buefy
  }
}
