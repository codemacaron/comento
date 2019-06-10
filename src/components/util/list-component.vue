<template lang="pug">
  .getAdvantageList
    strong(v-for="(list, index) in getAdvantageList")
      span(v-show="list.value" :class="{active : getLastValue === index}") {{ list.text }}
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'C-Listcomponent',
  computed: {
    ...mapGetters([
      'getAdvantageList',
      'getLastValue'
    ])
  },
  created () {
    this.$store.dispatch('setValueLastIndex')
  }
}
</script>

<style lang="scss">
.getAdvantageList{
  display: inline-block;
}
</style>
