<script setup lang="js">
import { MapPin } from 'lucide-vue-next'
import { GetLocation } from './CurrentPosition.vue'
import { ref, onMounted } from 'vue'
import { Terminal } from 'lucide-vue-next'
import { Model } from './ActionClass.vue'

const location = ref({ city: '', state: '', country: '' })
const ip = ref([])

onMounted(async () => {
  const { city, state, country } = await GetLocation.getPresicionLocation()
  const currentPosition = {
    city: city,
    state: state,
    country: country
  }
  location.value = currentPosition

  ip.value = await Model.getVisits({
    from: 'double_commit_visits',
    select: 'ip',
    limit: 1,
    orderBy: 'created_at'
  })

  const objData = {
    ip: await GetLocation.ip(),
    city: currentPosition.city,
    country: currentPosition.country
  }

  const previousIPs = ip.value.map((v) => v.ip)

  if (!previousIPs.includes(objData.ip)) {
    await Model.sendVisit({ from: 'double_commit_visits', visit: objData })
  } else {
    return null
  }
})
</script>

<template>
  <header>
    <h1>
      Bienvenidos al portafolio
      <span class="double-commit"><Terminal class="terminal-icon" /> Double-Commit</span>
    </h1>
  </header>
  <aside>
    <p>
      Es un placer recibirte desde
      <b v-if="location.city === ''" class="loading">Cargando...</b>
      <b v-else
        ><MapPin width="15" height="15" style="transform: translateY(2px)" /> {{ location.city }}
        {{ location.state }}, {{ location.country }}!
      </b>
    </p>
  </aside>
</template>

<style lang="css" scoped>
header {
  max-width: 800px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  z-index: 99;
}

h1 {
  color: var(--color-heading);
  font-size: 4rem;
  text-align: center;
  font-weight: 800;
  text-wrap: pretty;
  line-height: 1.4;
}

.double-commit {
  font-size: 4rem;
  font-weight: 900;
  paint-order: stroke fill;
  display: inline-block;
  letter-spacing: -0.1ch;
  -webkit-text-stroke: 18px #020c1e;
  text-shadow:
    0 0 10px black,
    -5px 5px 0 #064073;
}

span {
  font-size: 4rem;
  font-weight: 800;
  color: var(--second-color-text);
}

aside {
  display: flex;
  justify-content: center;
  margin: 16px auto;
}

.loading {
  padding: 2px 8px;
}

.terminal-icon {
  width: 64px;
  height: 64px;
  transform: translateY(11px);
  font-weight: 900;
}

p {
  padding-block: 3px;
  padding-left: 12px;
  padding-right: 4px;
  border: 1px solid #07335a;
  border-radius: 99px;
  background: linear-gradient(to top, #02284a, #02203b);
  color: var(--color-heading);
}

b {
  background-color: #0099ff9d;
  border-radius: 99px;
  padding: 2px 6px;
  color: var(--color-heading);
  align-items: center;
}

@media (width <= 700px) {
  h1,
  .double-commit {
    font-size: 3.3rem;
  }
  .terminal-icon {
    display: none;
  }
  p {
    font-size: 14px;
  }
}

@media (width < 440px) {
  p {
    font-size: 12px;
  }
}

@media (width < 400px) {
  h1,
  .double-commit {
    font-size: 2.5rem;
  }
  p {
    font-size: 11px;
  }
}
</style>
