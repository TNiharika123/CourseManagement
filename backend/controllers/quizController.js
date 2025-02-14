// controllers/quizController.js
const Quiz = require("../models/Quiz");

exports.createQuiz = async (req, res) => {
  try {
    if (req.user.role !== "creator") {
      return res.status(403).json({ message: "Only creators can create quizzes." });
    }

    const { title, questions, duration } = req.body;
    if (!title || !questions?.length || !duration) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const quiz = new Quiz({
      title,
      questions,
      creator: req.user.userId,
      duration
    });
    
    await quiz.save();
    res.status(201).json({ message: "Quiz created successfully!", quiz });
  } catch (error) {
    res.status(500).json({ message: "Error creating quiz", error: error.message });
  }
};

exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate("creator", "name email");
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quizzes", error: error.message });
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId).populate("creator", "name email");
    if (!quiz) return res.status(404).json({ message: "Quiz not found." });
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quiz", error: error.message });
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found." });

    if (quiz.creator.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized to update this quiz." });
    }

    Object.assign(quiz, req.body);
    await quiz.save();
    res.status(200).json({ message: "Quiz updated successfully!", quiz });
  } catch (error) {
    res.status(500).json({ message: "Error updating quiz", error: error.message });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found." });

    if (quiz.creator.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized to delete this quiz." });
    }

    await quiz.deleteOne();
    res.status(200).json({ message: "Quiz deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting quiz", error: error.message });
  }
};
