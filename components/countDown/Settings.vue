<template>
  <div class="grid place-items-center">
    <div>
      <h3>Marker:</h3>
      <div>
        <p>Hour:</p>
        <p v-for="(hour, index) in marker.hour" :key="`hour-${index}`">
          {{ hour }}
        </p>
        <p>minute:</p>
        <p v-for="(minute, index) in marker.minute" :key="`minute-${index}`">
          {{ minute }}
        </p>
        <p>second:</p>
        <p v-for="(second, index) in marker.second" :key="`second-${index}`">
          {{ second }}
        </p>
      </div>
      <h3>Interval:</h3>
      <h3>Counter:</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CountDownSettings',
  data() {
    return {
      marker: {
        hour: [1],
        minute: [30, 15, 10, 5, 1],
        second: [45, 30, 15, 10, 5],
      },
      interval: {
        hour: [1],
        minute: [30, 15, 10, 5, 1],
        second: [45, 30, 15, 10, 5],
      },
      counter: { value: 10, unit: 'seconds' },
    }
  },
  methods: {},
  mounted() {
    this.$settingsDB
      .collection('countDownTimerSettings')
      .doc({ timerType: 'countDownTimer' })
      .get()
      .then((countDownTimerSettings) => {
        this.marker = countDownTimerSettings.marker
        this.interval = countDownTimerSettings.interval
        this.counter = countDownTimerSettings.counter
      })
  },
}
</script>
