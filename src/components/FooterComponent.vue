<script setup lang="js">
import { ref, onMounted } from 'vue'
import { Model } from './ActionClass.vue'
import { MapPinnedIcon } from 'lucide-vue-next'

const visitsCount = ref([])
const visitsFrom = ref([])

onMounted(async () => {
  visitsCount.value = await Model.getVisits({
    from: 'double_commit_visits',
    select: 'id',
    limit: 1,
    orderBy: 'created_at'
  })
  visitsFrom.value = await Model.getVisits({
    from: 'double_commit_visits',
    select: 'city,province,country',
    limit: 1,
    orderBy: 'created_at'
  })
})
</script>

<template>
  <footer v-for="(visits, index) in visitsCount" :key="index">
    <small class="visits"><span class="eyes">👀</span> Visitas al portfolio: {{ visits.id }}</small>
    <small style="text-align: center; margin: 25px auto; color: var(--color-heading)"
      >Última visita desde:
    </small>
    <article v-if="visitsFrom.length !== 0">
      <div class="from" v-for="(visit, index) in visitsFrom" :key="index">
        <small
          ><MapPinnedIcon class="map-pinned" /> {{ visit.city }} {{ visit.province }},
          {{ visit.country }}</small
        >
      </div>
    </article>
    <div v-else class="from">
      <small>Cargando..</small>
    </div>
    <small class="text-footer"
      >&copy; Double Commit UTN~FRSR • {{ new Date().getFullYear() }}</small
    >
  </footer>
</template>

<style lang="css" scoped>
footer {
  display: grid;
  width: 100%;
  justify-content: center;
  padding-top: 60px;
  z-index: 99;
}
small {
  font-weight: 700;
}
.visits {
  position: relative;
  display: flex;
  justify-content: center;
  padding: 8px 16px;
  background: linear-gradient(to bottom, #0099ff9d, #00ccffe1);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  margin: 24px auto;
  color: var(--color-heading);
  align-items: center;
  gap: 4px;
  filter: drop-shadow(0 0 50px #0099ff9d);
  cursor: default;
  align-items: center;
}
.text-footer {
  margin: 16px auto;
}
.eyes {
  transform: translateY(calc(50% - 12px));
  width: 16px;
  height: 16px;
  animation: blink 6s infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  95% {
    opacity: 1;
  }
  96% {
    opacity: 0.1;
  }
  98% {
    opacity: 0.1;
  }
  99% {
    opacity: 1;
  }
}

.from {
  text-align: center;
  padding: 8px;
  background: linear-gradient(to bottom, #0099ff9d, #00ccffe1);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  color: var(--color-heading);
}
.map-pinned {
  width: 16px;
  height: 16px;
  transform: translateY(1px);
  color: var(--color-heading);
}

@media (width < 700px) {
  .map-pinned {
    width: 14px;
    height: 14px;
  }
}
</style>
