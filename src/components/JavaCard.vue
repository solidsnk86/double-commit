<script lang="js" setup>
import { difference } from './constants.vue'

setInterval(difference, 1000)
if (difference < 0) clearInterval(difference)
</script>

<template>
  <article v-if="difference > 0">
    <div class="text-container">
      <h2>Proyecto Java en Construcción</h2>
      <p>
        Pronto podrán ver el proyecto integrador final en Java para la facultad de la mano del grupo
        Double Commit de la Organización Power System 2024 UTN-FRSR.
      </p>
    </div>
    <div class="img-container">
      <div class="bg-left"></div>
      <img src="/rocket.png" alt="rocket image" />
    </div>
  </article>
  <article v-else>
    <div class="text-container">
      <h2>¡Proyecto Java Completado!</h2>
      <p>
        Hemos finalizado nuestro proyecto integrador en Java. Explora el código y la documentación
        en nuestro repositorio de GitHub.
      </p>
      <a
        href="https://github.com/PowerSystem2024/final_java_double_commit/releases"
        target="_blank"
        class="btn-github"
        >Ver Proyecto <i class="fas fa-external-link-alt"></i
      ></a>
    </div>
    <div class="img-container">
      <div class="bg-left"></div>
      <img src="/rocket.png" alt="rocket image" />
    </div>
  </article>
</template>

<style lang="css" scoped>
article {
  position: relative;
  width: 90%;
  max-width: 872px;
  height: 500px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 50px auto;
  border: 1px solid var(--color-border);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.8s ease;
  view-timeline-name: --javacard;
  view-timeline-axis: block;
  background-color: #232321;

  animation-timeline: --javacard;
  animation-name: vanish;

  animation-range: entry 50% cover 50%;
  animation-fill-mode: both;
}

@keyframes vanish {
  0% {
    opacity: 0.1;
    scale: 0.1;
    filter: contrast(115%);
  }
  1% {
    opacity: 0;
    scale: 0.6;
    filter: contrast(125%);
  }
}

.text-container {
  padding: 33px;
  width: 50%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  z-index: 1;
  color: #ebf1e6;
}

h2 {
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 1rem;
}

p {
  font-weight: 600;
  font-size: 1.1rem;
}

.img-container {
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.7;
}

.bg-left {
  background-color: #232321;
  width: 30%;
  height: 100%;
}

img {
  object-fit: cover;
  width: 70%;
  height: 100%;
  flex-shrink: 0;
  mask-image: linear-gradient(to left, black 50%, transparent 100%);
  -webkit-mask-image: linear-gradient(to left, black 50%, transparent 100%);
}

.btn-github {
  position: absolute;
  right: 16px;
  bottom: 16px;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #333;
  background: #020202b1;
}

.btn-github:hover {
  transform: scale(1.03);
  transition: 0.2s ease-in-out;
  outline: 2px solid #020202b1;
  outline-offset: 2px;
}

a {
  text-decoration: none;
  color: #fff;
  font-weight: 600;
}

@media (max-width: 1024px) {
  article {
    height: auto;
    min-height: 400px;
  }

  .text-container {
    width: 60%;
    padding: 30px;
  }

  h2 {
    font-size: 2.8rem;
  }

  .bg-left {
    width: 60%;
  }

  img {
    width: 40%;
  }
}

@media (max-width: 768px) {
  article {
    flex-direction: column;
    height: auto;
  }

  .text-container {
    width: 100%;
    max-width: none;
    padding: 30px;
  }

  h2 {
    font-size: 2.2rem;
  }

  p {
    font-size: 1rem;
  }

  .img-container {
    height: 100%;
  }

  .bg-left {
    display: none;
  }

  img {
    width: 100%;
    height: 100%;
  }
}

@media (max-width: 480px) {
  article {
    width: 95%;
    margin: 30px auto;
  }

  .text-container {
    padding: 20px;
  }

  h2 {
    font-size: 1.8rem;
  }

  p {
    font-size: 0.9rem;
  }

  .img-container {
    height: 100%;
  }
}
</style>
