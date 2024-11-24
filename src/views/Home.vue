<template>
  <div class="">
    <div
      class="bgBox"
      v-motion
      :initial="{ opacity: 0, y: 25 }"
      :enter="{ opacity: 1, y: 0 }"
      :duration="1000"
    >
      <img src="../assets/images/girl.webp" alt="girl" />
    </div>

    <div class="bgGrid">
      <div
        class="Grid"
        v-motion
        :initial="{ opacity: 0, y: -25 }"
        :enter="{ opacity: 1, y: 0 }"
        :duration="1000"
      >
        <div class="mask"></div>
        <div class="itemGrid-row" v-for="i in config.gridRows" :key="i">
          <div class="itemGrid-cols" v-for="j in config.gridCols" :key="j"></div>
        </div>
      </div>
    </div>

    <div class="main" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1 }" :duration="1000">
      <div class="info">
        <div class="header">
          <img :src="config.avatar" :alt="config.author" />
        </div>

        <div class="infoText">
          <h1>Hi,</h1>
          <h1>
            I'm <span class="qn">{{ config.author }}</span>
          </h1>
        </div>
      </div>

      <div class="typewriter">
        <i class="iconfont icon-baojiaquotation2"></i>
        <VueTyped
          :strings="typingTexts"
          :startDelay="300"
          :typeSpeed="100"
          :backSpeed="30"
          :loop="true"
          :showCursor="true"
        >
        </VueTyped>
        <i class="iconfont icon-baojiaquotation"></i>
      </div>

      <div class="btns">
        <a v-for="i in btnList" :key="i.animate" :href="i.href" target="_blank">
          <vs-button type="gradient" :color="i.color" animation-type="scale">
            <i :class="`iconfont ${i.icon}`"></i>

            <template #animate>
              {{ i.animate }}
            </template>
          </vs-button>
        </a>

        <vs-button
          class="lastBtn"
          color="#457B9D"
          animation-type="scale"
          @click="config.active = true"
        >
          <i class="iconfont icon-guanyu"></i>

          <template #animate> 关于</template>
        </vs-button>
      </div>
    </div>

    <div class="footer flex items-center justify-center gap-x-1">
      <span>2022-2024</span>
      <a href="/" target="_self" :title="config.author">{{ config.author }}</a>
      <span>丨</span>
      <a href="https://beian.miit.gov.cn/" target="_blank">{{ config.icp }}</a>
      <span>丨</span>
      <a target="_blank" title="51la网站统计" href="https://v6.51.la/s/GPZ3G9xLtawiqLD"><img class="s-51la-image" src="https://sdk.51.la/icon/1-1.png"></a>
    </div>

    <!--  弹窗信息  -->
    <vs-dialog overlay-blur width="550px" not-center v-model="config.active">
      <template #header>
        <h2 class="not-margin">关于本站</h2>
      </template>

      <div class="con-content">
        <vs-alert :color="config.themeColor" type="gradient" v-model:hidden-content="techHidden">
          <template #title>技术栈</template>
          <p>本站基于以下技术搭建</p>

          <vs-avatar-group class="aboutAva" float max="8">
            <vs-tooltip placement="top" v-for="i in avatars" :key="i.content">
              <vs-avatar :color="i.color">
                <i :class="`iconfont ${i.icon}`"></i>
              </vs-avatar>
              <template #content>{{ i.content }}</template>
            </vs-tooltip>
          </vs-avatar-group>
        </vs-alert>

        <vs-alert color="#00BCD4" type="gradient" v-model:hidden-content="aboutHidden">
          <template #title>关于项目</template>

          <p>你可以从这里访问 <b>我的博客、GitHub、哔哩哔哩和开源项目</b> ！</p>
        </vs-alert>
      </div>

      <template #footer>
        <div class="con-footer">
          <div class="reTheme">
            <input type="radio" id="light" name="theme" :checked="currentTheme == 'light'" />
            <label @click="setTheme('light')" for="light">
              <i class="iconfont icon-baitian"></i>
            </label>

            <input type="radio" id="system" name="theme" :checked="currentTheme == 'system'" />
            <label @click="setTheme('system')" for="system">
              <i class="iconfont icon-gensuixitong"></i>
            </label>

            <input type="radio" id="dark" name="theme" :checked="currentTheme == 'dark'" />
            <label @click="setTheme('dark')" for="dark">
              <i class="iconfont icon-yewan"></i>
            </label>

            <div class="checkedBg"></div>
          </div>

          <div class="footerBtn">
            <vs-button
              :color="config.themeColor"
              @click="handlePlayBgm(!bgmConfig.play)"
              type="border"
            >
              {{ bgmConfig.play ? '暂停音乐' : '播放音乐' }}
            </vs-button>
            <vs-button :color="config.themeColor" @click="handleShowVersion" type="border">
              当前版本
            </vs-button>
            <vs-button :color="config.themeColor" @click="config.active = false">
              知道啦
            </vs-button>
          </div>
        </div>
      </template>
    </vs-dialog>

    <img
      @mouseenter="handlePlayCatSound"
      class="cat w-36 hover:scale-150 origin-bottom-right transition-transform duration-300 fixed right-6 bottom-0"
      src="@/assets/images/cat_cursor.gif"
      alt="cat"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { VsNotification } from 'vuesax-alpha'
import { useTheme } from '@/hooks/theme'
import { sound } from '@pixi/sound'

interface ISound {
  id: string
  path: string
  volume: number
}

const { currentTheme, setTheme } = useTheme()

const techHidden = ref(true)
const aboutHidden = ref(true)
const typingTexts = ref([
  '嘿，欢迎来到我的主页！',
  '我是小莫唐尼',
  '一个前端开发攻城狮',
  '爱凑热闹，喜欢捣鼓前端的程序员！',
])
const btnList = ref([
  {
    icon: 'icon-wodeboke',
    animate: '博客',
    color: '#fe8599',
    href: 'https://blog.925i.cn/',
  },
  {
    icon: 'icon-github',
    animate: '开源',
    color: '#3d3d3d',
    href: 'https://uni-halo.925i.cn/',
  },
  {
    icon: 'icon-bilibili',
    animate: 'B站',
    color: '#0BA6D8',
    href: 'https://space.bilibili.com/109654087',
  },
  {
    icon: 'icon-youjian1',
    animate: '邮箱',
    color: '#FACB1E',
    href: 'mailto:studio@925i.cn',
  },
])
const avatars = ref([
  {
    color: '#43B884',
    icon: 'icon-vue',
    content: 'Vue3',
  },
  {
    color: '#46C93A',
    icon: 'icon-vuesax-linear-vuesax',
    content: 'Vuesax for Vue3',
  },
  {
    color: '#1FD0ED',
    icon: 'icon-less',
    content: 'Less',
  },
  {
    color: '#FFBA00',
    icon: 'icon-vite',
    content: 'Vite',
  },
  {
    color: '#000',
    icon: 'icon-github',
    content: 'Github',
  },
])

const bgmConfig = ref({
  current: 'sound2',
  play: true,
  list: [
    {
      id: 'sound1',
      path: '/l2d/sounds/sound1.mp3',
      volume: 0.2,
      loop: true,
    },
    {
      id: 'sound2',
      path: '/l2d/sounds/sound2.mp3',
      volume: 0.2,
      loop: true,
    },
  ],
})

const config = reactive({
  themeColor: '#409EFF',
  upTime: '2024年11月23日',
  version: '1.0.0',
  gridRows: 9,
  gridCols: 5,
  active: false,
  author: '小莫唐尼',
  avatar: 'https://blog.925i.cn/upload/avatar.jpg',
  description: '小莫唐尼，一个爱凑热闹，喜欢捣鼓前端的程序员！',
  keywords: ['小莫唐尼', '小莫', '小莫唐尼的博客', '小莫唐尼的前端博客'],
  logo: 'https://blog.925i.cn/upload/avatar.jpg',
  icp: '桂ICP备17000465号-4',
  copyright: 'Copyright © 2024 ',
  websites: [
    {
      group: '个人站点',
      title: '个人主页',
      logo: '',
      desc: '前端开发技术博客',
      url: 'https://www.xiaoxiaomo.cn/',
    },
    {
      group: '个人站点',
      title: '我的博客',
      logo: '',
      desc: '前端开发技术博客',
      url: 'https://blog.925i.cn/',
    },
    {
      group: '开源项目',
      title: 'uni-halo 文档',
      logo: '',
      desc: 'uni-halo 开源免费多端编译文档',
      url: 'https://uni-halo.925i.cn/',
    },
  ],
})

function getSiteConfig() {
  fetch('/config/index.json')
    .then((res) => res.json())
    .then((res) => {
      Object.assign(config, res)
      document.title = res.author
    })
    .catch((error) => {
      console.error(error)
    })
}

getSiteConfig()

function init() {
  initBgm()
}

onMounted(() => {
  init()
})

function initBgm() {
  bgmConfig.value.list.forEach((item) => {
    sound.add(item.id, {
      url: item.path,
      volume: item.volume,
      loop: item.loop,
    })
  })
  handlePlayBgm(true)
}

function handlePlayBgm(play: boolean) {
  bgmConfig.value.play = play
  if (bgmConfig.value.play) {
    sound.play(bgmConfig.value.current)
  } else {
    sound.stopAll()
  }
}

function handleShowVersion() {
  VsNotification({
    icon: '<i class="iconfont icon-guanyu"></i>',
    progressAuto: true,
    position: 'top-center',
    title: '当前的版本',
    color: config.themeColor,
    content: `现在是 ${config.upTime} 更新的 ${config.version}`,
  })
}

function initCatSounds() {
  for (let i = 0; i < 6; i++) {
    const id = `cat00${i + 1}`
    sound.add(id, {
      url: `/l2d/cat/${id}.mp3`,
      volume: 5,
      loop: false,
    })
  }
}

initCatSounds()

const playCatId = ref<string>("cat001")

function handlePlayCatSound() {
  sound.stop(playCatId.value)
  const random = Math.floor(Math.random() * 6) + 1
  playCatId.value = `cat00${random}`
  sound.play(playCatId.value)
}
</script>

<style lang="less">
@import url(../assets/iconfont/font.css);

.footer {
  a:hover {
    color: #409eff;
    text-decoration-line: underline;
    text-decoration-style: dashed;
    text-decoration-color: #409eff;
  }
}

@media screen and (max-width: 768px) {
  #app .main .info .infoText {
    margin-left: 0px;
  }

  .cat {
    right: 0;
    z-index: -1;
  }
}

.s-51la-image{
  width: 50px;
}
</style>
