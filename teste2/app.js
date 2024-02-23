Vue.component('user-form', {
      data() {
        return {
          photo: '',
          firstName: '',
          lastName: '',
          showImage: false,
		  background: 'lightblue'
        };
      },
      methods: {
        submitForm() {
          this.$emit('form-submitted', {
            photo: this.photo,
            firstName: this.firstName,
            lastName: this.lastName
          });
        },
        triggerFileInput() {
          this.$refs.fileInput.click();
        },
        handleFileChange(event) {
          const file = event.target.files[0];
          if (file) {
            this.photo = URL.createObjectURL(file);
            this.showImage = true;
          }

          this.submitForm();
        }
      },
      template: `
        <div class="form-container">
          <form @submit.prevent="submitForm">
            <button type="button" @click="triggerFileInput">Selecionar Foto</button>
            <input type="file" id="photo" ref="fileInput" @change="handleFileChange" style="display: none">
			
            <label for="firstName">Nome:</label>
            <input type="text" id="firstName" v-model="firstName" @input="submitForm">

            <label for="lastName">Sobrenome:</label>
            <input type="text" id="lastName" v-model="lastName" @input="submitForm">

          </form>
        </div>
      `,
    });

    Vue.component('user-card', {
      props: ['userData'],
      template: `
        <div class="card-container">
          <img :src="userData.photo" v-if="showImage">
          <p>{{ userData.firstName }} {{ userData.lastName }}</p>
        </div>
      `,
      data() {
        return {
          userColor: 'lightblue',
          showImage: false
        };
      },
      watch: {
        userData: {
          deep: true,
          handler(newVal) {
            this.showImage = true;
            this.$emit('card-updated', newVal);
          }
        }
      },
      methods: {
        changeColor(color) {
			this.userColor = color;
        }
      }
    });

    Vue.component('user-container', {
      data() {
        return {
          userFormData: {},
		  userColor: 'lightblue'
        };
      },
      template: `
        <div class="user-container">
          <user-card :user-data="userFormData" :style="{ backgroundColor: userColor }"></user-card>
          <user-form @form-submitted="updateUserFormData"></user-form>

          <div class="color-buttons">
            <button @click="changeCardColor('#CCC')">Cinza</button>
            <button @click="changeCardColor('#ECB117')">Dourado</button>
            <button @click="changeCardColor('#9B0021')">Vinho</button>
          </div>
        </div>
      `,
      methods: {
        updateUserFormData(data) {
          this.userFormData = data;
        },
        changeCardColor(color) {
          //this.$refs.userCard.changeColor(color);
		  //this.userCard.changeColor(color);
		  this.userColor = color;
        }
      }
    });

    new Vue({
      el: '#app',
      template: '<user-container ref="userCard"></user-container>'
    });