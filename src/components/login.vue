<template>
  <div class="hero is-primary is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-5-widescreen">
            <div class="box">
              <div class="field has-text-centered">
                <div class="label">
                  <div class="is-size-3 is-capitalized">LOGIN FORM</div>
                  <hr />
                </div>
              </div>
              <div class="field">
                <label for="email" class="label is-capitalized has-text-left">Email</label>
                <div class="control has-icons-left">
                  <input
                    type="email"
                    placeholder="e.g. bobsmith@gmail.com"
                    class="input"
                    v-model="email"
                    required
                  />
                  <span class="icon is-small is-left has-text-grey-dark">
                    <i class="fa fa-envelope"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label for class="label has-text-left">Password</label>
                <div class="control has-icons-left">
                  <input
                    type="password"
                    placeholder="*******"
                    class="input"
                    v-model="password"
                    required
                  />
                  <span class="icon is-small is-left has-text-grey-dark">
                    <i class="fa fa-lock"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <router-link
                  class="has-text-right"
                  v-bind:to="{ name: 'signup' }"
                  style="color:blue"
                >sign in</router-link>
              </div>
              <div class="field">
                <button class="button is-success" @click="onLogin">Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import postservices from '../services/postservices'
export default {
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
    async onLogin() {
      let { data } = await postservices.loginUser({
        email: this.email,
        password: this.password
      });
      if (data.msg === 'not_user') {
        this.$router.push({ name: "login" });
      } else if (data.msg === 'admin') {
        this.$router.push({ name: "users" });
      } else {
        this.$router.push({
          name: "reportees",
          params: { userId: data.user._id }
        });
      }
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