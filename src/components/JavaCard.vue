<script lang="js" setup></script>

<template>
  <article>
    <div class="text-container">
      <h2>Proyecto Java en Construcción</h2>
      <p>
        Pronto podrán disfrutar del proyecto integrador final en Java para la facultad de la mano
        del grupo Double Commit de la Organización Power System 2024 UTN-FRSR.
      </p>
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
  width: 80%;
  height: 500px;
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 50px auto;
  border: 1px solid var(--color-border);
  border-radius: 20px;
  overflow: hidden;
}

.text-container {
  padding: 33px;
  width: 35%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  z-index: 1;
  color: #ebf1e6;
}

h2 {
  font-size: 3.5rem;
  font-weight: 900;
}

p {
  font-weight: 600;
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
  width: 75%;
  height: 100%;
  flex-shrink: 0;
}
</style>
