<template>
  <div>
    <header>
      <b-navbar shadow>
        <template slot="brand">
          <b-navbar-item tag="router-link" to="/">
            AssemblePCParts
          </b-navbar-item>
        </template>
        <template slot="end">
          <b-navbar-item tag="div">
            <div v-if="isAuthenticated" class="buttons">
              <b-button tag="router-link" to="/new" icon-left="plus">
                新規作成
              </b-button>
            </div>
            <div v-else class="buttons">
              <b-button
                tag="router-link"
                to="/auth/signin"
                icon-left="login-variant"
              >
                ログイン
              </b-button>
            </div>
          </b-navbar-item>
        </template>
      </b-navbar>
    </header>
    <main>
      <nuxt />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

export default defineComponent({
  setup(_, { root: { $firebase } }) {
    const isAuthenticated = computed(
      () => $firebase.auth().currentUser !== null
    )

    return {
      isAuthenticated
    }
  }
})
</script>
