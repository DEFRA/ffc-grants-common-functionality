// const createServer = require('../../../../app/server')
// const { startPageUrl } = require('../../../../app/config/server')
const mockQuestionBank = require('./mocks/mockQuestionBank')

const { guardPage } = require('./../lib/page-guard')

jest.mock('./../lib/utils')
const { getQuestionAnswer } = require('./../lib/utils')

jest.mock('./../lib/session')
const { getYarValue } = require('./../lib/session')

// require('dotenv').config()

// jest.mock('../../../../app/config/question-bank', () => mockQuestionBank)

describe('Page Guard', () => {
//   const OLD_ENV = process.env
//   let server

    let request = {
        url: {
            pathname: '/business-location'
        }
    }

  beforeEach(async () => {
    jest.resetModules()
    // process.env = { ...OLD_ENV }
    // varList = { ...varListTemplate }

  })

  afterEach(() => {
    // process.env = OLD_ENV
    // server.stop()
    jest.clearAllMocks()

  })

  it('shoud return true if the site is decommissioned (date is in the past)', async () => {
    
    expect(guardPage(request, [], '/start', '2021/02/17', '23:59:58', mockQuestionBank)).toBe(true)

    expect(guardPage(request, [], '/start', '2021/02/17', '00:00:00', mockQuestionBank)).toBe(true)

    expect(guardPage(request, [], '/start', new Date(new Date().toDateString()), '00:00:00', mockQuestionBank)).toBe(true)

    expect(guardPage(request, [], '/start', new Date(new Date().toDateString()), '23:59:59', mockQuestionBank)).toBe(false)

  })

  it('shoud return true if guardData is an array and value is null', async () => {

    getYarValue.mockImplementationOnce(() => null)
    
    expect(guardPage(request, ['hello'], '/start', '2031/02/17', '23:59:58', mockQuestionBank)).toBe(true)

  })

  it('shoud return false if guardData is an array and value exists', async () => {

    getYarValue.mockImplementationOnce(() => 'applicant')

    expect(guardPage(request, ['applicant'], '/start', '2031/02/17', '00:00:00', mockQuestionBank)).toBe(false)

  })

  it('AND - should return true if no key found', async () => {

    let guardData = {
        preValidationKeys: ['applicant'],
        preValidationAnswer: ['applicant-A2'],
        preValidationRule: 'AND',
        preValidationUrls: ['applicant']
      }

    getQuestionAnswer.mockImplementationOnce(() => 'Consultant')
    getYarValue.mockImplementationOnce(() => 'Farmer')

    expect(guardPage(request, guardData, '/start', '2031/02/17', '23:59:58', mockQuestionBank)).toBe(true)

  })

  it('AND - should return false if all keys found (1 item)', async () => {

    let guardData = {
        preValidationKeys: ['applicant'],
        preValidationAnswer: ['applicant-A2'],
        preValidationRule: 'AND',
        preValidationUrls: ['applicant']
      }

    getQuestionAnswer.mockImplementationOnce(() => 'Farmer')
    getYarValue.mockImplementationOnce(() => 'Farmer')

    expect(guardPage(request, guardData, '/start', '2031/02/17', '23:59:58', mockQuestionBank)).toBe(false)

  })

  it('OR - should return true if no key found', async () => { 
    let guardData = {
        preValidationKeys: ['businessLocation', 'applicant'], 
        preValidationAnswer: ['business-location-A1', 'applicant-A1'],
        preValidationRule: 'OR',
        preValidationUrls: ['business-location', 'applicant']
      }

    getQuestionAnswer.mockImplementationOnce(() => 'Business')
    getYarValue.mockImplementationOnce(() => 'Location')
    getQuestionAnswer.mockImplementationOnce(() => 'Farmer')
    getYarValue.mockImplementationOnce(() => 'Consultant')

    expect(guardPage(request, guardData, '/start', '2031/02/17', '23:59:58', mockQuestionBank)).toBe(true)

  })

  it('OR - should return false if any key found', async () => {
    let guardData = {
        preValidationKeys: ['businessLocation', 'applicant'], 
        preValidationAnswer: ['business-location-A1', 'applicant-A1'],
        preValidationRule: 'OR',
        preValidationUrls: ['business-location', 'applicant']
      }

    getQuestionAnswer.mockImplementationOnce(() => 'Business')
    getYarValue.mockImplementationOnce(() => 'Business')
    getQuestionAnswer.mockImplementationOnce(() => 'Farmer')
    getYarValue.mockImplementationOnce(() => 'Consultant')

    expect(guardPage(request, guardData, '/start', '2031/02/17', '23:59:58', mockQuestionBank)).toBe(false)
  })

  it('NOT - should return true if any key found', async () => {

    let guardData = {
        preValidationKeys: ['legalStatus'],
        preValidationAnswer: ['legal-status-A12'],
        preValidationRule: 'NOT',
        preValidationUrls: ['legal-status']
      }

    getQuestionAnswer.mockImplementationOnce(() => 'legal')
    getYarValue.mockImplementationOnce(() => 'legal')
    getYarValue.mockImplementationOnce(() => 'legal')

    expect(guardPage(request, guardData, '/start', '2031/02/17', '23:59:58', mockQuestionBank)).toBe(true)
  })

  it('NOT - should load normal page if key not found', async () => {

    let guardData = {
        preValidationKeys: ['legalStatus'],
        preValidationAnswer: ['legal-status-A12'],
        preValidationRule: 'NOT',
        preValidationUrls: ['legal-status']
      }

    getQuestionAnswer.mockImplementationOnce(() => 'legal')
    getYarValue.mockImplementationOnce(() => 'status')
    getYarValue.mockImplementationOnce(() => 'status')


    expect(guardPage(request, guardData, '/start', '2031/02/17', '23:59:58', mockQuestionBank)).toBe(false)
  })


  it('NOT - should return true if preValidationKeys is not answered', async () => {

    let guardData = {
        preValidationKeys: ['legalStatus'],
        preValidationAnswer: ['legal-status-A12'],
        preValidationRule: 'NOT',
        preValidationUrls: ['legal-status']
      }

    getQuestionAnswer.mockImplementationOnce(() => 'legal')
    getYarValue.mockImplementationOnce(() => null)
    getYarValue.mockImplementationOnce(() => null)


    expect(guardPage(request, guardData, '/start', '2031/02/17', '23:59:58', mockQuestionBank)).toBe(true)
  })

  it('INCLUDES - should return false if any expected key found', async () => {

    let guardData = {
      preValidationKeys: ['solarTechnologies'],
      preValidationAnswer: ['solar-technologies-A2'],
      preValidationRule: 'INCLUDES',
      preValidationUrls: ['solar-technologies']
    }

    getQuestionAnswer.mockImplementationOnce(() => 'Solar PV panels')
    getYarValue.mockImplementationOnce(() => 'Solar PV panels')
    getYarValue.mockImplementationOnce(() => 'Solar PV panels')

    expect(guardPage(request, guardData, '/start', '2031/02/17', '23:59:58', mockQuestionBank)).toBe(false)
  })

  it('INCLUDES - should return true if key not found', async () => {

    let guardData = {
      preValidationKeys: ['solarTechnologies'],
      preValidationAnswer: ['solar-technologies-A2'],
      preValidationRule: 'INCLUDES',
      preValidationUrls: ['solar-technologies']
      }

      getQuestionAnswer.mockImplementationOnce(() => 'Solar PV panels')
      getYarValue.mockImplementationOnce(() => ['Battery storage'])
      getYarValue.mockImplementationOnce(() => ['Battery storage'])

    expect(guardPage(request, guardData, '/start', '2031/02/17', '23:59:58', mockQuestionBank)).toBe(true)
  })

  it('INCLUDES - should return true if yar value is null', async () => {

    let guardData = {
      preValidationKeys: ['solarTechnologies'],
      preValidationAnswer: ['solar-technologies-A2'],
      preValidationRule: 'INCLUDES',
      preValidationUrls: ['solar-technologies']
    }

    getQuestionAnswer.mockImplementationOnce(() => 'Solar PV panels')
    getYarValue.mockImplementationOnce(() => null)
    getYarValue.mockImplementationOnce(() => null)

    expect(guardPage(request, guardData, '/start', '2031/02/17', '23:59:58', mockQuestionBank)).toBe(true)
  })
  it('DEFAULT - should return false', async () => {

    let guardData = {
        preValidationKeys: ['legalStatus'],
        preValidationAnswer: ['legal-status-A12'],
        preValidationRule: 'DEFAULT',
        preValidationUrls: ['legal-status']
      }

    expect(guardPage(request, guardData, '/start', '2031/02/17', '23:59:58', mockQuestionBank)).toBe(false)
  })

    it('should return false if no guard data', async () => {
        expect(guardPage(request, null, '/start', '2031/02/17', '23:59:58', mockQuestionBank)).toBe(false)

    })


})
