<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="user.image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="user.username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="user.bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="email"
                  placeholder="Email"
                  v-model="user.email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="user.password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right" type="submit">
                Update Settings
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { update } from '@/api/user'
import { mapState } from 'vuex'
export default {
  middleware: 'authenticated',
  name: 'SettingsIndex',
  data() {
    return {
      user: {
        email: '',
        username: '',
        bio: '',
        image: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapState({ userinfo: 'user' })
  },
  methods: {
    // 更新api报错 没法过去
    // "An operation failed because it depends on one or more records that were required but not found. Record to update not found."
    async onSubmit () {
      const hasChange = Object.values(this.user).some(v => v)
      if (!hasChange) return
      const { data: { user } } = await update({ user: {...this.user, token: this.userinfo.token } })

      // 更新store里面的user
      this.$store.commit('setUser', user)

      // 跳转到 用户详情
      this.$router.push({ name: 'profile', params: { username: user.username } })
    }
  }
};
</script>

<style>
</style>