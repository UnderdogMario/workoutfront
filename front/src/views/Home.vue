<template>
  <div class="home">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" role="navigation">
      <div class="container">
        <a class="navbar-brand" href="#">Mario</a>
        <button class="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#exCollapsingNavbar">
          &#9776;
        </button>
        <div class="collapse navbar-collapse" id="exCollapsingNavbar">
          <ul class="nav navbar-nav">
            <li class="nav-item"><a href="#" class="nav-link">Home</a></li>
            <li class="nav-item"><a href="#" class="nav-link">Link</a></li>
            <li class="nav-item"><a href="#" class="nav-link">Service</a></li>
            <li class="nav-item"><a href="#" class="nav-link">More</a></li>
          </ul>
          <ul class="nav navbar-nav flex-row justify-content-between ml-auto">
            <li class="nav-item order-2 order-md-1">
              <a href="#" class="nav-link" title="settings">
              <i class="fa fa-cog fa-fw fa-lg"></i>
              </a>
            </li>

            <li class="dropdown order-1">
              <button type="button" id="dropdownMenu1" data-toggle="dropdown" class="btn btn-outline-secondary">
                <span v-if="!this.$store.state.login">Login/Register</span>
                <span v-if="this.$store.state.login">{{this.userName}}</span>
              </button>
              <ul class="dropdown-menu dropdown-menu-right mt-2">
                <li class="px-3 py-2 mt-2" v-if="!this.$store.state.login">
                  <form class="form" role="form" v-on:submit.prevent="onSubmit">
                    <div class="form-group">
                      <input id="emailInput" placeholder="Email" class="form-control form-control-sm" type="text" :class="fail ? 'is-invalid':''" required="" name="loginemail">
                    </div>
                    <div class="form-group">
                      <input id="passwordInput" placeholder="Password" class="form-control form-control-sm" type="password" :class="fail ? 'is-invalid':''" required="" name="loginpassword">
                    </div>
                    <div class="form-group">
                      <button id="login" class="btn btn-primary btn-block">Login</button>
                    </div>
                    <div class="form-group">
                      <button id="register" class="btn btn-primary btn-block">Register</button>
                    </div>
                  </form>
                </li>
                <li class="px-3 py-2 mt-2" v-if="this.$store.state.login">
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item" v-if="!ifedit">Email: {{this.userInfo.Email}}</li>
                    <li class="list-group-item" v-if="ifedit">Email: <input type="text" v-model="this.userInfo.Email"></li>
                    <li class="list-group-item" v-if="!ifedit">Name: {{this.userInfo.Name}}</li>
                    <li class="list-group-item" v-if="ifedit">Email: <input type="text" v-model="this.userInfo.Name"></li>
                    <li class="list-group-item" v-if="!ifedit">Phone: {{this.userInfo.Phone}}</li>
                    <li class="list-group-item" v-if="ifedit">Email: <input type="text" v-model="this.userInfo.Phone"></li>
                    <li class="list-group-item"><button type="button" class="btn btn-info block" v-on:click="edit">Edit <font-awesome-icon class="icon" icon="pen"/></button></li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import $ from 'jquery'
$('.dropdown-toggle').on('click', function () {
  $(this).next().toggle();
});
$('.dropdown-menu.keep-open').on('click', function (e) {
  e.stopPropagation();
});

export default {
  name: 'Home',
  components: {

  },
  data: function () {
    return {
      fail: false,
      userInfo:{},
      ifedit: false
    }
  },
  computed: {
    userName: function () {
      if(this.userInfo.Name) {
        return this.userInfo.Name
      } else {
        return "User"
      }
    }
  },
  mounted() {
    // console.log(this.userInfo.Name)
  },
  methods: {
    onSubmit: function (submitEvent) {
      if (submitEvent.submitter.id == "login") {
        axios({
          url: 'http://localhost:8000/login',
          method: 'POST',
          withCredentials: true,
          data: {
            email: submitEvent.target.elements.loginemail.value,
            password: submitEvent.target.elements.loginpassword.value
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((response) => {
          console.log(response)
          this.fail = false
          localStorage.setItem("sid", response.headers["x-auth"])
          this.$store.commit('signin')
          this.userInfo = response.data
        }).catch((error) => {
          console.log(error)
          this.fail = true
          if (error.response.status == 400) {
            console.log("You Pass Bad Information")
          } else if (error.response.status == 401) {
            console.log("Your Information is wrong")
          } else {
            console.log("Server is fucked")
          }
        })
      } else {
        axios({
          url: 'http://localhost:8000/register',
          method: 'POST',
          withCredentials: true,
          data: {
            email: submitEvent.target.elements.loginemail.value,
            password: submitEvent.target.elements.loginpassword.value
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((response) => {
          console.log(response)
        })
      }
    },
    edit: function () {
      this.ifedit = true
    }
  },

}
</script>

<style scoped>
  .dropdown-menu {
    width: 20rem;
  }
  .block {
    float: right;
    display: block;
    border: none;
    padding: 0.1rem 0.2rem;
    font-size: 0.8rem;
    cursor: pointer;
    text-align: center;
  }

</style>
