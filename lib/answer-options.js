
function isChecked (data, option) {
    return typeof data === 'string' ? !!data && data === option : !!data && data.includes(option)
  }
  
  function setOptionsLabel (data, answers, conditionalHtml) {
    return answers.map(answer => {
      const { value, hint, text, conditional, behaviour } = answer
  
      if (value === 'divider') {
        return { divider: 'or' }
      }
  
      if (!answer.text) {
        return {
          value,
          text: value,
          behaviour,
          ...conditional ? { conditional: { html: conditionalHtml } } : {},
          hint,
          checked: isChecked(data, value),
          selected: data === value
        }
      }
  
      return {
        value,
        text,
        behaviour,
        conditional,
        hint,
        checked: isChecked(data, value),
        selected: data === value
      }
    })
  }
  
  function setSelectLabels (data, selectList) {
    return [
      { text: 'Select an option', value: '' },
      ...selectList.map(selectValue => {
        return {
          value: selectValue,
          text: selectValue,
          selected: data === selectValue
        }
      })
  
    ]
  }
  
  const inputOptions = (data, question, conditionalHtml) => {
    const { yarKey, title, hint, answers, classes = 'govuk-fieldset__legend--l' } = question
    return {
      classes,
      hint,
      id: yarKey,
      name: yarKey,
      fieldset: {
        legend: {
          text: title,
          isPageHeading: true,
          classes
        }
      },
      items: setOptionsLabel(data, answers, conditionalHtml)
    }
  }
  
  const selectField = (data, question) => {
    const { yarKey, label, hint, answers, classes = 'govuk-fieldset__legend--l' } = question
  
    return {
      classes,
      label,
      hint,
      id: yarKey,
      name: yarKey,
      items: setSelectLabels(data, answers)
    }
  }
  
  const textField = (data, question, _request = null) => {
    const { yarKey, prefix, suffix, label, classes, inputmode, pattern } = question
    return {
      inputmode,
      pattern,
      classes,
      prefix,
      suffix,
      label,
      id: yarKey,
      name: yarKey,
      hint: question.hint,
      value: data || ''
    }
  }
  
  const getAllInputs = (data, question, conditionalHtml, request) => {
    const { allFields } = question
    let dataObject
    if (!data) {
      allFields.forEach(field => {
        dataObject = {
          ...dataObject,
          [field.yarKey]: ''
        }
      })
      data = dataObject
    }
    return allFields.map(field => {
      const { type, endFieldset } = field
      let fieldItems
      switch (type) {
        case 'sub-heading':
          fieldItems = { text: field.text }
          break
        case 'text':
          fieldItems = textField(data[field.yarKey], field, request)
          break
        case 'number':
          fieldItems = textField(data[field.yarKey], field, request)
          break
        case 'email':
          fieldItems = textField(data[field.yarKey], field, request)
          break
        case 'tel':
          fieldItems = textField(data[field.yarKey], field, request)
          break
        case 'select':
          fieldItems = selectField(data[field.yarKey], field)
          break
        default:
          fieldItems = inputOptions(data[field.yarKey], field, conditionalHtml)
          break
      }
  
      return {
        type,
        endFieldset,
        ...fieldItems
      }
    })
  }
  
  const getOptions = (data, question, conditionalHtml, request) => {
  
    switch (question.type) {
      case 'input':
        return textField(data, question)
      case 'email':
        return textField(data, question)
      case 'tel':
        return textField(data, question)
      case 'multi-input':
        return getAllInputs(data, question, conditionalHtml, request)
      case 'select':
        return selectField(data, question)
      default:
        return inputOptions(data, question, conditionalHtml)
    }
  }
  
  module.exports = {
    getOptions,
    setOptionsLabel
  }
  