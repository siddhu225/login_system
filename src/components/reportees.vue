<template>
    <div id="reportees">
    <h1>Total Reportees</h1>
    <b-tabs type="is-toggle" expanded>
        <b-tab-item label="Direct reporters">
          <reporteesto :data = "direct_reportees"></reporteesto>
        </b-tab-item>
        <b-tab-item label="Indirect repoters">
          <reporteesto :data = "indirect_reportees"></reporteesto>
        </b-tab-item>
    </b-tabs>
    </div>
</template>

<script>
import reporteesto from './reportees_to.vue'
 import _ from 'lodash';
import postservices from '../services/postservices'
export default {
  props: {
    userId: {
      required: true,
      type: String
    }
  },
  name: "reportees",
  data() {
    return {
      usersData: [],
      direct_reportees: [],
      indirect_reportees: []
    };
  },
  components: {reporteesto},
  mounted() {},
  async created() {
    let res = await postservices.getUsers();
    this.usersData = res.data.users;
    const user = _.find(this.usersData, {_id : this.userId});
    this.direct_reportees = _.filter(this.usersData, (u)=>{
      return u.reportsto === user.name
    });
    _.forEach(this.usersData, (u) => {
      if (user.reportesto === u.reportesto) {
        this.indirect_reportees.push(u.name);
      }
    })
    if (this.indirect_reportees) {
      _.forEach(this.indirect_reportees, (u) => {
        _.forEach(this.usersData,(u1)=>{
          if (u1.reportsto === u) {
            this.indirect_reportees.push(u1.name);
          }
        })
      })
    }
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