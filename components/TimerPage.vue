<template>
  <div class="grid place-items-center">
    <h1 class="font-sans font-semibold text-3xl mb-10 text-gray-600">
      Count Down Timer
    </h1>
      <button
        class="btn btn-outline btn-success my-3"
        @click="resetTimerType"
      >Back</button>
  </div>
</template>

<script>
export default {
  name: 'TimerPage',
  methods: {
    resetTimerType() {
      this.$emit('setTimerType', "")
    },
  },
}
</script>
