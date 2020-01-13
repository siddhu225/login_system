<template>
    <div id ="app">
        <h1>The Direct/Indirect reportees are: </h1>
        <ul id="example-1">
            <li v-for="item in data" :key="item">
            {{ item }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  props:{
      data: {
          type: Array
      }
  },
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  components: {},
  mounted() {},
  async created() {
    
  },
  methods: {
  }
};
</script>

<style scoped>
.hero.is-primary {
  background-color: #d3f1ec;
  color: #fff;
}
hr {
  background-color: #3dcabe;
}
</style>