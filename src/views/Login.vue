<template>
    <v-container>
        <v-layout row wrap>
            <v-flex md-6 style="border: 1px solid black; height: 500px">
                <h2>Sign In</h2>
                <v-container>
                    <v-form>
                        <v-text-field outline v-model="signinName" :counter="10" label="Name" required></v-text-field>
                        <v-text-field outline v-model="signinEmail" label="E-mail" required></v-text-field>
                        
                        <v-text-field
                            v-model="signinPassword"
                            :append-icon="show1 ? 'visibility_off' : 'visibility'"
                            :rules="[rules.required, rules.min]"
                            :type="show1 ? 'text' : 'password'"
                            name="input-10-1"
                            label="Normal with hint text"
                            hint="At least 8 characters"
                            counter
                            @click:append="show1 = !show1" >
                        </v-text-field>

                    </v-form>
                </v-container>
            </v-flex>

            <v-flex md-6 style="border: 1px solid black; height: 500px">
                <h2>Login</h2>
                <v-form>
                    <v-text-field
                    v-model="signupEmail"
                    :counter="10"
                    label="Name"
                    required
                    ></v-text-field>
                    <v-text-field
                    v-model="signupPassword"
                    label="E-mail"
                    required
                    ></v-text-field>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data () {
      return {
        show1: false,
        signinName: '',
        signinEmail: '',
        signinPassword: '',
        signupEmail: '',
        signupPassword: '',
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => ('The email and password you entered don\'t match')
        }
      }
    }
}
</script>

<style>

</style>
