const mongoose = require('mongoose');
const Vocab = mongoose.model('Vocab');

exports.list_all_words = async (req, res) => {
    try {
        const words = await Vocab.find({});
        res.json(words);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.create_a_word = async (req, res) => {
    const newWord = new Vocab(req.body);
    try {
        const word = await newWord.save(); // Await the save operation
        res.status(201).json(word);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.read_a_word = async (req, res) => {
    try {
        const word = await Vocab.findById(req.params.wordId);
        if (!word) return res.status(404).json({ message: 'Word not found' });
        res.json(word);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.update_a_word = async (req, res) => {
    try {
        const word = await Vocab.findOneAndUpdate(
            { _id: req.params.wordId },
            req.body,
            { new: true }
        );
        if (!word) return res.status(404).json({ message: 'Word not found' });
        res.json(word);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.delete_a_word = async (req, res) => {
    try {
        const result = await Vocab.deleteOne({ _id: req.params.wordId });
        if (result.deletedCount === 0) return res.status(404).json({ message: 'Word not found' });
        res.json({ message: 'Word successfully deleted' });
    } catch (err) {
        res.status(500).send(err);
    }
};
