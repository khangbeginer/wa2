<template>
    <div>
      <h1>New Word</h1>
      <word-form @createOrUpdate="createWord"></word-form>
    </div>
  </template>
  
  <script>
  import WordForm from '../components/WordForm.vue';
  import { api } from '../helpers/helpers';
  import Swal from 'sweetalert2';
  
  export default {
    name: 'new-word',
    components: {
      'word-form': WordForm
    },
    methods: {
        async createWord(word) {
            // Show confirmation before updating the word
            const result = await Swal.fire({
                title: 'Are you sure you want to add this word?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                
            });
            if (result.isConfirmed) {
                // Call API to update the word with the new data
                try {
                    await api.createWord(word); 
                    this.$router.push('/words'); 
                    Swal.fire('Updated!', 'Your word has been updated.', 'success');
                } catch (error) {
                    // Handle error if the update fails
                    Swal.fire('Error', 'There was a problem updating the word.', 'error');
                }
            } else {
                // If user cancels the action
                Swal.fire('Cancelled', 'Your word was not updated.', 'info');
            }
    },
  },
};
  </script>