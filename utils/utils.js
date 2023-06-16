const getParamIdOfEvent = (event) => {
    let employerId = null;
    if( event.pathParameters && event.pathParameters.id ) {
      employerId = event.pathParameters.id;
    }
    return employerId;
}

const buildFilterEmployerFind = (employerId) => {
    let filterEmployer = {
      where: {
        estado: true,
      },
    }

    if( employerId ){
      filterEmployer = {
        where: {
          id: employerId, 
          estado: true,
        },
      }
    }
    return filterEmployer;
}

const responseGeneral = (statusCode, data, message) => {
    return {
        statusCode,
        body: JSON.stringify({
            data,
            message
        })
    }
}

const responseErrorValidation = (error) => {
    return responseGeneral( 400, null, error.details[0].message );
}

const responseError = (message) => {
  return responseGeneral( 400, null, message );
}

const responseNotFound = (message='Registro no encontrado') => {
    return responseGeneral( 404, null, message );
}

const responseErrorServerInternal = () => {
    return responseGeneral(500, null, 'Error interno del servidor');
}

const responseSuccess = (data='', message='') => {
  return responseGeneral(200, data, message);
}

const isArrayEmptyOrNull = (array) => {
  return !Array.isArray(array) || array.length === 0;
}


module.exports = { 
    getParamIdOfEvent, 
    buildFilterEmployerFind, 
    responseErrorServerInternal ,
    responseErrorValidation,
    responseGeneral,
    responseNotFound,
    responseSuccess,
    responseError,
    isArrayEmptyOrNull
}