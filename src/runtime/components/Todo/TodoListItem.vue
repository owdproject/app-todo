<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import type { TodoItem } from '../../stores/storeTodo'

const props = defineProps<{
  todo: TodoItem
}>()

const emit = defineEmits<{
  remove: []
}>()

const todoTitleDraft = ref(props.todo.title)
const isEditing = ref(false)

watch(
  () => props.todo.title,
  (title) => {
    if (!isEditing.value) {
      todoTitleDraft.value = title
    }
  },
)

function focusEditInput(e: Event) {
  const li = (e.currentTarget as HTMLElement | null)?.closest('li')
  nextTick(() => {
    li?.querySelector<HTMLInputElement>('input[type="text"]')?.focus()
  })
}

function startEdit(e?: Event) {
  if (isEditing.value) {
    return
  }

  todoTitleDraft.value = props.todo.title
  isEditing.value = true

  if (e) {
    focusEditInput(e)
  }
}

function saveEdit() {
  const trimmed = todoTitleDraft.value.trim()
  if (trimmed === '') {
    return
  }

  props.todo.title = trimmed
  isEditing.value = false
}

function cancelEdit() {
  todoTitleDraft.value = props.todo.title
  isEditing.value = false
}

function onTitleDblClick(e: MouseEvent) {
  if (!isEditing.value) {
    startEdit(e)
  }
}
</script>

<template>
  <li
    class="todo-list-item"
    :class="{
      'todo-list-item--editing': isEditing,
      'todo-list-item--completed': props.todo.completed,
    }"
  >
    <div class="todo-list-item__checkbox">
      <Checkbox v-model="todo.completed" binary :disabled="isEditing" />
    </div>

    <div class="todo-list-item__body">
      <form
        v-if="isEditing"
        class="todo-list-item__edit-form"
        @submit.prevent="saveEdit"
      >
        <InputText
          v-model="todoTitleDraft"
          autocomplete="off"
          spellcheck="false"
          aria-label="Edit to-do"
          @keydown.esc.prevent="cancelEdit"
        />
      </form>
      <span
        v-else
        class="todo-list-item__title"
        @dblclick="onTitleDblClick"
      >{{ props.todo.title }}</span>
    </div>

    <div class="todo-list-item__actions" role="group" aria-label="To-do actions">
      <template v-if="isEditing">
        <Button
          type="button"
          class="todo-list-item__action todo-list-item__action--primary"
          aria-label="Save"
          title="Save"
          @click="saveEdit"
        >
          <Icon name="mdi:check" size="18" />
        </Button>
        <Button
          type="button"
          class="todo-list-item__action"
          aria-label="Cancel"
          title="Cancel"
          @click="cancelEdit"
        >
          <Icon name="mdi:close" size="18" />
        </Button>
      </template>
      <template v-else>
        <Button
          type="button"
          class="todo-list-item__action"
          aria-label="Edit"
          title="Edit"
          @click="startEdit"
        >
          <Icon name="mdi:pencil-outline" size="18" />
        </Button>
        <Button
          type="button"
          class="todo-list-item__action todo-list-item__action--danger"
          aria-label="Remove"
          title="Remove"
          @click="emit('remove')"
        >
          <Icon name="mdi:delete-outline" size="18" />
        </Button>
      </template>
    </div>
  </li>
</template>

<style scoped lang="scss">
.todo-list-item {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 36px;
  padding: 0;

  &:last-child {
    border-bottom: none;
  }

  &__checkbox {
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }

  &__body {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
  }

  &__edit-form {
    width: 100%;

    :deep(.p-inputtext) {
      width: 100%;
    }
  }

  &__title {
    display: block;
    padding-left: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: default;
    user-select: none;
  }

  &--completed &__title {
    text-decoration: line-through;
    opacity: 0.55;
  }

  &__actions {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  &__action {
    width: 32px;
    min-width: 32px;
    height: 32px;
    padding: 0;
    margin: 0;
    color: rgb(var(--owd-elevation-color, 30 30 30) / 0.72);

    &--primary {
      color: rgb(var(--owd-theme-color-primary, 37 99 235));
    }

    &--danger {
      color: rgb(var(--owd-theme-color-danger, 185 28 28));
    }
  }
}
</style>
