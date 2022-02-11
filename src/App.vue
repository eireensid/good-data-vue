<template>
  <div id="app">
    <search :persons="persons" v-model="filteredPersons"></search>

    <div>
      <template v-for="position in positions">
        <person-group :position="position" :personGroup="groupedPersons.get(position)"></person-group>
      </template>
    </div>

    <edit-popup :positions="positions"></edit-popup>

  </div>
</template>
<script>
import ApiService from '@/api/service';
import EditPopup from '@/components/EditPopup';
import PersonGroup from '@/components/PersonGroup';
import Search from '@/components/Search';

export default {
    name: 'App',
    components: { EditPopup, PersonGroup, Search },
    data: () => ({
      persons: [],
      filteredPersons: []
    }),
    computed: {
      positions () {
        return [...this.groupedPersons.keys()].sort()
      },
      /**
       * @return {import('./api/service.js').Person[]}
       */
      groupedPersons() {
        const groupByPosition = new Map()

        for (const person of this.filteredPersons) {
          if (!groupByPosition.has(person.position)) {
            groupByPosition.set(person.position, [])
          }
          const groupList = groupByPosition.get(person.position)
          groupList.push(person)
        }
        return groupByPosition
      }
    },
    async created() {
      this.persons = await this.fetchPersons()
      this.filteredPersons = this.persons

      const comments = await this.fetchComments()
      for (const person of this.persons) {
        person.comments = comments.find(c => c.personId === person.id).comments
      }
    },
    methods: {
      async fetchPersons() {
        try {
          const api = new ApiService()
          const persons = await api.getPersons()
          return persons;
        } catch (err) {
          console.error('fetchPersons err', err)
        }
      },

      async fetchComments() {
        try {
          const api = new ApiService()
          const comments = await api.getComments()
          return comments;
        } catch (err) {
          console.error('fetchComments err', err)
        }
      }
    }
};
</script>
<style lang="pcss" scoped>

</style>
