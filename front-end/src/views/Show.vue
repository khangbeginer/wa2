<template>
  <div>
    <h1>Show Word</h1>
    <div v-if="word" class="ui labeled input fluid">
      <div class="ui label">
        <i class="germany flag"></i> German
      </div>
      <input type="text" readonly :value="word.german" />
    </div>
    <div v-if="word" class="ui labeled input fluid">
      <div class="ui label">
        <i class="united kingdom flag"></i> English
      </div>
      <input type="text" readonly :value="word.english" />
    </div>
    <div v-if="word" class="ui labeled input fluid">
      <div class="ui label">
        <i class="france flag"></i> French
      </div>
      <input type="text" readonly :value="word.french" />
    </div>

    <!-- Link to edit page -->
    <div class="actions">
      <router-link :to="{ name: 'edit', params: { id: this.$route.params.id }}">
        Edit word
      </router-link>
    </div>
  </div>
</template>

<script>
import { api } from '../helpers/helpers'; 

export default {
  name: 'show',
  data() {
    return {
      word: null, 
    };
  },
  async mounted() {
    const wordId = this.$route.params.id; 
    try {
      this.word = await api.getWord(wordId); 
    } catch (error) {
      console.error("Error fetching word:", error); 
    }
  }
};
</script>

<style scoped>
.actions a {
  display: block;
  text-decoration: underline;
  margin: 20px 10px;
}
</style>
