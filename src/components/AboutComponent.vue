<script lang="js" setup>
import { members } from './constants.vue'
</script>

<template>
  <section>
    <div class="container-about">
      <p>
        Este grupo pertenece a la Organización Power System cohorte 2024 de la Universidad
        Tecnológica Nacional de San Rafael Mendoza dirigida por el profesor
        <a
          href="https://github.com/ArielBetancud22"
          target="_blank"
          title="Ir al perfil de Ariel Betancud"
          class="teacher-link"
          >Ariel Betancud</a
        >, el cuál está integrado por:
      </p>
      <div class="members-list">
        <article v-for="(member, index) in members" :key="index">
          <a class="member-link" :href="member.link" :title="`Ir al perfil de ${member.name}`">
            <img :src="member.avatar" :alt="member.name" width="45" height="45" />
            <span>{{ member.name }}</span>
          </a>
        </article>
      </div>
    </div>
  </section>
</template>

<style lang="css" scoped>
section {
  max-width: 872px;
  display: flex;
  margin: 100px auto;
  justify-content: center;
  text-align: center;
  padding: 10px;
}

.teacher-link {
  text-decoration: none;
  color: var(--color-heading);
  font-weight: 600;
}

.teacher-link:hover {
  text-decoration: underline;
  opacity: 0.8;
  transition: ease-in-out 0.2s;
}

p {
  color: var(--color-heading);
  font-weight: 600;
}

.members-list {
  display: flex;
  margin: 12px auto;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}

article {
  display: flex;
  margin-top: 16px;
}

.member-link {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  font-weight: 500;
}

a:hover img {
  outline: 2px solid #00ccffe1;
  transition: ease-in-out 0.2s;
}

img {
  border-radius: 50%;
  outline: 2px solid #fff;
}

span {
  color: var(--color-heading);
}
</style>
