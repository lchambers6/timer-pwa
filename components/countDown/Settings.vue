<template>
  <div class="grid h-screen place-items-center">
    <div class="grid place-items-center">
      <h1 class="font-sans font-semibold text-3xl mb-10 text-gray-600">
        Settings
      </h1>
      <div></div>
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
}
</script>
