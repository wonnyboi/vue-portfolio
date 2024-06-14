<template>
  <div class="tech-container">
    <div class="FE-tech">
      <h2>Web</h2>
      <div class="icon-container">
        <StackItem iconName="JavaScript" />
        <StackItem iconName="HTML" />
        <StackItem iconName="CSS" />
        <StackItem iconName="VueJS" />
        <StackItem iconName="NodeJS" />
      </div>
    </div>
    <div class="FE-tech">
      <h2>App</h2>
      <div class="icon-container">
        <StackItem iconName="Flutter" />
        <StackItem iconName="Dart" />
        <StackItem iconName="Firebase" />
      </div>
    </div>
    <div class="FE-tech">
      <h2>Little AI</h2>
      <div class="icon-container">
        <StackItem iconName="Python" />
        <StackItem iconName="PyTorch" />
        <StackItem iconName="TensorFlow" />
      </div>
    </div>
    <div class="FE-tech">
      <h2>Tried</h2>
      <div class="icon-container">
        <StackItem iconName="Django" />
        <StackItem iconName="SQLite" />
        <StackItem iconName="R" />
      </div>
    </div>
    <div class="FE-tech-long">
      <h2>Co-op</h2>
      <div class="icon-container-long">
        <div class="icon-slide">
          <StackItem iconName="Jira" />
          <StackItem iconName="Notion" />
          <StackItem iconName="Figma" />
          <StackItem iconName="GitLab" />
          <StackItem iconName="Github" />
          <StackItem iconName="Discord" />
          <StackItem iconName="Postman" />
          <StackItem iconName="Swagger" />
          <StackItem iconName="Swagger" />
        </div>
      </div>
      <button class="carousel-control prev" @click="prevSlide()">‹</button>
      <button class="carousel-control next" @click="nextSlide()">›</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import StackItem from '@/components/StackItem.vue';

let currentSlide = ref(0);

function showSlide(index) {
  const slides = document.querySelector('.icon-slide');
  if (!slides) return;
  console.log(slides.children.length)
  const totalSlides = slides.children.length;
  const itemsPerPage = 8;
  const maxIndex = Math.ceil(totalSlides / itemsPerPage) - 1;

  if (index < 0) {
    currentSlide = maxIndex;
  } else if (index > maxIndex) {
    currentSlide = 0;
  } else {
    currentSlide = index;
  }

  const offset = -currentSlide * 100;
  slides.style.transform = `translateX(${offset}%)`
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

onMounted(() => {
  showSlide(0);

})
</script>

<style scoped>
.tech-container {
  height: 800px;
  border: 1px solid black;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.FE-tech {
  height: 300px;
  width: 500px;
  border: 1px solid black;
  border-radius: 8px;
  padding: 10px 30px;
  box-sizing: border-box;
  justify-content: center;
}

.icon-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.FE-tech-long {
  height: 300px;
  width: 500px;
  border: 1px solid black;
  border-radius: 8px;
  padding: 10px 30px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}

.icon-container-long {
  display: flex;
  overflow: hidden;
}

.icon-slide {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  transition: transform 0.5s ease-in-out;
}

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 1;
}

.carousel-control.prev {
  left: 10px;
}

.carousel-control.next {
  right: 10px;
}
</style>
