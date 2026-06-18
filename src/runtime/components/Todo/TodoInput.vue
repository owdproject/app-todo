<template>
  <form class="todo-input-form" @submit.prevent="todoAdd">
    <div class="todo-input-form__field">
      <InputText
        v-model="input"
        placeholder="New task..."
        autocomplete="off"
        spellcheck="false"
        @keydown.enter.prevent="todoAdd"
        @keyup.enter.prevent="todoAdd"
      />
      <Button
        type="submit"
        class="todo-input-form__submit"
        aria-label="Add to-do"
        title="Add"
      >
        <Icon name="mdi:keyboard-return" />
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const input = ref<string>('')

const emit = defineEmits(['todo-add'])

function todoAdd() {
  const value = input.value.trim()
  if (value === '') {
    return
  }

  emit('todo-add', value)
  input.value = ''
}
</script>

<style scoped lang="scss">
.todo-input-form {
  width: 100%;

  &__field {
    display: flex;
    gap: 6px;
    width: 100%;
  }

  :deep(.p-inputtext) {
    flex: 1;
    min-height: 32px;
    height: 32px;
  }

  &__submit {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    min-height: 32px;
    margin: 0;
    padding: 0;
  }
}
</style>
