<template>
  <RouterView />
</template>

<script setup lang="ts">
import { nextTick, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { sleep } from '@/utils'

onMounted(() => {
  handleShowNotify()
})

const notify_show = 'NOTIFY_SHOW'

function handleShowNotify() {
  if (sessionStorage.getItem(notify_show)) {
    return
  }
  nextTick(async () => {
    await sleep(3000)

    const notify = new Notify({
      title: '站长推荐',
      body: 'uni-halo 免费开源，点击图片查看。',
      badge: 'https://uni-halo.925i.cn/logo.png',
      icon: 'https://uni-halo.925i.cn/logo.png',
      image: 'https://uni-halo.925i.cn/images/uni-halo2.x.jpg',
      requireInteraction: !localStorage.getItem(notify_show),
      autoClose: false,
      onclick: () => {
        window.open('https://uni-halo.925i.cn/')
      },
    })

    notify.show()
    sessionStorage.setItem(notify_show, 'visible')
    localStorage.setItem(notify_show, 'visible')
  })
}
</script>
