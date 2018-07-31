<template>
  <div></div>
</template>

<script>
export default {
  name: 'Refresh',

  created () {
    const options = this.$route.params.options
    if (options) {
      options.refresh = true
      options.replace = true
      this.$appPush(options)
    } else {
      this.$appPush({ replace: true, name: 'Home' })
    }
  }
}
</script>
