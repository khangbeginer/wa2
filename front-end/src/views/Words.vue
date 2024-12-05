<template>
  <div>
    <h1>Words</h1>
    <table id="words" class="ui celled compact table">
      <thead>
        <tr>
          <th>English</th>
          <th>German</th>
          <th>French</th>
          <th colspan="3"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(word, i) in words" :key="i">
          <td>{{ word.english }}</td>
          <td>{{ word.german }}</td>
          <td>{{ word.french }}</td>
          <td width="75" class="center aligned">
            <router-link :to="{ name: 'show', params: { id: word._id } }">Show</router-link>
          </td>
          <td width="75" class="center aligned">
            <router-link :to="{ name: 'edit', params: { id: word._id } }">Edit</router-link>
          </td>
          <td width="75" class="center aligned">
            <a href="#" @click.prevent="openDeleteDialog(word._id)">Destroy</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Swal from 'sweetalert2'; // Import SweetAlert2

import { api } from '../helpers/helpers';

export default {
  name: 'words',
  data() {
    return {
      words: [], // Danh sách các từ
    };
  },

  methods: {
    // Mở hộp thoại xác nhận xóa
    async openDeleteDialog(wordId) {
      const result = await Swal.fire({
        title: 'Are you sure you want to delete this word?',
        text: 'This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true, 
        confirmButtonText: 'Yes, delete it',
        cancelButtonText: 'No, keep it',
        
      });

      // Nếu người dùng chọn "Yes"
      if (result.isConfirmed) {
        await this.deleteWord(wordId);
        Swal.fire(
          'Deleted!',
          'Your word has been deleted.',
          'success'
        );
      } else {
        // Nếu người dùng chọn "No"
        Swal.fire(
          'Cancelled',
          'Your word is safe :)',
          'info'
        );
      }
    },

    // Phương thức gọi API để xóa từ
    async deleteWord(wordId) {
      try {
        await api.deleteWord(wordId);
        // Cập nhật lại danh sách sau khi xóa
        this.words = this.words.filter(word => word._id !== wordId);
      } catch (error) {
        console.error("Error deleting word:", error);
      }
    },
  },

  async mounted() {
    // Lấy danh sách các từ
    this.words = await api.getWords();
  },
};
</script>
