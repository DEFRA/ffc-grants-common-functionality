const { getOptions, setOptionsLabel } = require('../lib/answer-options')


describe('answer-options', () => {
  test('check getOptions()', () => {
    let question = {
      costDataType: 'cost-data-type',
      answers: [],
      yarKey: 'mock-yarKey',
      type: 'input',
      classes: 'mock-classes',
      hint: 'mock-hint',
      id: 'mock-id',
      label: 'mock-label',
      prefix: 'mock-prefix',
      suffix: 'mock-suffix',
      value: 'mock-value'
    }
    expect(getOptions(undefined, question, 'cond-html', {})).toEqual({
      classes: 'mock-classes',
      hint: 'mock-hint',
      id: 'mock-yarKey',
      name: 'mock-yarKey',
      label: 'mock-label',
      prefix: 'mock-prefix',
      suffix: 'mock-suffix',
      value: ''
    })

    question = {
      ...question,
      type: 'email'
    }
    expect(getOptions(undefined, question, 'cond-html', {})).toEqual({
      classes: 'mock-classes',
      hint: 'mock-hint',
      id: 'mock-yarKey',
      name: 'mock-yarKey',
      label: 'mock-label',
      prefix: 'mock-prefix',
      suffix: 'mock-suffix',
      value: ''
    })

    question = {
      ...question,
      type: 'tel'
    }
    expect(getOptions(undefined, question, 'cond-html', {})).toEqual({
      classes: 'mock-classes',
      hint: 'mock-hint',
      id: 'mock-yarKey',
      name: 'mock-yarKey',
      label: 'mock-label',
      prefix: 'mock-prefix',
      suffix: 'mock-suffix',
      value: ''
    })

    question = {
      ...question,
      type: 'multi-input',
      allFields: [
        {
          yarKey: 'mock-yarkey',
          type: 'switch-default',
          answers: [{ value: 'value', hint: 'hint', text: 'text', conditional: 'conditional' }]
        },
        {
            yarKey: 'mock-yarkey',
            type: 'sub-heading',
            answers: [{ value: 'value', hint: 'hint', text: 'text', conditional: 'conditional' }]
          },
          {
            yarKey: 'mock-yarkey',
            type: 'text',
            answers: [{ value: 'value', hint: 'hint', text: 'text', conditional: 'conditional' }]
          },
          {
            yarKey: 'mock-yarkey',
            type: 'number',
            answers: [{ value: 'value', hint: 'hint', text: 'text', conditional: 'conditional' }]
          },
          {
            yarKey: 'mock-yarkey',
            type: 'email',
            answers: [{ value: 'value', hint: 'hint', text: 'text', conditional: 'conditional' }]
          },
          {
            yarKey: 'mock-yarkey',
            type: 'tel',
            answers: [{ value: 'value', hint: 'hint', text: 'text', conditional: 'conditional' }]
          },
          {
            yarKey: 'mock-yarkey',
            type: 'select',
            answers: [{ value: 'value', hint: 'hint', text: 'text', conditional: 'conditional' }]
          }
      ]
    }
    const data = { 'mock-yarkey': 'mock-value' }
    expect(getOptions(data, question, 'cond-html', {})).toEqual([
      {
        classes: 'govuk-fieldset__legend--l',
        endFieldset: undefined,
        fieldset: {
          legend: {
            classes: 'govuk-fieldset__legend--l',
            isPageHeading: true,
            text: undefined
          }
        },
        hint: undefined,
        id: 'mock-yarkey',
        items: [
          { checked: false, conditional: 'conditional', hint: 'hint', selected: false, text: 'text', value: 'value' }
        ],
        name: 'mock-yarkey',
        type: 'switch-default'
      },
      {
          "endFieldset": undefined,
          "text": undefined,
          "type": "sub-heading",
        },
        {
          "classes": undefined,
          "endFieldset": undefined,
          "hint": undefined,
          "id": "mock-yarkey",
          "inputmode": undefined,
          "label": undefined,
          "name": "mock-yarkey",
          "pattern": undefined,
          "prefix": undefined,
          "suffix": undefined,
          "type": "text",
          "value": "mock-value",
        },
        {
            "classes": undefined,
            "endFieldset": undefined,
            "hint": undefined,
            "id": "mock-yarkey",
            "inputmode": undefined,
            "label": undefined,
            "name": "mock-yarkey",
            "pattern": undefined,
            "prefix": undefined,
            "suffix": undefined,
            "type": "number",
            "value": "mock-value",
        },
        {
            "classes": undefined,
            "endFieldset": undefined,
            "hint": undefined,
            "id": "mock-yarkey",
            "inputmode": undefined,
            "label": undefined,
            "name": "mock-yarkey",
            "pattern": undefined,
            "prefix": undefined,
            "suffix": undefined,
            "type": "email",
            "value": "mock-value",
        },
        {
            "classes": undefined,
            "endFieldset": undefined,
            "hint": undefined,
            "id": "mock-yarkey",
            "inputmode": undefined,
            "label": undefined,
            "name": "mock-yarkey",
            "pattern": undefined,
            "prefix": undefined,
            "suffix": undefined,
            "type": "tel",
            "value": "mock-value",
        },
        {
            "classes": "govuk-fieldset__legend--l",
            "endFieldset": undefined,
            "hint": undefined,
            "id": "mock-yarkey",
            "items": [
              {
                "text": "Select an option",
                 "value": "",
               },
               {
                 "selected": false,
                 "text": {
                   "conditional": "conditional",
                   "hint": "hint",
                   "text": "text",
                   "value": "value",
                 },
                 "value": {
                   "conditional": "conditional",
                  "hint": "hint",
                  "text": "text",
                  "value": "value",
                },
              },
            ],
            "label": undefined,
            "name": "mock-yarkey",
            "type": "select", 
        }

    ])
    expect(getOptions(undefined, question, 'cond-html', {})).toEqual([
      {
        classes: 'govuk-fieldset__legend--l',
        endFieldset: undefined,
        fieldset: {
          legend: {
            classes: 'govuk-fieldset__legend--l',
            isPageHeading: true,
            text: undefined
          }
        },
        hint: undefined,
        id: 'mock-yarkey',
        items: [
          { checked: false, conditional: 'conditional', hint: 'hint', selected: false, text: 'text', value: 'value' }
        ],
        name: 'mock-yarkey',
        type: 'switch-default'
      },
      {
        "endFieldset": undefined,
        "text": undefined,
        "type": "sub-heading",
      },
      {
        "classes": undefined,
        "endFieldset": undefined,
        "hint": undefined,
        "id": "mock-yarkey",
        "inputmode": undefined,
        "label": undefined,
        "name": "mock-yarkey",
        "pattern": undefined,
        "prefix": undefined,
        "suffix": undefined,
        "type": "text",
        "value": "",
      },
      {
          "classes": undefined,
          "endFieldset": undefined,
          "hint": undefined,
          "id": "mock-yarkey",
          "inputmode": undefined,
          "label": undefined,
          "name": "mock-yarkey",
          "pattern": undefined,
          "prefix": undefined,
          "suffix": undefined,
          "type": "number",
          "value": "",
      },
      {
          "classes": undefined,
          "endFieldset": undefined,
          "hint": undefined,
          "id": "mock-yarkey",
          "inputmode": undefined,
          "label": undefined,
          "name": "mock-yarkey",
          "pattern": undefined,
          "prefix": undefined,
          "suffix": undefined,
          "type": "email",
          "value": "",
      },
      {
          "classes": undefined,
          "endFieldset": undefined,
          "hint": undefined,
          "id": "mock-yarkey",
          "inputmode": undefined,
          "label": undefined,
          "name": "mock-yarkey",
          "pattern": undefined,
          "prefix": undefined,
          "suffix": undefined,
          "type": "tel",
          "value": "",
      },
      {
          "classes": "govuk-fieldset__legend--l",
          "endFieldset": undefined,
          "hint": undefined,
          "id": "mock-yarkey",
          "items": [
            {
              "text": "Select an option",
               "value": "",
             },
             {
               "selected": false,
               "text": {
                 "conditional": "conditional",
                 "hint": "hint",
                 "text": "text",
                 "value": "value",
               },
               "value": {
                 "conditional": "conditional",
                "hint": "hint",
                "text": "text",
                "value": "value",
              },
            },
          ],
          "label": undefined,
          "name": "mock-yarkey",
          "type": "select", 
      }
    ])

    question = {
      ...question,
      type: 'select'
    }
    expect(getOptions(undefined, question, 'cond-html', {})).toEqual({
      classes: 'mock-classes',
      hint: 'mock-hint',
      id: 'mock-yarKey',
      name: 'mock-yarKey',
      label: 'mock-label',
      items: [
        {
          text: 'Select an option',
          value: ''
        },
        // {
        //   selected: false,
        //   text: 'answer-1',
        //   value: 'answer-1'
        // },
        // {
        //   selected: false,
        //   text: 'answer-2',
        //   value: 'answer-2'
        // },
        // {
        //   selected: false,
        //   text: 'answer-1',
        //   value: 'answer-1'
        // },
        // {
        //   selected: false,
        //   text: 'answer-2',
        //   value: 'answer-2'
        // }
      ]
    })

    const { classes, ...questionWithoutClasses } = question
    expect(getOptions(undefined, questionWithoutClasses, 'cond-html', {})).toEqual({
      classes: 'govuk-fieldset__legend--l',
      hint: 'mock-hint',
      id: 'mock-yarKey',
      name: 'mock-yarKey',
      label: 'mock-label',
      items: [
        {
          text: 'Select an option',
          value: ''
        },
        // {
        //   selected: false,
        //   text: 'answer-1',
        //   value: 'answer-1'
        // },
        // {
        //   selected: false,
        //   text: 'answer-2',
        //   value: 'answer-2'
        // },
        // {
        //   selected: false,
        //   text: 'answer-1',
        //   value: 'answer-1'
        // },
        // {
        //   selected: false,
        //   text: 'answer-2',
        //   value: 'answer-2'
        // }
      ]
    })

    question = {
      ...question,
      type: 'select-default'
    }
    expect(getOptions(undefined, question, 'cond-html', {})).toEqual(
      {
        classes: 'mock-classes',
        fieldset: {
          legend: {
            classes: 'mock-classes',
            isPageHeading: true,
            text: undefined
          }
        },
        hint: 'mock-hint',
        id: 'mock-yarKey',
        // items: [
        //   {
        //     checked: false,
        //     hint: undefined,
        //     selected: true,
        //     text: undefined,
        //     value: undefined
        //   },
        //   {
        //     checked: false,
        //     hint: undefined,
        //     selected: true,
        //     text: undefined,
        //     value: undefined
        //   },
        //   {
        //     checked: false,
        //     hint: undefined,
        //     selected: true,
        //     text: undefined,
        //     value: undefined
        //   },
        //   {
        //     checked: false,
        //     hint: undefined,
        //     selected: true,
        //     text: undefined,
        //     value: undefined
        //   }
        // ],
        items :[],
        name: 'mock-yarKey'
      }
    )
  })

  test('check setOptionsLabel()', () => {
    const answers = [
      { value: 'divider' },
      { value: 'mock-data', hint: 'mock-hint' },
      { value: 'another-mock-data', hint: 'mock-hint', conditional: 'mock-cond' },
      { value: 'another-mock-data', hint: 'mock-hint', conditional: 'mock-cond', text: 'mock-text' },
      { value: 'mock-data', hint: 'mock-hint', conditional: 'mock-cond', text: 'mock-text' },
      { value: undefined, hint: 'mock-hint', conditional: 'mock-cond', text: 'mock-text'}
    ]
    expect(setOptionsLabel('mock-data', answers, 'cond-html')).toEqual([
      { divider: 'or' },
      {
        value: 'mock-data',
        text: 'mock-data',
        hint: 'mock-hint',
        checked: true,
        selected: true
      },
      {
        value: 'another-mock-data',
        text: 'another-mock-data',
        conditional: { html: 'cond-html' },
        hint: 'mock-hint',
        checked: false,
        selected: false
      },
      {
        value: 'another-mock-data',
        text: 'mock-text',
        conditional: 'mock-cond',
        hint: 'mock-hint',
        checked: false,
        selected: false
      },
      {
        value: 'mock-data',
        text: 'mock-text',
        conditional: 'mock-cond',
        hint: 'mock-hint',
        checked: true,
        selected: true
      },
      {
        value: undefined,
        text: 'mock-text',
        conditional: 'mock-cond',
        hint: 'mock-hint',
        checked: false,
        selected: false
      }
    ])

    expect(setOptionsLabel(undefined, answers, 'cond-html')).toEqual([
        { divider: 'or' },
      {
        value: 'mock-data',
        text: 'mock-data',
        hint: 'mock-hint',
        checked: false,
        selected: false
      },
      {
        value: 'another-mock-data',
        text: 'another-mock-data',
        conditional: { html: 'cond-html' },
        hint: 'mock-hint',
        checked: false,
        selected: false
      },
      {
        value: 'another-mock-data',
        text: 'mock-text',
        conditional: 'mock-cond',
        hint: 'mock-hint',
        checked: false,
        selected: false
      },
      {
        value: 'mock-data',
        text: 'mock-text',
        conditional: 'mock-cond',
        hint: 'mock-hint',
        checked: false,
        selected: false
      },
      {
        value: undefined,
        text: 'mock-text',
        conditional: 'mock-cond',
        hint: 'mock-hint',
        checked: false,
        selected: true
      }
    ])

    expect(setOptionsLabel(['mock-data'], answers, 'cond-html')).toEqual([
        { divider: 'or' },
      {
        value: 'mock-data',
        text: 'mock-data',
        hint: 'mock-hint',
        checked: true,
        selected: false
      },
      {
        value: 'another-mock-data',
        text: 'another-mock-data',
        conditional: { html: 'cond-html' },
        hint: 'mock-hint',
        checked: false,
        selected: false
      },
      {
        value: 'another-mock-data',
        text: 'mock-text',
        conditional: 'mock-cond',
        hint: 'mock-hint',
        checked: false,
        selected: false
      },
      {
        value: 'mock-data',
        text: 'mock-text',
        conditional: 'mock-cond',
        hint: 'mock-hint',
        checked: true,
        selected: false
      },
      {
        value: undefined,
        text: 'mock-text',
        conditional: 'mock-cond',
        hint: 'mock-hint',
        checked: false,
        selected: false
      }
    ])
    
  })
})
