<template>
  <v-card width="400" class="mx-auto mt-5">
        <v-card-title>
            <h1 class="display-1">Login</h1>
        </v-card-title>

        <v-card-text>
            <v-form>
				<v-text-field type="text" label="Login" prepend-icon="mdi-account-circle" v-model="loginField"/>
				<v-text-field :type="showPassword ? 'text' : 'password'" 
				label="Senha" prepend-icon="mdi-lock"  
				:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" 
				@click:append="showPassword = !showPassword" v-model="senhaField"/>
            </v-form>
        </v-card-text>

		<v-divider></v-divider>

		<v-card-actions>
			<v-btn color="success">Cadastrar</v-btn>
			<v-spacer></v-spacer>
			<v-btn color="info" @click="Logar">Logar</v-btn>
		</v-card-actions>

  </v-card>
</template>

<script>

	export default {
		data: () => ({
			showPassword: false,
			loginField: "",
			senhaField: ""
		}),

		methods: {
			Logar: function() {
				//http://10.194.24.110:3001/usuario/login
				this.axios.post('http://localhost:3001/usuario/login', { 
					usuario: this.loginField,
					senha: this.senhaField
				})
				.then(function (response) {
					console.log(response)
				})
				.catch(function (error) {
					console.log(error)
				});
			}
		}
	}

</script>

<style>

</style>