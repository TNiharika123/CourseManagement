// controllers/attemptController.js
const Attempt = require("../models/Attempt");

exports.submitQuizAttempt = async (req, res) => {
  try {
    if (req.user.role !== "learner") {
      return res.status(403).json({ message: "Only learners can attempt quizzes." });
    }

    const { quizId, answers } = req.body;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found." });

    let score = 0, correctAnswers = 0, wrongAnswers = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score++;
        correctAnswers++;
      } else {
        wrongAnswers++;
      }
    });

    const attempt = new Attempt({ 
      learner: req.user.id, 
      quiz: quizId, 
      score, 
      correctAnswers, 
      wrongAnswers 
    });
    await attempt.save();

    res.status(201).json({ 
      message: "Quiz submitted successfully!", 
      score, 
      attemptId: attempt._id 
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.getAttemptById = async (req, res) => {
  try {
    const attempt = await Attempt.findById(req.params.attemptId)
      .populate("quiz")
      .populate("learner", "name email");
    
    if (!attempt) {
      return res.status(404).json({ message: "Attempt not found." });
    }

    if (attempt.learner._id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to view this attempt." });
    }

    res.status(200).json(attempt);
  } catch (error) {
    res.status(500).json({ message: "Error fetching attempt", error: error.message });
  }
};