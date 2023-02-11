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
                v-for="(hour, name, index) in marker.hour"
                :key="`hour-${index}`"
                :class="{
                  btn: true,
                  'bg-sky-500': hour,
                  'text-white': true,
                  'w-10': true,
                  'hover:bg-slate-600': !hour,
                  'hover:bg-sky-400': hour,
                  'bg-slate-700': !hour,
                }"
                @click="updateMarkerSettings('hour', name)"
              >
                {{ name }}
              </button>
            </div>
          </td>
        </tr>
        <tr>
          <th class="bg-slate-800">Minute</th>
          <td class="bg-slate-800">
            <div class="btn-group">
              <button
                v-for="(minute, name, index) in marker.minute"
                :key="`minute-${index}`"
                :class="{
                  btn: true,
                  'bg-sky-500': minute,
                  'text-white': true,
                  'w-10': true,
                  'hover:bg-slate-600': !minute,
                  'hover:bg-sky-400': minute,
                  'bg-slate-700': !minute,
                }"
                @click="updateMarkerSettings('minute', name)"
              >
                {{ name }}
              </button>
            </div>
          </td>
        </tr>
        <tr>
          <th class="bg-slate-800">Second</th>
          <td class="bg-slate-800">
            <div class="btn-group">
              <button
                v-for="(second, name, index) in marker.second"
                :key="`second-${index}`"
                :class="{
                  btn: true,
                  'bg-sky-500': second,
                  'text-white': true,
                  'w-10': true,
                  'hover:bg-slate-600': !second,
                  'hover:bg-sky-400': second,
                  'bg-slate-700': !second,
                }"
                @click="updateMarkerSettings('second', name)"
              >
                {{ name }}
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
      marker: {},
      counter: 5,
      counterOptions: [5, 10, 15, 30, 45],
      markerChecked: true,
      counterChecked: true,
    }
  },
  methods: {
    updateMarkerSettings(unit, value) {
      this.marker[unit][value] = true
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
    console.log(this.marker)
  },
}
</script>
