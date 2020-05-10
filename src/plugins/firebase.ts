import { Plugin } from '@nuxt/types'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'

const firebaseConfig = {
  apiKey: 'AIzaSyAtB7OIXmE3vlQP3CSDdOpDE1cua-H9pt4',
  authDomain: 'assemblepcparts.firebaseapp.com',
  databaseURL: 'https://assemblepcparts.firebaseio.com',
  projectId: 'assemblepcparts',
  storageBucket: 'assemblepcparts.appspot.com',
  messagingSenderId: '69276848861',
  appId: '1:69276848861:web:98b819d55624fc9b9bc134'
}
firebase.initializeApp(firebaseConfig)

const myPlugin: Plugin = (_, inject) => {
  inject('firebase', firebase)
}

export default myPlugin
