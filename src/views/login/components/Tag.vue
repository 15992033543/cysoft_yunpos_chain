<template>
  <ul class="tag-container">
    <li class="tag active">快捷登录</li>
    <li class="tag">员工登录</li>
  </ul>
</template>

<script>
export default {
  name: 'LoginTag',

  props: {
    // tags: {
    //   required: true,
    //   type: Array
    // }
  },

  data () {
    return  {
    }
  }
}
</script>

<style lang="scss" scoped>
  .tag-container {
    width: 100%;
    overflow: hidden;

    .tag {
      height: 40px;
      line-height: 40px;
      text-align: center;
      border: 1px solid #dcdfe6;
      float: left;
      box-sizing: border-box;
      width: 50%;

      &:not(:first-child) {
        border-left: none;
      }
    }
  }
</style>
