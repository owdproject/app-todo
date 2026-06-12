<script setup lang="ts">
import { useTodoStore } from '../../stores/storeTodo'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

const todoStore = useTodoStore()
const { list, filter } = storeToRefs(todoStore)

const todoCount = computed(() => list.value.length)
const todoCountCompleted = computed(
  () => list.value.filter((item) => item.completed).length,
)
const todoCountNotCompleted = computed(
  () => list.value.filter((item) => !item.completed).length,
)

const todoListFiltered = computed(() => {
  return [...list.value]
    .sort((a, b) => +b.completed - +a.completed)
    .filter(function (item) {
      switch (filter.value) {
        case 'todo':
          return item.completed === false
        case 'done':
          return item.completed === true
        default:
          return true
      }
    })
})

function todoAdd(item: string) {
  todoStore.addTodo(item)
}

function onTodoRemove(todoId: string) {
  todoStore.removeTodo(todoId)
}
</script>

<template>
  <Window :content="{ padded: true }">
    <div class="todo-container">
      <div class="todo-input">
        <TodoInput @todo-add="todoAdd" />
      </div>

      <div class="todo-list">
        <p v-if="todoListFiltered.length === 0" class="todo-list__empty">
          No items.
        </p>
        <ul v-else class="todo-list__items">
          <TodoListItem
            v-for="todo in todoListFiltered"
            :key="todo.id"
            :todo="todo"
            @remove="onTodoRemove(todo.id)"
          />
        </ul>
      </div>

      <ul class="todo-stats">
        <li>To do: {{ todoCountNotCompleted }}</li>
        <li v-if="todoCount > 0">
          Completed: {{ todoCountCompleted }} / {{ todoCount }}
        </li>
        <li>
          <a
            :class="[{ 'opacity-50': filter !== 'all' }]"
            @click="filter = 'all'"
            >all</a
          >
          <a
            :class="[{ 'opacity-50': filter !== 'todo' }]"
            @click="filter = 'todo'"
            >to do</a
          >
          <a
            :class="[{ 'opacity-50': filter !== 'done' }]"
            @click="filter = 'done'"
            >done</a
          >
        </li>
      </ul>
    </div>
  </Window>
</template>

<style scoped lang="scss">
.todo-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 34px;

  .todo-input {
    padding-right: 0;
  }

  .todo-list {
    flex: 1;
    min-height: 0;
    overflow-y: auto;

    &__empty {
      margin: 24px 0;
      font-size: var(--p-font-size);
      color: rgb(var(--owd-theme-color-dark));
      text-align: center;
      user-select: none;
    }

    &__items {
      list-style: none;
      padding: 8px 0;
      margin: 0;
    }
  }

  .todo-stats {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 34px;
    line-height: 34px;
    font-size: 12px;
    margin: 0;
    padding: 0 12px;
    list-style-type: none;
    cursor: default;
    user-select: none;

    li {
      float: left;
      margin-right: 10px;

      &:last-child {
        float: right;
        margin: 0 0 0 10px;

        a {
          cursor: pointer;
          padding: 10px 5px;
        }
      }
    }
  }
}
</style>
