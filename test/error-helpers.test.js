jest.mock('./../lib/utils')
const { getQuestionAnswer } = require('./../lib/utils')


describe('Error helpers', () => {
    const {
      validateAnswerField,
      checkInputError
    } = require('./../lib/error-helpers')
  
    test('check validateAnswerField() - NOT_EMPTY', async () => {
      expect(validateAnswerField('value', 'NOT_EMPTY', {}, {})).toBe(true)

      expect(validateAnswerField('value', 'NOT_EMPTY', {extraFieldsToCheck: 'field'}, { field: 'hello' })).toBe(true)

      expect(validateAnswerField(null, 'NOT_EMPTY', {}, {})).toBe(false)

      expect(validateAnswerField(null, 'NOT_EMPTY',{extraFieldsToCheck: ['field']}, { field: 'hello' })).toBe(true)
  
  
    })

    test('check validateAnswerField() - STANDALONE_ANSWER', async () => {
        let value = 'hello'
        let details = { 
            standaloneObject: {
                questionKey: 'questionKey',
                answerKey: 'answerKey'
            }
        }

        getQuestionAnswer.mockImplementationOnce(() => 'hello')

        expect(validateAnswerField(value, 'STANDALONE_ANSWER', details, {})).toBe(true)

        value = ['hello', 'world']
        getQuestionAnswer.mockImplementationOnce(() => 'hello')

        expect(validateAnswerField(value, 'STANDALONE_ANSWER', details, {})).toBe(false)

        value = ['hello']
        getQuestionAnswer.mockImplementationOnce(() => null)

        expect(validateAnswerField(value, 'STANDALONE_ANSWER', details, {})).toBe(true)
    })

    test('check validateAnswerField() - DEPENDENT_ANSWERS', async () => {
      let value = 'hello'
      let details = { 
          dependentAnswerArray: ['answerKey1', 'answerKey2'],
          questionKey: 'questionKey'
      }

      getQuestionAnswer.mockImplementationOnce(() => 'hello')
      getQuestionAnswer.mockImplementationOnce(() => 'world')


      expect(validateAnswerField(value, 'DEPENDENT_ANSWERS', details, {})).toBe(false)

      value = ['hello', 'world']
      getQuestionAnswer.mockImplementationOnce(() => 'hello')
      getQuestionAnswer.mockImplementationOnce(() => 'world')

      expect(validateAnswerField(value, 'DEPENDENT_ANSWERS', details, {})).toBe(true)

      value = ['mock']
      getQuestionAnswer.mockImplementationOnce(() => 'hello')
      getQuestionAnswer.mockImplementationOnce(() => 'world')

      expect(validateAnswerField(value, 'DEPENDENT_ANSWERS', details, {})).toBe(false)

    })

    test('check validateAnswerField() - CONFIRMATION_ANSWER', async () => {
        let details = { 
            fieldsToCampare: ['field1', 'field2'] 
        }

        let payload = {
            'field1': 'hello',
            'field2': 'hello'
        }
        expect(validateAnswerField('hello', 'CONFIRMATION_ANSWER', details, payload)).toBe(true)
    })

    test('check validateAnswerField() - REGEX (and regexCheck function)', async () => {

        let details = {
            regex: /^.{1,10}$/
        }

        expect(validateAnswerField('hello', 'REGEX', details, {})).toBe(true)

        expect(validateAnswerField(null, 'REGEX', details, {})).toBe(true)

        expect(validateAnswerField('why is this a long message? O.o', 'REGEX', details, {})).toBe(false)
    })

    test('check validateAnswerField() - MIN_MAX_CHARS', async () => {
        let details = {
            min: 1,
            max: 10
        }

        expect(validateAnswerField('hello', 'MIN_MAX_CHARS', details, {})).toBe(true)

        expect(validateAnswerField('', 'MIN_MAX_CHARS', details, {})).toBe(false)

        expect(validateAnswerField('why is this a long message? O.o', 'MIN_MAX_CHARS', details, {})).toBe(false)
    })

    test('check validateAnswerField() - MIN_MAX values', async () => {
        let details = {
            min: 1,
            max: 10
        }

        expect(validateAnswerField(5, 'MIN_MAX', details, {})).toBe(true)

        expect(validateAnswerField(0, 'MIN_MAX', details, {})).toBe(false)

        expect(validateAnswerField(30, 'MIN_MAX', details, {})).toBe(false)
    })

    test('check validateAnswerField() - default check', async () => {
        expect(validateAnswerField('hello', 'DEFAULT_SELECT', {}, {})).toBe(false)
    })
  
    test('returns undefined when validate is an empty array', () => {
        const result = checkInputError([], false, {}, 'yarKey');
        expect(result).toBeUndefined();
      });
    
    test('returns validation object when isconditionalAnswer is true, dependentKey exists and validation fails', () => {
        const validate = [
          {
            type: 'NOT_EMPTY',
            dependentKey: 'dependentKey'
          }
        ];
        const payload = {
          dependentKey: ''
        };
        const result = checkInputError(validate, true, payload, 'yarKey');
        expect(result).toEqual(validate[0]);
    });
    
    test('returns validation object when isconditionalAnswer is false, dependentKey does not exist and validation fails', () => {
        const validate = [
          {
            type: 'NOT_EMPTY',
            dependentKey: null
          }
        ];
        const payload = {
          yarKey: ''
        };
        const result = checkInputError(validate, false, payload, 'yarKey');
        expect(result).toEqual(validate[0]);
    });
  })
  