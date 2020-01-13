<template>
  <div id="app">
    <h2 style="color:red"><strong>ALL USERS</strong></h2>
    <button class="small ui button"
            style="background-color:green" 
            @click="addEmployee()">
            <i class="fa fa-plus"></i>ADD NEW MEMBER
    </button>
  <div id="table-wrapper" class="ui container">
  <vuetable 
    ref="vuetable"
    :api-mode="false"
    :fields="fields"
    :data="usersData"
    pagination-path=""
    :per-page="5"
    :sort-order="sortOrder"
    @vuetable:pagination-data="onPaginationData"
    @vuetable:loading="onLoading"        
    @vuetable:loaded="onLoaded"
  >
    <template slot="actions" slot-scope="props">
      <div class="table-button-container">
          <button class="small ui button" 
            @click="deleteRow(props.rowData)">
            <i class="fa fa-trash"></i>
          </button>
      </div>
      </template>
    </vuetable>
    <vuetable-pagination ref="pagination"
      @vuetable-pagination:change-page="onChangePage"
    ></vuetable-pagination>
  </div>
</div>
</template>

<script>
import postservices from '../services/postservices'
import vuetable from "vuetable-2";
export default {
  name: "users",
  data() {
    return {
      sortOrder: [
      {
          field: 'name',
          sortField: 'name',
          direction: 'asc'
      }
    ],
    usersData: [],
    fields: [
      { 
        name: 'name', 
        title: `<span class="icon orange"><i class="fa fa-user"></i></span> Full Name`,
        sortField: 'name',
        width: "22%"
      },
      {
        name: 'number',
        title: 'Number',
        width: "22%"
      }, 
      {
        name: 'email',
        title: 'Email',
        sortField: 'email',
        width: "22%"
      },
      {
        name: 'designation',
        title: 'designation',
        width: "22%"
      },
      {
        name: 'reportsto',
        title: 'reportsto',
        width: "22%"
      },
      { 
        name: 'actions', 
        title: 'Actions',
        width: "22%"
      },
    ],
  }
  },
  components: {vuetable, 'vuetable-pagination': vuetable.VuetablePagination},
  mounted() {},
  async created() {
    let res = await postservices.getUsers();
    this.usersData = res.data.users;
  },
  computed: {
    /*httpOptions(){
    return {headers: {'Authorization': "my-token"}} //table props -> :http-options="httpOptions"
  },*/
  },
  methods: {
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
    async deleteRow(rowData){
      await postservices.deleteUser({
        _id : rowData._id,
      });
      this.$router.push({name: 'users'});
    },
    async addEmployee() {
      this.$router.push({name: 'user_signup'});
    },
    onLoading() {
      console.log('loading... show your spinner here')
    },
    onLoaded() {
      console.log('loaded! .. hide your spinner here')
    }
  },
}
</script>

<style scoped>
div >>> .table thead th {
  border: 1px solid #dbdbdb !important;
  color:blueviolet;
}
div >>> .table tr td {
  border: 1px solid #dbdbdb !important;
}
.tableBorder {
  border: 1px solid #dbdbdb;
  border-top: 0px solid #dbdbdb;
}
td {
  width: 1000px;
  height: 70px;
  padding: 15px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-left: 40px;
  margin-right: 40px;
}

h2 {
  margin-top: 20px!important;
  margin-bottom: 10px;
}

.orange {
  color: orange;
}

th.sortable {
  color: #ec971f;
}

span.icon.sort-icon {
  float: right;
}
</style>