<template>
  <div>
    <h1>Show Word</h1>

    <!-- Hiển thị thông tin German và English -->
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

    <!-- Liên kết đến trang chỉnh sửa -->
    <div class="actions">
      <router-link :to="{ name: 'edit', params: { id: this.$route.params.id }}">
        Edit word
      </router-link>
    </div>
  </div>
</template>

<script>
import { api } from '../helpers/helpers'; // Giả sử api đã được định nghĩa trong helpers

export default {
  name: 'show',
  data() {
    return {
      word: null, // Lưu từ vựng khi dữ liệu được tải về
    };
  },
  async mounted() {
    const wordId = this.$route.params.id; // Lấy ID từ URL
    try {
      this.word = await api.getWord(wordId); // Gọi API để lấy dữ liệu từ server
    } catch (error) {
      console.error("Error fetching word:", error); // Xử lý lỗi khi gọi API
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
