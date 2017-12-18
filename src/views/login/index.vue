<template>
  <div id="login">
    <div class="title">
      <img src="">
      <h1>登录</h1>
    </div>
    <div class="input">
      <input v-model="username" placeholder="请输入手机号"/>
    </div>
    <div class="input">
      <input v-model="password" placeholder="请输入密码" type="password"/>
    </div>
    <div class="submit">
      <a :class="{off:!canSubmit}" @click="onLogin">登 录</a>
    </div>
    <!--<div class="forget">-->
      <!--<router-link :to="{name:'password-forget'}">忘记密码?</router-link>-->
    <!--</div>-->
  </div>
</template>
<script>
  import context from '@/service'
  import {Toast, Button} from 'mint-ui'

  export default {
    name: 'login',
    path: '/login',
    keepAlive: false,
    components: {
      [Button.name]: Button
    },
    data() {
      return {
        // '17625152525', 'admin'
        username: '12345678910',
        password: ''
      }
    },
    computed: {
      canSubmit() {
        return this.username.length > 0 && this.password.length > 0
      }
    },
    methods: {
      async onLogin() {
        if(this.canSubmit) {
          if(!this.isPhone()) {
            Toast('手机号格式不正确')
            return
          }
          try {
            let res = await context.user.login(this.username, this.password)
            if(res) {
              this.$router.replace({name: 'page1'})
            }
          } catch (e) {
            if(e.response.status === 401) {
              Toast({
                message: '该手机号已被禁用，登录失败',
                className: 'ellipsis'
              })
            } else {
              Toast('手机号或密码错误')
            }
          }
        }
      },
      isPhone(num = this.username) {
        return num.charAt(0) === '1' && num.length === 11
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../../assets/style/config";
  #login {
    min-height: 100%;
    padding: 0 rem(21);
    background-color: $color-white;
    background-size: rem(350);
    background-repeat: no-repeat;
    background-position: bottom;
    .title {
      text-align: left;
      margin-bottom: rem(40);
      padding-top: rem(80);
      overflow: hidden;
      h1 {
        margin: 0;
        font-size: rem(30);
      }
      img {
        float: right;
        width: rem(60);
        height:rem(60);
        border-radius: 50%;
      }
    }
    .input {
      display: flex;
      align-items: center;
      padding-top: rem(20);
      input {
        flex: 1;
        height: rem(49);
        font-size: rem(15);
        padding-left: rem(30);
        border-radius: rem(25);
        background-color: $color-green-light;
      }
    }
    .submit {
      margin-top: rem(50);
      margin-bottom: rem(25);
      a {
        display: block;
        line-height: rem(49);
        border-radius: rem(25);
        text-align: center;
        color: $color-white;
        font-size: rem(19);
        background-color: $color-green;
       /* box-shadow: 1px 2px 10px 0 $color-shadow;*/
        &.off {
          background-color: $color-border;
          box-shadow: none;
        }
      }
    }
    .forget {
      text-align: right;
      color: $color-blue-1;
      font-size: rem(12);
    }
  }
</style>
