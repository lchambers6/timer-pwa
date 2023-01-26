<template>
  <div class="grid h-screen place-items-center">
    <Landing :timerTypes="timerTypes" @selectTimerType="selectTimerType" />
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      timerType: '',
      timerTypes: ['count-down-timer', 'tabata', 'stopwatch'],
    }
  },
  methods: {
    selectTimerType(timerType) {
      this.$router.push({ name: timerType })
    },
  },
}
</script>
