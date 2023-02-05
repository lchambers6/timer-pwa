<template>
  <div class="grid h-screen place-items-center">
    <div class="grid place-items-center">
      <h1 class="font-sans font-semibold text-3xl mb-10 text-gray-600">
        Select Timer Type
      </h1>
      <div v-for="(timerType, index) in timerTypes" :key="index">
        <ButtonComponent
          :buttonName="timerType"
          @buttonClicked="selectTimer(timerType)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  data() {
    return {
      timerType: '',
      timerTypes: ['count-down-timer', 'tabata', 'stopwatch'],
    }
  },
  methods: {
    selectTimer(timerType) {
      this.$router.push({ name: timerType })
    },
  },
}
</script>
