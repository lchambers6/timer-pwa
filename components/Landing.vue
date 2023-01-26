<template>
  <div class="grid place-items-center">
    <h1 class="font-sans font-semibold text-3xl mb-10 text-gray-600">
      Select Timer Type
    </h1>
    <div v-for="(timerType, index) in timerTypes" :key="index">
      <button
        class="btn btn-outline btn-success my-3"
        @click="selectTimer(timerType)"
      >
        {{ timerType }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Landing',
  props: {
    timerTypes: { type: Array, default: [], required: true },
  },
  methods: {
    selectTimer(timerType) {
      this.$emit('selectTimerType', timerType)
    },
  },
}
</script>
