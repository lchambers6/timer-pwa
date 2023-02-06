<template>
  <div class="h-screen">
    <div class="bg-sky-500">
      <div class="flex justify-end pr-3 pt-1">
        <button class="mr-1 my-3" @click="backClicked">
          <BackIcon />
        </button>
        <button
          :class="{ 'mr-1': true, 'my-3': true, 'fill-white': !settings, 'fill-sky-600': settings }"
          @click="settings = true"
        >
          <GearIcon />
        </button>
      </div>
      <div class="text-center bg-sky-500 mt-2 mb-8 pt-0 pb-6">
        <h1 class="font-sans font-semibold text-3xl text-white">
          Count Down Timer
        </h1>
      </div>
    </div>
    <CountDownSettings v-if="settings" />
    <CountDownTimer v-else />
  </div>
</template>

<script>
export default {
  name: 'CountDownTimerPage',
  data() {
    return { settings: false }
  },
  methods: {
    backClicked() {
      if (this.settings) {
        this.settings = !this.settings
      } else {
        this.$router.push('/')
      }
    },
  },
}
</script>
