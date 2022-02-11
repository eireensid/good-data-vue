<template>
  <div class="search-bar">
    <input type="text" placeholder="Search by first/last" v-model="searchValue" @keyup="search">
  </div>
</template>

<script>

  export default {
    name: 'Search',
    data: () => ({
      searchValue: ''
    }),
    props: {
      persons: { type: Array }
    },
    methods: {
      /**
       * fabric function for creation filter function
       * @param field {string} - person field
       * @param searchValue {string} - search value
       * @param logicFunc {Function} - logic function
       * @param getFilterValue {Function} - convert field function
       * @returns {Function} - filter function
       */
      filterFactory(field, searchValue, logicFunc, getFilterValue) {
        /**
         * filter function
         * @param person {Person} - person
         */
        return function (person) {
          // logic function params: filterValue, searchValue
          return logicFunc(getFilterValue(person[field]), searchValue)
        }
      },
      filter (person) {
        const logicFunc = (filterValue, searchValue) => {
          return filterValue.toLowerCase().startsWith(searchValue.toLowerCase())
        }
        const filterFunctions = []
        const filterByFirstName = this.filterFactory('name', this.searchValue, logicFunc, (fieldValue) => {
          return fieldValue.split(' ')[0]
        })
        filterFunctions.push(filterByFirstName)
        const filterByLastName = this.filterFactory('name', this.searchValue, logicFunc, (fieldValue) => {
          return fieldValue.split(' ')[1]
        })
        filterFunctions.push(filterByLastName)
        const filterByEmailName = this.filterFactory('email', this.searchValue, logicFunc, (fieldValue) => {
          return fieldValue.split('@')[0]
        })
        filterFunctions.push(filterByEmailName)
        const filterByEmailDomain = this.filterFactory('email', this.searchValue, logicFunc, (fieldValue) => {
          return fieldValue.split('@')[1]
        })
        filterFunctions.push(filterByEmailDomain)
        let res = false
        for (const filterFunction of filterFunctions) {
          res = res || filterFunction(person)
        }
        return res
      },
      search() {
        let searchData = this.persons
        if (this.searchValue) {
          searchData = this.persons.filter(person => this.filter(person))
        }
        this.$emit('input', searchData)
      }
    }
  };
</script>

<style lang="pcss" scoped>
  .search-bar {
    margin-bottom: 1rem;
    &-input {
       width: 100%;
    }
  }
</style>
