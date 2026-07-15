const express = require('express');
const LanguageService = require('./language-service');
const { requireAuth } = require('../middleware/jwt-auth');
const WordLinkedList = require('../LinkedList/LinkedList.js');

const languageRouter = express.Router();
const bodyParser = express.json();

languageRouter.use(requireAuth).use(async (req, res, next) => {
  try {
    const language = await LanguageService.getUsersLanguage(
      req.app.get('db'),
      req.user.id
    );

    if (!language)
      return res.status(404).json({
        error: `You don't have any languages`,
      });
    req.language = language;
    next();
  } catch (error) {
    next(error);
  }
});

languageRouter.get('/', async (req, res, next) => {
  try {
    const words = await LanguageService.getLanguageWords(
      req.app.get('db'),
      req.language.id
    );

    res.json({
      language: req.language,
      words,
    });
    next();
  } catch (error) {
    next(error);
  }
});

languageRouter.get('/head', async (req, res, next) => {
  // return the next quiz word to be asked
  try {
    const nextQuizWord = await LanguageService.getNextQuizWord(
      req.app.get('db'),
      req.language.head
    );
    res.json({
      nextWord: nextQuizWord.original,
      wordCorrectCount: nextQuizWord.correct_count,
      wordIncorrectCount: nextQuizWord.incorrect_count,
      totalScore: req.language.total_score,
    });
  } catch (e) {
    next(e);
  }
});

languageRouter.route('/guess').post(bodyParser, async (req, res, next) => {
  if (!Object.keys(req.body).includes('guess')) {
    return res.status(400).json({
      error: `Missing 'guess' in request body`,
    });
  }

  const words = await LanguageService.getLanguageWords(
    req.app.get('db'),
    req.language.id
  );
  const wordList = LanguageService.fillWordList(
    req.app.get('db'),
    req.language,
    words
  );

  if (normalizeWord(req.body.guess) === normalizeWord(wordList.head.value.translation)) {
    wordList.head.value.correct_count++; // increase correct count for curr word
    wordList.head.value.memory_value =
      (wordList.head.value.memory_value * 2 >= wordList.listNodes().length
        ? wordList.listNodes().length - 1
        : wordList.head.value.memory_value * 2); // double memory value, moving head/word M spaces back
    wordList.total_score++;
    wordList.moveHeadBy(wordList.head.value.memory_value);
    LanguageService.persistLinkedList(req.app.get('db'), wordList).then(() => {
      res.json({
        nextWord: wordList.head.value.original,
        wordCorrectCount: wordList.head.value.correct_count,
        wordIncorrectCount: wordList.head.value.incorrect_count,
        totalScore: wordList.total_score,
        answer: req.body.guess, // guess is correct answer
        isCorrect: true,
      });
      next();
    });
  } else {
    wordList.head.value.incorrect_count++; // increase incorrect count for curr word
    wordList.head.value.memory_value = 1; // reset memory value to 1
    let rightAnswer = wordList.head.value.translation; // store right answer before moving head
    wordList.moveHeadBy(wordList.head.value.memory_value);
    LanguageService.persistLinkedList(req.app.get('db'), wordList).then(() => {
      res.json({
        nextWord: wordList.head.value.original,
        wordCorrectCount: wordList.head.value.correct_count,
        wordIncorrectCount: wordList.head.value.incorrect_count,
        totalScore: wordList.total_score,
        answer: rightAnswer, // translation is right answer, guess wrong
        isCorrect: false,
      });
      next();
    });
  }
});

function normalizeWord(word) {
  return word.trim().toLowerCase();
}

module.exports = languageRouter;
