# ffc-grants-common-functionality

Package containing common functionality for ffc-grants projects

## Installing the plugin

```
npm install ffc-grants-common-functionality
```

## How to use

This package contains several common functions that can be called and used in your ffc-grants repo

### Common Regex

In ffc-grants, there are a lot of different regex used. Some of these are fairly common, while others needed very specific requirements.

To use the common regex, import the regex object from this package.

```
const { regex } = require('ffc-grants-common-functionality')
```

Then, call the requested regex from the regex object. For example, to use the CHARS_MIN_10 regex, use the following code:

```
regex.CHARS_MIN_10
```

### List of Counties

When users enter details, they ar required to select a county from a dropdown. These counties are stored in a list, which can be found in this package.

To use the list of counties provided, import the counties list from this package.

```
const { counties } = require('ffc-grants-common-functionality')
```

Then, call the LIST_COUNTIES array from counties.

```
counties.LIST_COUNTIES
```

### getYarValue and setYarValue

These two functions are by far the most used within the ffc-grants applications, as they are able to store all of the users answers during their application.

To use either of these functions, import **session** from this package

```
const { session } = require('ffc-grants-common-funcitonality')
```

Then call either the getYarValue or setYarValue function from session. 

**getYarValue** requires 2 parameters:
- request 
- The yarKey

```
session.getYarValue(request, 'yarKey')
```

**setYarValue** requires 3 parameters:
- request
- The yarKey
- The value to set to the yarKey 

```
session.setYarValue(request, 'yarKey', 'test string')
```

### getOptions and setOptionsLabel

These two functions are used in the ffc-grants application to format page answers, whetehr in the form of a list due to being a multi-input page or as an individual answer in various different forms (text, tel, email etc).

To use either of these funcitons, first import **answerOptions** from the package

```
const { answerOptions } = require('ffc-grants-common-funcitonality')
```

Then, call either the getOptions function or the setOptionsLabel function. 

**getOptions** requires 4 parameters:
- data from the yarKey
- the question object
- details on conditional text (this can be left blank)
- The request

```
answerOptions.getOptions(data, question, conditional, request)
```

**setOptionsLabel** requires 3 parameters:
- data from the yarKey
- the answers list
- conditional text (this can be left blank)

```
answerOptions.setOptionsLabel(data, answers, conditional)
```

### Utils functions

There are several utils functions used in ffc-grants applications. These functions are primarily used to check user provided answers stored in yarKeys with the answers provided on the page. 

In the application, these are used in several places, such as in the pageGuard, when creating the page model for nunjuks and when checking user entered values before formatting the email

To use functions from utils, first import **utils** from the package

```
const { utils } = require('ffc-grants-common-functionality')
```

Then, call whichever function is needed

**notUniqueSelection** is used to check if a provided answer is not unique. It uses 2 parameters:
- A list of the questions answers
- The users selected option

```
utils.notUniqueSelection(answers, userSelectedAnswer)
```

**uniqueSelection** checks if a provided answer is unique. It uses 2 parameters:
- A list of the question answers
- The users selected option

```
utils.uniqueSelection(answers, userSelectedAnswer)
```

**getQuestionByKey** retrieves a question based on the question key. It uses 2 parameters:
- The question key to look for
- The list of question objects

```
utils.getQuestionByKey(questionKey, arrayOfQuestionObjects)
```

**getQuestionAnswer** retrieves a question answer based on the provided question key and subsequent answer key. It uses 3 parameters:
- The question key to look for
- The answer key for the specific answer to look for
- The list of question objects

```
utils.getQuestionAnswer(questionKey, answerKey, arrayOfQuestionObjects)
```

**allAnswersSelected** returns a list of all of the answers the user selected on a page. It uses 4 parameters:
- The request (for retrieving the users answers)
- The question key to look for
- A list of the answer keys in the question
- The list of question objects

```
utils.allAnswersSelected(request, questionKey, arrayOfAnswerKeys, arrayOfQuestionObjects)
```

**someAnswersSelected** returns a list containing some of the answers the user selected on a page. It uses 4 parameters:
- The request (for retrieving the users answers)
- The question key to look for
- A list of the answer keys in the question
- The list of question objects

```
utils.someAnswersSelected(request, questionKey, arrayOfAnswerKeys, arrayOfQuestionObjects)
```

## Contributing to this project

If you have an idea you'd like to contribute please log an issue.

All contributions should be submitted via a pull request.

## License

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3

The following attribution statement MUST be cited in your products and applications when using this information.

> Contains public sector information licensed under the Open Government license v3

### About the license

The Open Government Licence (OGL) was developed by the Controller of Her Majesty's Stationery Office (HMSO) to enable information providers in the public sector to license the use and re-use of their information under a common open licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.