<template>
    <div class="login">
      <h1>User login page</h1>
      <input  v-model="username" placeholder="Enter Username">
      <input  v-model="password" type="password" placeholder="Enter Password">
      <button @click="login">Login</button>
    </div>
</template>

<script>
    import axios from 'axios'
    import { mapMutations } from 'vuex';
    export default {
        name: "Login",
        data:function () {
            return {
              username:'',
              password:''
            }
        },
      methods:{
          ...mapMutations(['changeLogin']),
          login:function () {
            let _this = this;
              console.log("submit login.")
            axios.post('http://localhost:9501/user/login', {
              username: this.username,
              password: this.password
            }).then(function (response) {
              console.log(response);
              let res = response.data;
              if(res.code == 404){
                alert("username or password is incorrect.");
              }else {
                _this.userToken = 'Bearer ' + res.data.token;
                // 将用户token保存到vuex中
                _this.changeLogin({ Authorization: _this.userToken ,username: res.data.username});
                _this.$router.push('/');
                alert('login success');
              }

            }).catch(function (error) {
              console.log(error);
            });
          }
      }
    }
</script>

<style scoped>
    .login {
      width: 90%;
      height: auto;
      padding: 10px;
      display: inline-block;
      text-align: center;
      background-color: wheat;

    }
    .login h1 {
      width: 90%;
      align-content: center;
      font-size: 12px;
      margin-bottom: 5px;
    }
    .login input{
      width: 95%;
      line-height: 16px;
      margin: 10px;
    }
    .login button {
      background-color: #42b983;
      border-radius: 10px;
    }

</style>
