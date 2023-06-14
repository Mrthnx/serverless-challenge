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
    return {
        statusCode: 400,
        body: JSON.stringify({
            data: null,
            message: error.details[0].message
        })
    };
}

const responseErrorServerInternal = () => {
    return {
      statusCode: 500,
      body: JSON.stringify({
        data: null,
        message: "Error interno del servidor"
      })
    };
}


module.exports = { 
    getParamIdOfEvent, 
    buildFilterEmployerFind, 
    responseErrorServerInternal ,
    responseErrorValidation,
    responseGeneral
}