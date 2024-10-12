<script lang="js" setup>
import { Format } from './FormatClass.vue'

defineProps({
  dataComments: Array
})
</script>

<template>
  <article>
    <div
      v-for="(data, index) in dataComments"
      :key="index"
      :style="index % 2 === 0 ? 'background-color: #0099ff9d' : 'background-color: #00ccffe1;'"
      :title="'Mensaje enviado el ' + Format.dateAndTime(data.created_at) + ' IP: ' + data.ip"
    >
      <header>
        <span class="name">{{ data.name }}</span>
        <span class="date">{{ Format.date(data.created_at) }}</span>
      </header>
      <p class="message">{{ data.message }}</p>
    </div>
  </article>
</template>

<style scoped>
article {
  max-width: 430px;
  display: grid;
  gap: 8px;
  margin: 0 auto;
}

div {
  display: flex;
  flex-direction: column;
  padding: 16px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.name {
  color: var(--color-heading);
  font-weight: 700;
}

.date {
  font-size: 0.8em;
  color: var(--color-heading);
}

.message {
  color: var(--color-heading);
  margin: 0;
}
</style>
