const LanguageService = {
  getUsersLanguage(db, user_id) {
    return db
      .from('language')
      .select(
        'language.id',
        'language.name',
        'language.user_id',
        'language.head',
        'language.total_score',
      )
      .where('language.user_id', user_id)
      .first()
  },

  getLanguageWords(db, language_id) {
    return db
      .from('word')
      .select(
        'id',
        'language_id',
        'original',
        'translation',
        'next',
        'memory_value',
        'correct_count',
        'incorrect_count',
      )
      .where({ language_id })
  },
  getNextQuizWord(db, id) {
    // add any additional fields??
    return db('word')
      .select('id',
      'next',
      'original',
      'correct_count',
      'incorrect_count')
      .where({ id })
      .first();
  },
  fillWordList(db, language_id, list) {
    this.getLanguageWords(db, language_id)
      .then((words) => {
        for (let i = 0; i < words.length; i++) {
          
        }
      })
    for ()
  }
}

module.exports = LanguageService
