<template>
  <div>
    <button class="btn btn-outline bg-sky-500 my-3 text-white" @click="buttonClicked">
      {{ buttonName }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: {
    buttonName: { type: String, default: 'Click', required: true },
  },
  methods: {
    buttonClicked() {
      this.$emit('buttonClicked')
    }
  },
}
</script>
