<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? "Sign in" : "Sign up" }}</h1>
          <p class="text-xs-center">
            <nuxt-link to="/login" v-if="!isLogin">Have an account?</nuxt-link>
            <nuxt-link to="/register" v-else>Need an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(item, field) in errors">
              <li v-for="message in item" :key="message">{{ field }} {{ message }}</li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset v-if="!isLogin" class="form-group">
              <input
                class="form-control form-control-lg"
                v-model="user.username"
                type="text"
                placeholder="Your Name"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                v-model="user.email"
                type="email"
                placeholder="Email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                v-model="user.password"
                type="password"
                placeholder="Password"
                required
                minlength="8"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? "Sign in" : "Sign up" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from '@/api/user';
const Cookie = process.client ? require('js-cookie') : undefined;
export default {
  middleware: 'notAuthenticated',
  name: 'LoginIndex',
  computed: {
    isLogin() {
      return this.$route.name === 'login';
    },
  },
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: '',
      },
      errors: {}
    };
  },
  methods: {
    async onSubmit() {
      const params = { user: this.user }
      try {
        const { data } = this.isLogin ? await login(params) : await register(params);

        // 保存用户数据
        this.$store.commit('setUser', data.user)

        // 用户数据存到cookie中，数据持久化
        Cookie.set('user', JSON.stringify(data.user))

        // 跳转到首页
        this.$router.push('/')
      } catch (error) {
        this.errors = error.response.data.errors
      }
    },
  },
};
</script>

<style>
</style>