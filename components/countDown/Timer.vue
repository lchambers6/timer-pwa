<template>
  <div class="grid place-items-center">
    <div :class="{'radial-progress': true,'text-sky-500': remainingDuration > 0, 'text-transparent': remainingDuration === 0 }" :style="styling">
      <div class="flex w-50 p-10 z-0">
        <div>
          <input
            :disabled="timerStarted"
            type="number"
            min="1"
            max="24"
            :placeholder="formattedHours"
            v-model="hours"
            class="input bg-slate-800 w-full max-w-xs text-center text-white disabled:text-white disabled:bg-slate-800"
          />
          <p class="text-white pt-2 uppercase">Hour</p>
        </div>
        <div class="divider-horizontal mx-1"></div>
        <div>
          <input
            :disabled="timerStarted"
            type="number"
            min="1"
            max="60"
            :placeholder="formattedMinutes"
            v-model="minutes"
            class="input bg-slate-800 w-full max-w-xs text-center text-white disabled:text-white disabled:bg-slate-800"
          />
          <p class="text-white pt-2 uppercase">Minute</p>
        </div>
        <div class="divider-horizontal mx-1"></div>
        <div>
          <input
            :disabled="timerStarted"
            type="number"
            min="1"
            max="60"
            :placeholder="formattedSeconds"
            v-model="seconds"
            class="input bg-slate-800 w-full max-w-xs text-center text-white disabled:text-white disabled:bg-slate-800"
          />
          <p class="text-white pt-2 uppercase">Second</p>
        </div>
      </div>
    </div>
    <div class="mt-8 btn-group">
      <button
        class="btn bg-sky-500 text-white hover:bg-slate-600"
        @click="startTimer"
      >
        Start
      </button>
      <button
        class="btn bg-sky-500 text-white hover:bg-slate-600"
        @click="stopTimer"
      >
        Stop
      </button>
      <button
        class="btn bg-sky-500 text-white hover:bg-slate-600"
        @click="resetTimer"
      >
        Reset
      </button>
    </div>
  </div>
</template>

<script>
var ci = require('correcting-interval')
export default {
  name: 'CountDownTimer',
  data() {
    return {
      intervalId: null,
      totalDuration: 0,
      remainingDuration: 0,
      timerStarted: false,
      hours: 0,
      minutes: 0,
      seconds: 0,
    }
  },
  computed: {
    formattedHours() {
      return this.hours < 10 ? `0${this.hours}` : this.hours
    },
    formattedMinutes() {
      return this.minutes < 10 ? `0${this.minutes}` : this.minutes
    },
    formattedSeconds() {
      return this.seconds < 10 ? `0${this.seconds}` : this.seconds
    },
    styling() {
      return `--value:${
        (this.remainingDuration / this.totalDuration) * 100
      }; --size:18rem; --thickness: 6px;`
    },
  },
  methods: {
    formatTimes() {
      this.hours = Math.floor(this.remainingDuration / 3600)
      this.minutes = Math.floor(this.remainingDuration / 60)
      this.seconds = this.remainingDuration % 60
    },
    calculateDuration() {
      this.totalDuration =
        Math.floor(this.hours * 3600) +
        Math.floor(this.minutes * 60) +
        this.seconds
    },
    startTimer() {
      this.calculateDuration()
      if (this.totalDuration == 0) return
      if (this.intervalId) return
      this.timerStarted = true
      this.remainingDuration = this.totalDuration
      this.intervalId = ci.setCorrectingInterval(() => {
        if (this.remainingDuration > 0) {
          this.remainingDuration--
          this.formatTimes()
        } else {
          ci.clearCorrectingInterval(this.intervalId)
          this.resetTimer()
        }
      }, 1000)
    },
    stopTimer() {
      ci.clearCorrectingInterval(this.intervalId)
      this.intervalId = null
    },
    resetTimer() {
      this.stopTimer()
      this.timerStarted = false
      this.totalDuration = 0
      this.remainingDuration = 0
      this.hours = 0
      this.minutes = 0
      this.seconds = 0
    },
  },
  mounted() {
    this.$settingsDB
      .collection('countDownTimerSettings')
      .get()
      .then((countDownTimerSettings) => {
        if (!countDownTimerSettings.length) {
          this.$settingsDB.collection('countDownTimerSettings').add({
            timerType: 'countDownTimer',
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
          })
        } else {
          console.log(countDownTimerSettings)
        }
      })
  },
}
</script>
