<template>
  <section class="section">
    <div class="level">
      <p class="level-item has-text-centered">
        <b-field>
          <b-input
            placeholder="管理员用户名"
            size="is-large"
            icon="account"
            maxlength="30"
            :value="userName"
            required
          >
          </b-input>
        </b-field>
      </p>
    </div>
    <div class="level">
      <p class="level-item has-text-centered">
        <b-input
          placeholder="管理员密码"
          size="is-large"
          icon="key"
          maxlength="30"
          :value="password"
          required
        >
        </b-input>
      </p>
    </div>
    <!-- <b-field
      label="管理员名"
      :type="{ 'is-danger': hasError }"
      :message="{ 'Username is not available': hasError }"
    >
      <b-input value="johnsilver" maxlength="30"></b-input>
    </b-field>

    <b-field
      label="管理员密码"
      :type="{ 'is-danger': hasError }"
      :message="[
        { 'Password is too short': hasError },
        { 'Password must have at least 8 characters': hasError },
      ]"
    >
      <b-input value="123" type="password" maxlength="30"></b-input>
    </b-field>
     -->
    <b-field grouped position="is-centered">
      <p class="control">
        <button class="button is-primary" @click="login">Login</button>
      </p>
    </b-field>
  </section>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      password: "",
    };
  },
  methods: {
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
    async login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((res) => {
          this.getUserInfo(res.user.email).then((info) => {
            // console.log(info)
            const userInfo = {
              email: res.user.email,
              name: info.name,
              section: info.section,
            };
            console.log(userInfo);
            this.$store.commit("setUserInfo", userInfo);
            this.$router.push({
              path: "/home",
              // query: {
              //   user: info.name,
              //   section: info.section
              // }
            });
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    },
  },
};
</script>