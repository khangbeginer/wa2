<template>
    <div>
        <h1>Edit Word</h1>
        <!-- Pass the current word to the WordForm component to edit -->
        <word-form @createOrUpdate="updateWord" :word="word"></word-form>
    </div>
</template>

<script>
import WordForm from '../components/WordForm.vue'; // Your word form component
import { api } from '../helpers/helpers'; // API helper for communication
import Swal from 'sweetalert2';

export default {
    name: 'edit',
    components: {
        'word-form': WordForm,
    },
    data() {
        return {
            word: {}, // Holds the word data to be edited
        };
    },
    async mounted() {
        // Fetch the word data by its ID when the component mounts
        this.word = await api.getWord(this.$route.params.id); // Fetch single word based on ID
    },
    methods: {
        // This method is called when the word is updated
        async updateWord(updatedaaaWord) {
            // Show confirmation before updating the word
            const result = await Swal.fire({
                title: 'Are you sure you want to update this word?',
                text: 'This action will update the word details.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, update it!',
                cancelButtonText: 'No, keep it',
                reverseButtons: true,
            });

            // If user confirms the update
            if (result.isConfirmed) {
                // Call API to update the word with the new data
                try {
                    await api.updateWord(updatedaaaWord); // Make sure to pass the updated word
                    this.$router.push('/words'); // Redirect back to the words list after update
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
