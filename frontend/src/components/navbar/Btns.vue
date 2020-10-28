<template>
  <div class="buttons">
    <b-button class="button is-info"
            @click="isRegisterModalActive = true">注 册</b-button>
    <b-button class="button is-light"
            @click="isLoginModalActive = true">登 录</b-button>
    <!-- 注册模态框 -->
    <b-modal :active.sync="isRegisterModalActive"
              has-modal-card
              trap-focus
              aria-role="dialog"
              aria-modal>
      <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">注册</p>
      </header>
      <section class="modal-card-body">
        <b-field label="昵称">
          <b-input
            type="userName"
            v-model="userName"
            required>
          </b-input>
        </b-field>

        <b-field label="密码">
          <b-input
            v-model="password"
            required>
          </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <b-button class="button" type="button" @click="isRegisterModalActive=false">关闭</b-button>
        <b-button class="button is-primary" @click="register">注册</b-button>
      </footer>
    </div>
  </form>
    </b-modal>
    <!-- 登录模态框 -->
    <b-modal :active.sync="isLoginModalActive"
             has-modal-card
             trap-focus
             aria-role="dialog"
             aria-modal>
        <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">登录</p>
      </header>
      <section class="modal-card-body">
        <b-field label="昵称">
          <b-input
            type="userName"
            v-model="userName"
            required>
          </b-input>
        </b-field>

        <b-field label="密码">
          <b-input
            type="password"
            v-model="password"
            password-reveal
            required>
          </b-input>
        </b-field>

        <b-checkbox>记住我</b-checkbox>
      </section>
      <footer class="modal-card-foot">
        <b-button class="button" type="button" @click="isLoginModalActive=false">关闭</b-button>
        <b-button class="button is-primary" @click="login">登录</b-button>
      </footer>
<!--      button改为b-button解决click无法setTimeout的问题-->
    </div>
  </form>
    </b-modal>

  </div>
</template>

<script>

export default {
  name: 'Btns',
  data () {
    return {
      userName: '',
      password: '',
      isRegisterModalActive: false,
      isLoginModalActive: false,
    }
  },
  methods: {
    register() {
      const path = `/signUp`
      const params = this.$qs.stringify({
                          userID: this.userName, 
                          password:this.password})
      this.$axios.post(path, params)
      .then(response => {
        if (response.data.code == 0) {
          alert('注册成功')
          this.isRegisterModalActive = false
          // 清空输入
          this.userName = ''
          this.password = ''
        } else
          alert('注册失败')
      })
      .catch(err => {
        alert('注册异常')
        console.log(err)
      })
    },
    login () {
      if (this.$store.state.userInfo.userStatus == true) {
        alert('已有用户登录')
        return
      }
      const path = `/signIn`
      const params = this.$qs.stringify({
                          userID: this.userName, 
                          password: this.password})
      this.$axios.post(path, params)
      .then(response => {
        // console.log(response)
        if (response.data.code == 0) {
          this.isRegisterModalActive = false
          const userInfo = { userStatus: true, userID: this.userName}
          this.$store.commit('setUserInfo', userInfo)
          this.$router.push('/home')
          // console.log(this.$store.state.userInfo)
          // 清空输入
          this.userName = ''
          this.password = ''
        } else
          alert('登录失败')
      })
      .catch(err => {
        alert('登录异常')
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
