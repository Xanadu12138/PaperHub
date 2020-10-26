<template>
  <section class="section">
    <div class="level">
      <p class="level-item has-text-centered">
        <b-field>
          <b-input
            placeholder="管理员用户名"
            size="is-large"
            icon="account"
            v-model="adminID"
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
          v-model="password"
          required
        >
        </b-input>
      </p>
    </div>
    <b-field grouped position="is-centered">
      <p class="control">
        <button class="button is-primary" @click="login">登 录</button>
      </p>
    </b-field>
  </section>
</template>

<script>
export default {
  data() {
    return {
      adminID: "",
      password: "",
    };
  },
  methods: {
    login() {
      console.log(this.adminID, this.password)
    },
  },
};
</script>