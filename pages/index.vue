<template>
  <div class="container grid h-screen place-items-center">
    <Landing
      v-if="!timerType"
      :timerTypes="timerTypes"
      @setTimerType="setTimerType"
    />
    <TimerPage
      v-else-if="timerType === 'count down timer'"
      @setTimerType="setTimerType"
    />
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      timerType: '',
      timerTypes: ['count down timer', 'tabata', 'stopwatch'],
    }
  },
  methods: {
    setTimerType(timerType) {
      this.timerType = timerType
    },
  },
}
</script>
