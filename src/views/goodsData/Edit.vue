<template>
  <share
    type="edit"
    :id="id"/>
</template>

<script>
import Share from './components/Share'

export default {
  name: 'GoodsDataEdit',

  components: {
    Share
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
