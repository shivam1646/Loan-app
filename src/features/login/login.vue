<template>
  <div>
    <v-card class="ma-auto pa-12 login-card">
      <v-card-text>
        <!-- Login form -->
        <v-form ref="loginForm">
          <v-text-field
            v-model="email"
            label="Email"
            color="#01d167"
          />
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            color="#01d167"
          />
          <v-snackbar
            v-model="snackbar"
            :timeout="1000"
          >
            Invalid credentials!
          </v-snackbar>
        </v-form>
      </v-card-text>
    </v-card>
    <div class="login-form__buttons mx-auto mt-6">
      <v-btn
        class="pa-6 login-button"
        :disabled="$v.$invalid"
        @click.prevent="dispatchLogin"
      >
        Login
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'login',

  mixins: [validationMixin],

  data: () => ({
    snackbar: false
  }),

  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },

  computed: {
    ...mapFields([
      'user.email',
      'user.password'
    ])
  },

  methods: {
    ...mapActions(['login']),

    async dispatchLogin () {
      try {
        await this.login({ email: this.email, password: this.password })
        this.$router.push({ path: '/' })
      } catch (error) {
        this.snackbar = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-card, .login-form__buttons {
  width: 44rem;
  max-width: 100%;
}

.login-form__buttons {
  text-align: right;
}

.login-button {
  width: 15rem;
  border-radius: 2rem;
  background-color: $brand-primary !important;
  color: white !important;
}
</style>
