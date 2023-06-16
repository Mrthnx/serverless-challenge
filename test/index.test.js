const { responseGeneral, responseSuccess, responseError, getParamIdOfEvent, responseNotFound, isArrayEmptyOrNull } = require("../utils/utils")


test('Response success', () => {
    const response = responseSuccess();
    expect(response.statusCode).toBe(200)
})

test('Response error', () => {
    const response = responseError();
    expect(response.statusCode).toBe(400)
})

test('Response not found', () => {
    const response = responseNotFound();
    expect(response.statusCode).toBe(404)
})

test('Response not found with data is null', () => {
    const response = responseNotFound();
    expect(JSON.parse(response.body).data).toBe(null)
})

test('Response 300', () => {
    const response = responseGeneral(300, null, '');
    expect(response.statusCode).toBe(300)
})

test('Get param Id valid', () => {
    const paramId = getParamIdOfEvent({pathParameters: {id:1}});
    expect(paramId).toBe(1)
})

test('Array is empty', ()=> {
    expect(isArrayEmptyOrNull([])).toBe(true)
})