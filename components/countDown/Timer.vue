<template>
  <div class="grid place-items-center mt-6">
    <div
      class="relative radial-progress text-slate-600"
      style="--value: 100; --size: 18rem; --thickness: 6px"
    >
      <div
        :class="{
          absolute: true,
          'radial-progress': true,
          'text-sky-500': remainingDuration > 0,
          'text-transparent': remainingDuration === 0,
        }"
        :style="styling"
      >
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
      counterAudio: null,
      markerAudio: null,
      marker: {
        hour: [],
        minute: [],
        second: [],
      },
      counter: 5,
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
    playSound(soundName) {
      this[soundName].play()
    },
    formatTimes() {
      this.hours = Math.floor(this.remainingDuration / 3600)
      this.minutes = Math.floor(this.remainingDuration / 60)
      this.seconds = this.remainingDuration % 60
      if (this.marker.hour.indexOf(this.hours) > -1 && this.seconds === 0) {
        this.playSound('hourMarkerAudio')
      }
      if (this.marker.minute.indexOf(this.minutes) > -1 && this.seconds === 0) {
        this.playSound('minuteMarkerAudio')
      }
      console.log(this.minutes)
      if (
        this.marker.second.indexOf(this.seconds) > -1 &&
        this.hours === 0 &&
        this.minutes === 0
      ) {
        this.playSound('secondMarkerAudio')
      }
      if (
        this.seconds <= this.counter &&
        this.hours === 0 &&
        this.minutes === 0
      ) {
        if (this.seconds === 0) {
          this.playSound('hourMarkerAudio')
          this.playSound('minuteMarkerAudio')
          this.playSound('secondMarkerAudio')
          this.playSound('counterAudio')
        } else if (this.marker.second.indexOf(this.seconds) > -1) {
          this.playSound('secondMarkerAudio')
        } else {
          this.playSound('counterAudio')
        }
      }
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
    this.counterAudio = new Audio(require('@/assets/sounds/counter.mp3'))
    this.hourMarkerAudio = new Audio(require('@/assets/sounds/hourMarker.mp3'))
    this.minuteMarkerAudio = new Audio(
      require('@/assets/sounds/minuteMarker.mp3')
    )
    this.secondMarkerAudio = new Audio(
      require('@/assets/sounds/secondMarker.mp3')
    )
    this.$settingsDB
      .collection('countDownTimerSettings')
      .doc({ timerType: 'countDownTimer' })
      .get()
      .then((countDownTimerSettings) => {
        this.marker = countDownTimerSettings.marker
        this.counter = countDownTimerSettings.counter
      })
      .catch(() => {
        this.$settingsDB.collection('countDownTimerSettings').add({
          timerType: 'countDownTimer',
          marker: {
            hour: [],
            minute: [],
            second: [],
          },
          counter: 5,
        })
      })
  },
}
</script>
