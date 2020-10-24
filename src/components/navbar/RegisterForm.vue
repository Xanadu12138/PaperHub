<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">注册</p>
      </header>
      <section class="modal-card-body">
        <b-field label="昵称">
          <b-input
            type="userName"
            :value="userName"
            placeholder="你的昵称"
            required>
          </b-input>
        </b-field>

        <b-field label="密码">
          <b-input
            type="password"
            :value="password"
            password-reveal
            placeholder="你的密码"
            required>
          </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <b-button class="button" type="button" @click="$parent.close()">关闭</b-button>
        <b-button class="button is-primary" @click="login">注册</b-button>
      </footer>
<!--      button改为b-button解决click无法setTimeout的问题-->
    </div>
  </form>
</template>
<!--use modal form-->

<script>

export default {
  name: 'LoginForm',
  data () {
    return {
      userName: '',
      password: ''
    }
  },
  methods: {
    // get name and other info through email from firestore
    getUserInfo (email) {
      return new Promise(resolve => {
        const db = firebase.firestore()
        db.collection('users').where('email', '==', email)
          .get()
          .then(query => {
            query.forEach(doc => {
              resolve({
                name: doc.data().name,
                section: doc.data().section
              })
            })
          })
          .catch(err => console.log('Error getting documents:', err))
      })
    },
    // login and authorization with firebase
    async login () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(res => {
          this.getUserInfo(res.user.email)
            .then(info => {
              // console.log(info)
              const userInfo = {
                email: res.user.email,
                name: info.name,
                section: info.section
              }
              console.log(userInfo)
              this.$store.commit('setUserInfo', userInfo)
              this.$router.push({
                path: '/home'
                // query: {
                //   user: info.name,
                //   section: info.section
                // }
              })
            })
        })
        .catch(error => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log(errorCode, errorMessage)
        })
    }
  }
}
</script>

<style scoped>

</style>
