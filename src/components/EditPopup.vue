<template>
  <ui-popup v-if="isPersonEditMode">
    <template #header>
      <h3>Имя Фамилия Сотрудника</h3>
    </template>
    <template #body>
      <div class="form">
        <div class="form-elem">
          <label class="form-elem-label">name</label>
          <input type="text" v-model="editPerson.name" required />
        </div>
        <div class="form-elem">
          <label class="form-elem-label">email</label>
          <input type="text" v-model="editPerson.email" required />
        </div>
        <div class="form-elem">
          <label class="form-elem-label">position</label>
          <select v-model="editPerson.position">
            <option v-for="value in positions" :value="value">
              {{ value }}
            </option>
          </select>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="popup-btn-group">
        <button class="outline" @click="cancel">Отменить</button>
        <button @click="save">Сохранить</button>
      </div>
    </template>
  </ui-popup>
</template>

<script>
  import UiPopup from '@/components/Popup'
  import EventBus from '@/eventBus'

  export default {
    name: 'EditPopup',
    components: {UiPopup},
    props: {
      positions: { type: Array }
    },
    data: () => ({
      isPersonEditMode: false,
      person: null,
      editPerson: null
    }),
    created() {
      EventBus.$on('edit', person => {
        this.person = person
        this.editPerson = {...person}
        this.isPersonEditMode = true
      })
    },
    computed: {
      isDataChanged() {
        return this.person.name !== this.editPerson.name || this.person.email !== this.editPerson.email || this.person.position !== this.editPerson.position
      }
    },
    methods: {
      cancel() {
        if (this.isDataChanged) {
          if (confirm("Вы точно хотите отменить изменения?")) {
            this.isPersonEditMode = false
          }
        } else {
          this.isPersonEditMode = false
        }
      },
      save() {
        if (this.isDataChanged && this.isNameValid(this.editPerson.name) && this.isEmailValid(this.editPerson.email)) {
          this.person.name = this.editPerson.name
          this.person.email = this.editPerson.email
          this.person.position = this.editPerson.position
          this.isPersonEditMode = false
        }
      },
      isNameValid(name) {
        return /\s/.test(name) && /^[A-Z]/.test(name) && /\s[A-Z]/.test(name)
      },
      isEmailValid(email) {
        let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        return re.test(String(email).toLowerCase());
      }
    }
  };
</script>

<style lang="pcss" scoped>
  .popup-btn-group {
    text-align: right;
    button {
      margin-left: 1rem;
    }
  }

  .form {
    width: 25rem;
    &-elem {
      margin-bottom: 1rem;
      &:last-child {
         margin-bottom: 0;
      }
      &-label {
         display: block;
         font-size: var(--font-size-small);
         text-transform: uppercase;
         opacity: 0.5;
      }
    }
  }
</style>
