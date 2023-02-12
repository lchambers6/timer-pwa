<template>
  <div class="mx-3">
    <div class="grid place-items-center">
      <h1 class="font-sans font-semibold text-2xl my- text-white">Settings</h1>
    </div>
    <div class="text-xl font-medium">Notification</div>
    <table class="table">
      <tbody>
        <tr>
          <th class="bg-slate-800">Hour</th>
          <td class="bg-slate-800">
            <div class="btn-group">
              <button
                v-for="(hourValue, index) in markerOptions.hour"
                :key="`hour-${index}`"
                :class="{
                  btn: true,
                  'text-white': true,
                  'w-10': true,
                  'bg-sky-500': marker.hour.indexOf(hourValue) > -1,
                  'hover:bg-sky-400': marker.hour.indexOf(hourValue) > -1,
                  'bg-slate-700': marker.hour.indexOf(hourValue) < 0,
                  'hover:bg-slate-600': marker.hour.indexOf(hourValue) < 0,
                }"
                @click="updateMarkerSettings('hour', hourValue)"
              >
                {{ hourValue }}
              </button>
            </div>
          </td>
        </tr>
        <tr>
          <th class="bg-slate-800">Minute</th>
          <td class="bg-slate-800">
            <div class="btn-group">
              <button
                v-for="(minuteValue, index) in markerOptions.minute"
                :key="`minute-${index}`"
                :class="{
                  btn: true,
                  'text-white': true,
                  'w-10': true,
                  'bg-sky-500': marker.minute.indexOf(minuteValue) > -1,
                  'hover:bg-sky-400': marker.minute.indexOf(minuteValue) > -1,
                  'bg-slate-700': marker.minute.indexOf(minuteValue) < 0,
                  'hover:bg-slate-600': marker.minute.indexOf(minuteValue) < 0,
                }"
                @click="updateMarkerSettings('minute', minuteValue)"
              >
                {{ minuteValue }}
              </button>
            </div>
          </td>
        </tr>
        <tr>
          <th class="bg-slate-800">Second</th>
          <td class="bg-slate-800">
            <div class="btn-group">
              <button
                v-for="(secondValue, index) in markerOptions.second"
                :key="`second-${index}`"
                :class="{
                  btn: true,
                  'text-white': true,
                  'w-10': true,
                  'bg-sky-500': marker.second.indexOf(secondValue) > -1,
                  'hover:bg-sky-400': marker.second.indexOf(secondValue) > -1,
                  'bg-slate-700': marker.second.indexOf(secondValue) < 0,
                  'hover:bg-slate-600': marker.second.indexOf(secondValue) < 0,
                }"
                @click="updateMarkerSettings('second', secondValue)"
              >
                {{ secondValue }}
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="divider"></div>
    <div class="text-xl font-medium">Counter</div>
    <table class="table">
      <tbody>
        <tr>
          <th class="bg-slate-800">Seconds</th>
          <td class="bg-slate-800">
            <select
              class="select bg-slate-700"
              v-model="counter"
              @change="saveSettings"
            >
              <option
                class="bg-slate-700 border-none focus:border-none active:border-none"
                v-for="(counterSecond, index) in counterOptions"
                :key="`counter-${index}`"
              >
                {{ counterSecond }}
              </option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'CountDownSettings',
  data() {
    return {
      marker: {
        hour: [],
        minute: [],
        second: [],
      },
      markerOptions: {
        hour: [1],
        minute: [1, 5, 10, 15, 30, 45],
        second: [5, 10, 15, 30, 45],
      },
      counter: 5,
      counterOptions: [5, 10, 15, 30, 45],
      markerChecked: true,
      counterChecked: true,
    }
  },
  methods: {
    updateMarkerSettings(unit, value) {
      let arrayIndex = this.marker[unit].indexOf(value)
      if (arrayIndex > -1) {
        this.marker[unit].splice(arrayIndex, 1)
      } else {
        this.marker[unit].push(value)
      }
      this.saveSettings()
    },
    saveSettings() {
      this.$settingsDB
        .collection('countDownTimerSettings')
        .doc({ timerType: 'countDownTimer' })
        .update({
          timerType: 'countDownTimer',
          marker: this.marker,
          counter: this.counter,
        })
    },
  },
  mounted() {
    this.$settingsDB
      .collection('countDownTimerSettings')
      .doc({ timerType: 'countDownTimer' })
      .get()
      .then((countDownTimerSettings) => {
        this.marker = countDownTimerSettings.marker
        this.counter = countDownTimerSettings.counter
      })
  },
}
</script>
