const { getYarValue } = require('./session')

const notUniqueSelection = (answers, option) => (
  answers?.includes(option) &&
    typeof (answers) === 'object' &&
    answers.length > 1
)

const uniqueSelection = (answers, option) => (
  answers?.includes(option) &&
    (typeof (answers) === 'string' ||
      (typeof (answers) === 'object' && answers.length === 1)
    )
)

const getQuestionByKey = (questionKey, ALL_QUESTIONS) => ALL_QUESTIONS.find(({ key }) => (key === questionKey))

const getQuestionAnswer = (questionKey, answerKey, ALL_QUESTIONS) => {
  const question = getQuestionByKey(questionKey, ALL_QUESTIONS)
  return (question.answers.find(({ key }) => (key === answerKey)).value)
}

const allAnswersSelected = (request, questionKey, answerKeyList, ALL_QUESTIONS) => {
  const { yarKey, answers } = getQuestionByKey(questionKey, ALL_QUESTIONS)
  const yarValue = getYarValue(request, yarKey)
  return (
    answerKeyList.every(answerKey => (
      answers.some(({ key, value }) => (
        yarValue.includes(value) && key === answerKey
      ))
    ))
  )
}

const someAnswersSelected = (request, questionKey, answerKeyList, ALL_QUESTIONS) => {
  const { yarKey, answers } = getQuestionByKey(questionKey, ALL_QUESTIONS)
  const yarValue = getYarValue(request, yarKey)
  return (
    answerKeyList.some(answerKey => (
      answers.some(({ value, key }) => (
        key === answerKey && yarValue.includes(value)
      ))
    ))
  )
}

module.exports = {
  notUniqueSelection,
  uniqueSelection,
  getQuestionByKey,
  getQuestionAnswer,
  allAnswersSelected,
  someAnswersSelected
}
