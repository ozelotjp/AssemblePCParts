<template>
  <section class="section">
    <div class="container">
      <div class="level">
        <div class="level-left">
          <h1 class="title">
            AssemblePCParts
          </h1>
        </div>
        <div class="level-right">
          <div class="buttons">
            <b-button icon-left="link">
              ページを共有
            </b-button>
            <b-button
              :loading="loadAmazonDetailsLoading"
              icon-left="refresh"
              @click="loadAmazonDetails"
            >
              最新情報を取得
            </b-button>
          </div>
        </div>
      </div>
      <b-table :columns="table.columns" :data="table.data" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from '@vue/composition-api'
import {
  IGetAmazonDetails,
  IGetAmazonDetailsFunc
} from '@@/models/functions/getAmazonDetails'

export default defineComponent({
  setup(_, { root: { $firebase } }) {
    $firebase.auth().onAuthStateChanged((user) => {
      if (user === null) {
        $firebase
          .auth()
          .signInWithRedirect(new $firebase.auth.GoogleAuthProvider())
      }
    })

    const data = ref(
      [] as {
        category: string
        id: string
        title: string
        price: number
      }[]
    )

    const categories = [
      'ケース',
      'ファン',
      '電源',
      'M/B',
      'CPU',
      'CPUクーラ',
      'メモリ',
      'GPU',
      'SSD',
      'HDD',
      'OS',
      'マウス',
      'キーボード',
      'モニタ',
      'オーディオ'
    ]

    const table = reactive({
      columns: [
        { field: 'category', label: 'Category' },
        { field: 'id', label: 'ID' },
        { field: 'title', label: 'Name', width: '70%' },
        { field: 'price', label: 'Price' }
      ],
      data
    })

    const loadFromStore = () => {
      table.data = [
        { category: 'GPU', id: 'B07QR8S6GF', title: '', price: NaN }
      ]
      table.data.sort((a, b) => {
        const c = categories.findIndex((i) => i === a.category)
        const d = categories.findIndex((i) => i === b.category)
        return c < d ? 1 : c > d ? -1 : 0
      })
    }
    loadFromStore()

    const loadAmazonDetailsLoading = ref(false)
    const loadAmazonDetails = () => {
      loadAmazonDetailsLoading.value = true
      $firebase
        .app()
        .functions('asia-northeast1')
        .httpsCallable('getAmazonDetails')({
          items: table.data.map((item) => item.id)
        } as IGetAmazonDetailsFunc)
        .then((response: IGetAmazonDetails) => {
          response.data.forEach((item) => {
            const i = response.data.findIndex((i) => i.id === item.id)
            table.data[i].title = item.title
            table.data[i].price = item.price
          })
        })
        .catch((error) => {
          console.error({ error })
        })
        .finally(() => {
          loadAmazonDetailsLoading.value = false
        })
    }

    return {
      table,
      loadAmazonDetailsLoading,
      loadAmazonDetails
    }
  }
})
</script>
