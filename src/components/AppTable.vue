<template>
  <el-table
    :data="data"
    border
    style="width: 100%"
    height="500">
    <slot></slot>
  </el-table>
</template>

<script>
export default {
  props: {
    data: Array
  }
}
</script>

<style>

</style>
