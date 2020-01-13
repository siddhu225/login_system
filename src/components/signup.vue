<template>
  <div class="hero is-primary is-fullheight">
    <div class="hero-body">
     <div class="container">
      <div class="column is-4 is-offset-4 box">
        <div class="field has-text-centered">
          <div class="label">
            <div class="is-size-3 is-capitalized">SIGNUP FORM</div>
               <hr />
            </div>
        </div>
        <div class="login-form">
            <div class="field">
              <label class="label">Name</label>
              <div class="control has-icons-left">
                <input class="input" type="text" placeholder="e.g Alex Smith" v-model="name"><span class="icon is-small is-left"></span>
              </div>
            </div>
            <div class="field">
              <label class="label">Mobile Number</label>
              <div class="control has-icons-left">
                <input class="input" type="number" placeholder="1234567890" v-model="number"><span class="icon is-small is-left"></span>
              </div>
            </div>
            <div class="field">
              <label class="label">Email</label>
              <div class="control has-icons-left has-icons-right">
                <input class="input" type="email" placeholder="e.g. asmith@gmail.com" v-model="email"><span class="icon is-small is-left"></span><span class="icon is-small is-right"></span>
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control has-icons-left">
                <input class="input" type="password" placeholder="e.g. Password" data-lpignore="true" v-model="password"><span class="icon is-small is-left"></span>
              </div>
            </div>
            <div class="field">
              <p class="control">
                <button class="button is-primary is-medium is-fullwidth" @click="userSignup()">Sign Up</button>
              </p>
            </div>
        </div>
        <hr>
        <div class="forgot-password">
          <router-link
                  class="has-text-right"
                  v-bind:to="{ name: 'login' }"
                  style="color:blue"
          >login</router-link>
        </div>
      </div>
    </div>
   </div>
  </div>
</template>

<script>
import postservices from '../services/postservices'
export default {
  name: "signup",
  data() {
    return {
      name: '',
      number: '',
      email: '',
      password: ''
    };
  },
  components: {},
  mounted() {},
  async created() {
    
  },
  methods: {
   async userSignup() {
     await postservices.signupAdmin({
       name: this.name,
       number: this.number,
       email: this.email,
       password: this.password
     })
     this.$router.push({ name: "login" });
   }
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