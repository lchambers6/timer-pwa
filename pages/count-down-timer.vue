<template>
  <div class="h-screen">
    <div class="flex justify-end p-5 pt-1">
      <BackButton />
    </div>
    <div class="grid place-items-center">
      <h1 class="font-sans font-semibold text-3xl mb-10 text-gray-600">
        Count Down Timer
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CountDownTimer',
  data() {
    return {
      initialTime: 0,
    }
  },
  methods: {},
}
</script>
