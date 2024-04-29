// const { getQuestionAnswer } = require('ffc-grants-common-functionality').utils
const { getQuestionAnswer } = require('./utils')
// const { ALL_QUESTIONS } = require('./../config/question-bank')

const minMaxCheck = (value, min, max) =>
  value >= min && value <= max


const regexCheck = (regex, value) =>
  !value || regex.test(value)


const validateAnswerField = (value, validationType, details, payload, ALL_QUESTIONS) => {
  switch (validationType) {
    case 'NOT_EMPTY': {
      const { extraFieldsToCheck } = details

      if (extraFieldsToCheck && !value) {
        return extraFieldsToCheck.some(extraField => (
          !!payload[extraField]
        ))
      }

      return !!value
    }

    case 'STANDALONE_ANSWER': {
      const selectedAnswer = [value].flat()
      const {
        standaloneObject: {
          questionKey: standaloneQuestionKey,
          answerKey: standaloneAnswerKey
        }
      } = details
      const standAloneAnswer = getQuestionAnswer(standaloneQuestionKey, standaloneAnswerKey, ALL_QUESTIONS)

      if (selectedAnswer.includes(standAloneAnswer)) {
        return selectedAnswer.length === 1
      }
      return true
    }

    case 'DEPENDENT_ANSWERS': {

      const selectedAnswer = [value].flat()
      const dependentAnswers = details.dependentAnswerArray.map(answerKey => getQuestionAnswer(details.questionKey, answerKey, ALL_QUESTIONS))

      return !dependentAnswers.every(answer => selectedAnswer.includes(answer))

    }

    case 'COMBINATION_ANSWER': {
      const selectedAnswer = [value].flat()
      const {
        combinationObject: {
          questionKey: combinationQuestionKey,
          combinationAnswerKeys,
        }
      } = details
      const combinationanswers = combinationAnswerKeys.map(answerKey =>  getQuestionAnswer(combinationQuestionKey, answerKey, ALL_QUESTIONS))

      if (selectedAnswer.includes(combinationanswers[0]) && selectedAnswer.length > 1) {
        return selectedAnswer.every ((answer, index) => answer === combinationanswers[index])
      }

      return true
    }

    case 'CONFIRMATION_ANSWER': {
      const { fieldsToCampare } = details
      return payload[fieldsToCampare[0]] === payload[fieldsToCampare[1]]
    }

    case 'REGEX': {
      const { regex } = details
      return regexCheck(regex, value)
    }

    case 'MIN_MAX_CHARS': {
      const { min, max } = details
      return minMaxCheck(value.length, min, max)
    }

    case 'MIN_MAX': {
      const { min, max } = details
      if (String(value).includes(',')) {
        value = Number(value.replace(/,/g, ''))
      }
      return minMaxCheck(value, min, max)
    }

    default:
      return false
  }
}

const checkInputError = (validate, isConditionalAnswer, payload, yarKey, ALL_QUESTIONS) => {
  return validate.find(
    ({ type, dependentKey, ...details }) => (isConditionalAnswer && dependentKey)
      ? (validateAnswerField(payload[dependentKey], type, details, payload, ALL_QUESTIONS) === false)
      : !dependentKey && (validateAnswerField(payload[yarKey], type, details, payload, ALL_QUESTIONS) === false)
  )
}

module.exports = {
  validateAnswerField,
  checkInputError
}
