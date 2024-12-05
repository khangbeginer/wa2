import axios from 'axios';
import { useToast } from 'vue-toastification'; // Importing toast
import 'vue-toastification/dist/index.css'; // Ensure you include this CSS


const baseURL = 'http://localhost:3000/words/';

// Handle async errors globally
const handleError = fn => (...params) =>
  fn(...params).catch(error => {
    console.error(error);
    toast.error('An error occurred!'); // Display error toast
  });

export const api = {
  getWord: handleError(async (id) => {
    const res = await axios.get(baseURL + id);
    return res.data;
  }),
  getWords: handleError(async () => {
    const res = await axios.get(baseURL);
    return res.data;
  }),
  deleteWord: handleError(async (id) => {
    const res = await axios.delete(baseURL + id);

    return res.data;
  }),
  createWord: handleError(async (payload) => {
    const res = await axios.post(baseURL, payload);

    return res.data;
  }),
  updateWord: handleError(async (payload) => {
    const res = await axios.put(baseURL + payload._id, payload);

    return res.data;
  }),
};
