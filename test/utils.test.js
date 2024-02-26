jest.mock('./../lib/session')
const { getYarValue } = require('./../lib/session')

describe('Utils', () => {

    const questionMock = [{
        key: 'mock',
        order: 10,
        title: 'Mock title',
        baseUrl: 'mock-url',
        answers: [
            {
                key: 'mock-A1',
                value: 'Mocking answer'
            },
            {
                key: 'mock-A2',
                value: 'not mock'
            }
        ],
        yarKey: 'mock-key'
    }]

  test('notUniqueSelection', () => {
    const { notUniqueSelection } = require('./../lib/utils')

    const option = 'option'
    let answers = 'answers'
    expect(notUniqueSelection(answers, option)).toBeFalsy

    answers = 'stringIncludesoption'
    expect(notUniqueSelection(answers, option)).toBeFalsy

    answers = ['option']
    expect(notUniqueSelection(answers, option)).toBeFalsy

    answers = ['notOption', 'option']
    expect(notUniqueSelection(answers, option)).toBe(true)
  })

  test('uniqueSelection', () => {
    const { uniqueSelection } = require('./../lib/utils')

    const option = 'option'
    let answers = 'answers'
    expect(uniqueSelection(answers, option)).toBeFalsy

    answers = 'stringIncludesoption'
    expect(uniqueSelection(answers, option)).toBe(true)

    answers = ['notOption', 'option']
    expect(uniqueSelection(answers, option)).toBe(false)

    answers = ['option']
    expect(uniqueSelection(answers, option)).toBeFalsy
  })

  test('getQuestionByKey', () => {
    
    const { getQuestionByKey } = require('./../lib/utils')

    const containsKey = (searchKey) => (questionMock.some(({ key }) => searchKey === key))

    expect(containsKey('fake-key')).toBe(false)
    expect(getQuestionByKey('fake-key', questionMock)).toBeUndefined

    expect(containsKey('mock')).toBe(true)
    expect(getQuestionByKey('mock', questionMock)).toBeDefined
    expect(getQuestionByKey('mock', questionMock)).toEqual(
      expect.objectContaining({
        key: 'mock',
        baseUrl: 'mock-url'
      })
    )
  })

  test('getQuestionAnswer', () => {
    const { getQuestionAnswer } = require('./../lib/utils')
    expect(getQuestionAnswer('mock', 'mock-A1', questionMock)).toBe('Mocking answer')
  })

  test('allAnswersSelected', () => {
    const { allAnswersSelected } = require('./../lib/utils')

    const mockAnswerList = ['mock-A1', 'mock-A2']

    getYarValue.mockReturnValueOnce([ 'Mocking answe', 'not moc' ])
    getYarValue.mockReturnValueOnce([ 'Mocking answer', 'not mock', 'other' ])
    
    expect(allAnswersSelected([], 'mock', mockAnswerList, questionMock)).toBe(false)
    expect(allAnswersSelected([], 'mock', mockAnswerList, questionMock)).toBe(true)
  })
  
  test('someAnswersSelected', () => {
    const { someAnswersSelected } = require('./../lib/utils')
    
    const mockAnswerList = ['mock-A1', 'mock-A2']
    
    getYarValue.mockReturnValueOnce([])
    getYarValue.mockReturnValueOnce([ 'Mocking answer', 'not mock' ])

    expect(someAnswersSelected([], 'mock', mockAnswerList, questionMock)).toBe(false)
    expect(someAnswersSelected([], 'mock', mockAnswerList, questionMock)).toBe(true)
  })
})
