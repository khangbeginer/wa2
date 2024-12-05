<template>
  <div>
    <!-- Display the score (correct answers out of total words) -->
    <h2>Score: {{ score }} out of {{ words.length }}</h2>

    <!-- Show the test form if there are words to be tested -->
    <form v-if="currWord" action="#" @submit.prevent="onSubmit">
      <!-- German word input, it’s read-only and shows the German translation -->
      <div class="ui labeled input fluid">
        <div class="ui label">
          <i class="germany flag"></i> German
        </div>
        <input type="text" readonly :disabled="testOver" :value="currWord.german" />
      </div>

      <!-- English word input, the user types their guess, disabled when test is over -->
      <div class="ui labeled input fluid">
        <div class="ui label">
          <i class="united kingdom flag"></i> English
        </div>
        <input type="text" placeholder="Enter word..." v-model="english" :disabled="testOver" autocomplete="off" />
      </div>

      <!-- French word input, same as the English one, for French translation -->
      <div class="ui labeled input fluid">
        <div class="ui label">
          <i class="france flag"></i> French
        </div>
        <input type="text" placeholder="Enter word..." v-model="french" :disabled="testOver" autocomplete="off" />
      </div>

      <!-- Submit button, disabled after the test is over -->
      <button class="positive ui button" :disabled="testOver">Submit</button>
    </form>

    <!-- Display test completion message if no more words -->
    <p v-else>Test completed! Check your results below.</p>

    <!-- Display the result message with appropriate styling -->
    <p :class="['results', resultClass]">
      <span v-html="result"></span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'vocab-test',
  // Accept the list of words as a prop
  props: {
    words: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      // Shuffle the words to randomize the order
      randWords: [...this.words.sort(() => 0.5 - Math.random())],
      // Array to store incorrect guesses
      incorrectGuesses: [],
      // Result message to display at the end
      result: '',
      // Class for styling the result message (success or error)
      resultClass: '',
      // Bindings for the English and French inputs
      english: '',
      french: '',
      // Score tracking
      score: 0,
      // Boolean flag to indicate if the test is over
      testOver: false
    };
  },
  computed: {
    // Get the current word to be tested
    currWord() {
      return this.randWords.length ? this.randWords[0] : null;
    }
  },
  methods: {
    // Submit handler when user submits the answer
    onSubmit() {
      // If either English or French input is empty, do nothing
      if (!this.english || !this.french) return;

      let isCorrect = true;

      // Check if English word is correct
      if (this.english.trim().toLowerCase() !== this.currWord.english.toLowerCase()) {
        this.incorrectGuesses.push(`English: ${this.currWord.english}`);
        isCorrect = false;
      }

      // Check if French word is correct
      if (this.french.trim().toLowerCase() !== this.currWord.french.toLowerCase()) {
        this.incorrectGuesses.push(`French: ${this.currWord.french}`);
        isCorrect = false;
      }

      // If both answers are correct, increment the score
      if (isCorrect) {
        this.score += 1;
      }

      // Reset input fields for the next word
      this.english = '';
      this.french = '';
      // Remove the current word from the list
      this.randWords.shift();

      // If no more words, end the test
      if (this.randWords.length === 0) {
        this.testOver = true;
        this.displayResults();
      }
    },

    // Display the final results when the test is over
    displayResults() {
      if (this.incorrectGuesses.length === 0) {
        // If no incorrect guesses, display success message
        this.result = 'You got everything correct. Well done!';
        this.resultClass = 'success';
      } else {
        // Group the incorrect answers by word pair (English and French)
        const incorrect = [];
        for (let i = 0; i < this.incorrectGuesses.length; i += 2) {
          if (this.incorrectGuesses[i + 1]) {
            // If there’s a pair, join them
            incorrect.push(`${this.incorrectGuesses[i]} and ${this.incorrectGuesses[i + 1]}`);
          } else {
            // If only one answer is wrong (no pair), display it alone
            incorrect.push(`${this.incorrectGuesses[i]}`);
          }
        }

        // Join all incorrect guesses into a single string, separating by line breaks
        this.result = `<strong>You got the following words wrong:</strong><br>${incorrect.join('<br>')}`;
        this.resultClass = 'error';
      }
    }
  }
};
</script>

<style scoped>
/* Styling for the result messages */
.results {
  margin: 25px auto;
  padding: 15px;
  border-radius: 5px;
}

/* Styling for error messages */
.error {
  border: 1px solid #ebccd1;
  color: #a94442;
  background-color: #f2dede;
}

/* Styling for success messages */
.success {
  border: 1px solid #d6e9c6;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>
