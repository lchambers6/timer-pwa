<template>
  <div>
    <div class="grid place-items-center">
      <h1 class="font-sans font-semibold text-3xl my-2 text-white">Settings</h1>
    </div>
    <div class="collapse">
      <input type="checkbox" v-model="markerChecked" />
      <div class="collapse-title text-xl font-medium">Marker</div>
      <div class="collapse-content">
        <div class="overflow-x-auto">
          <table class="table w-full">
            <tbody>
              <tr>
                <th class="bg-slate-800">Hour</th>
                <td
                  class="bg-slate-800"
                  v-for="(hour, index) in marker.hour"
                  :key="`hour-${index}`"
                >
                  {{ hour }}
                </td>
              </tr>
              <tr>
                <th class="bg-slate-800">Minute</th>
                <td
                  class="bg-slate-800"
                  v-for="(minute, index) in marker.minute"
                  :key="`minute-${index}`"
                >
                  {{ minute }}
                </td>
              </tr>
              <tr>
                <th class="bg-slate-800">Second</th>
                <td
                  class="bg-slate-800"
                  v-for="(second, index) in marker.second"
                  :key="`second-${index}`"
                >
                  {{ second }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <div class="collapse">
      <input type="checkbox" v-model="intervalChecked" />
      <div class="collapse-title text-xl font-medium">Interval</div>
      <div class="collapse-content">
        <div class="overflow-x-auto">
          <table class="table w-full">
            <tbody>
              <tr>
                <th class="bg-slate-800">Hour</th>
                <td
                  class="bg-slate-800"
                  v-for="(hour, index) in interval.hour"
                  :key="`hour-${index}`"
                >
                  {{ hour }}
                </td>
              </tr>
              <tr>
                <th class="bg-slate-800">Minute</th>
                <td
                  class="bg-slate-800"
                  v-for="(minute, index) in interval.minute"
                  :key="`minute-${index}`"
                >
                  {{ minute }}
                </td>
              </tr>
              <tr>
                <th class="bg-slate-800">Second</th>
                <td
                  class="bg-slate-800"
                  v-for="(second, index) in interval.second"
                  :key="`second-${index}`"
                >
                  {{ second }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <div class="collapse">
      <input type="checkbox" v-model="counterChecked" />
      <div class="collapse-title text-xl font-medium">Counter</div>
      <div class="collapse-content">
        <div class="overflow-x-auto">
          <table class="table w-full">
            <tbody>
              <tr>
                <th class="bg-slate-800">{{ counter.unit }}</th>
                <td class="bg-slate-800">
                  {{ counter.value }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CountDownSettings',
  data() {
    return {
      marker: {},
      interval: {},
      counter: {},
      markerChecked: false,
      intervalChecked: false,
      counterChecked: false,
    }
  },
  watch: {
    markerChecked() {
      if (this.markerChecked) {
        this.intervalChecked = false
        this.counterChecked = false
      }
    },
    intervalChecked() {
      if (this.intervalChecked) {
        this.markerChecked = false
        this.counterChecked = false
      }
    },
    counterChecked() {
      if (this.counterChecked) {
        this.intervalChecked = false
        this.markerChecked = false
      }
    },
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
