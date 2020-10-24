<template>
  <section>
    <b-button class="button is-info"
            @click="isComponentModalActive = true">
      注 册
    </b-button>

    <b-modal :active.sync="isComponentModalActive"
              has-modal-card
              trap-focus
              aria-role="dialog"
              aria-modal>
      <register-modal v-bind="formProps"></register-modal>
    </b-modal>
  </section>
</template>

<script>
import RegisterForm from './RegisterForm'

export default {
  name: 'RegisterBtn',
    components: {
    'register-modal': RegisterForm
  },
  data () {
    return {
      isComponentModalActive: false,
      formProps: {
        userName: '',
        password: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
