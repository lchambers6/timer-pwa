<template>
  <div class="grid place-items-center">
    <button class="btn btn-outline btn-success my-3" @click="backToLanding">
      Back
    </button>
  </div>
</template>

<script>
export default {
  name: 'TimerPage',
  methods: {
    backToLanding() {
      this.$router.push('/')
    },
  },
}
</script>
