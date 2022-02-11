<template>
  <div class="card">
    <div class="card-left">
      <div class="card-avatar">
        <card-avatar :url="person.avatar"></card-avatar>
        <div class="card-comments" v-if="person.comments != null">
          {{ person.comments.length }}
        </div>
      </div>
      <div class="card-info">
        <div class="card-name" :style="person.position === 'Manager' ? 'color: #95bbdf' : ''">
          <b>{{ person.name }}</b>
        </div>
        <div class="card-email">{{ person.email }}</div>
      </div>
    </div>
    <span class="action-btn" @click="edit">edit</span>
  </div>
</template>

<script>
  import CardAvatar from '@/components/Avatar';
  import EventBus from '@/eventBus'

  export default {
    name: 'PersonCard',
    props: {
      person: { type: Object }
    },
    components: { CardAvatar },
    methods: {
      edit() {
        EventBus.$emit('edit', this.person)
      }
    }
  };
</script>
<style lang="pcss" scoped>
  .card {
    padding: 1rem;
    background: white;
    box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    &-left {
      display: flex;
    }
    &-avatar {
       position: relative;
       margin-right: 1rem;
    }
    &-comments {
      position: absolute;
      top: -10px;
      right: -10px;
      width: 20px;
      height: 20px;
      background: var(--color-primary);
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--color-white);
    }
    &-email {
       font-size: var(--font-size-small);
    }
    &-email,
    &-name {
       overflow: hidden;
       white-space: nowrap;
       text-overflow: ellipsis;
       max-width: 190px;
    }
  }
  .action-btn {
    color: var(--color-primary);
    font-size: var(--font-size-small);
    line-height: 1;
    border-bottom: 1px dashed currentColor;
    cursor: pointer;
  }
</style>
