<template>
  <div class="home-upper">
    <div class="typed-text-container">
      <div class="typed-text" v-html="displayWithBreaks"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
const introText = '정휘원의 Vue를 활용한 \n 블로그/포트폴리오에 오신것을 환영합니다';
const displayed = ref('');
let currentIndex = 0;
const textBorder = ref(false);



function typeText() {
  if (currentIndex < introText.length) {
    displayed.value += introText.charAt(currentIndex);
    currentIndex++;
    setTimeout(typeText, 100);
  } else {
    textBorder.value = false;
  }
};

const displayWithBreaks = computed(() => {
  return displayed.value.replace(/\n/g, '<br>');
});

onMounted(() => {
  typeText();
});

</script>

<style scoped>
@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.home-upper {
  width: auto;
  height: 800px;
  background: linear-gradient(to top right, #C9A3FF,
      #613D92,
      #4B287A);
  background-size: 300%;
  color: white;
  display: flex;
  align-items: end;
  justify-content: start;
  text-align: center;
  animation: gradientAnimation 8s ease infinite;
  padding: 50px;
  box-sizing: border-box;
}

.typed-text-container {
  width: 1800px;
  height: 200px;
  overflow: hidden;
}

.typed-text {
  font-size: 60px;
  text-align: left;
  padding-right: 2px;
  white-space: nowrap;
  overflow: hidden;
  user-select: none;
  -webkit-user-drag: none;
}
</style>
