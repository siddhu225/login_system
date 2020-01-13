<template>
  <div class="hero is-primary is-fullheight">
    <div class="hero-body">
     <div class="container">
      <div class="column is-4 is-offset-4 box">
        <div class="field has-text-centered">
          <div class="label">
            <div class="is-size-2 is-capitalized">NEW USER SIGNUP FORM</div>
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
              <label class="label">Designation</label>
              <div class="control has-icons-left">
                <input class="input" type="text" placeholder="sofware engineer" v-model="designation"><span class="icon is-small is-left"></span>
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
                <label class="label">Reports_to</label>
                    <div class="control">
                        <div class="select">
                            <select v-model="reportsto">
                              <option>siddhu i am default</option>
                              <option v-for="option in reportees" :key="option" :value="option">{{option}}</option>    
                            </select>
                        </div>
                    </div>
            </div>
  
            <div class="field">
              <p class="control">
                <button class="button is-primary is-medium is-fullwidth" @click="userSignup()">Sign Up</button>
              </p>
            </div>
        </div>
        <hr>
      </div>
    </div>
   </div>
  </div>
</template>

<script>
import postservices from '../services/postservices'
 import _ from 'lodash';
export default {
  name: "user_signup",
  data() {
    return {
        name: '',
        number: '',
        email: '',
        password: '',
        designation: '',
        reportsto: '',
        options: '',
        usersData: '',
        reportees: []
    };
  },
  components: {},
  mounted() {},
  async created() {
    let res = await postservices.getUsers();
    this.usersData = res.data.users;
    _.forEach(this.usersData, (user)=> {
      this.reportees.push(user.name);
    });
  },

  methods: {
    async userSignup() {
      await postservices.signupUser({
        name: this.name,
        number: this.number,
        email: this.email,
        password: this.password,
        designation: this.designation,
        reportsto: this.reportsto,
      })
      this.$router.push({name: 'users'});
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
.select select:not([multiple]) {
    padding-right: 18rem;
}
</style>