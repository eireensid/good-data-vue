<template>
  <div class="person-group">
    <h3>{{position}}</h3>
    <div class="list">
      <template v-for="person in personGroup">
        <person-card :person="person"></person-card>
      </template>
    </div>
  </div>
</template>

<script>
  import PersonCard from '@/components/PersonCard';

  export default {
    name: 'PersonGroup',
    props: {
      position: { type: String },
      personGroup: { type: Array }
    },
    components: { PersonCard }
  };
</script>

<style lang="pcss" scoped>
.person-group {
  margin-bottom: 2rem;

&-name {
   margin-bottom: 1rem;
 }
}
.list {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
}
</style>
