<template>
  <shared
    type="edit"
    :id="id"/>
</template>

<script>
import Shared from './components/Shared'

export default {
  name: 'GoodsDataEdit',

  components: {
    Shared
  },

  data () {
    return {
      id: ''
    }
  },

  created () {
    this.id = this.$route.query.id
  }
}
</script>
