'use strict';

const { Employer } = require('./entities/employer');
const { employerUpdateValidate, employerCreateValidate } = require('./validation/employer')
const { 
  getParamIdOfEvent, 
  buildFilterEmployerFind, 
  responseErrorServerInternal, 
  responseNotFound, 
  responseSuccess, 
  responseError,
  isArrayEmptyOrNull 
} = require('./utils/utils');

module.exports.getEmployer = async (event) => {
  try {
    const employerId = getParamIdOfEvent( event );

    const filterEmployer = buildFilterEmployerFind( employerId );

    const employers = await Employer.findAll(filterEmployer);
    
    if( isArrayEmptyOrNull( employers ) ) {
      return responseNotFound();
    }else {
      return responseSuccess( employers );
    }

  } catch (error) {
    console.error('Error:', error);
    return responseErrorServerInternal();
  }
};

module.exports.postEmployer = async (event) => {
  try {
    const bodyEmployer = event.body?JSON.parse(event.body):null;

    const {error} = await employerCreateValidate( bodyEmployer );
   
    if (error) {
      return responseErrorValidation(error);
    }

    const response = await Employer.create( bodyEmployer );

    if( response != 0 ) {
      return responseSuccess(_, 'Registro creado');
    }else {
      return responseError('Error al crear registro');
    }

  } catch (error) {
    console.error('Error:', error);
    return responseErrorServerInternal();
  }
};

module.exports.patchEmployer = async (event) => {
  try {
    const bodyEmployer = event.body?JSON.parse(event.body):null;

    const {error} = await employerUpdateValidate( bodyEmployer );
   
    if (error) {
      return responseErrorValidation(error);
    }

    const response = await Employer.update( {
      ...bodyEmployer, fechamodificacion: new Date()
    }, {
      where: {id: bodyEmployer.id, estado: true}
    } );

    if( response != 0 ) {
      return responseSuccess(_, 'Registro actualizado');
    }else {
      return responseError('Error al actualizar registro');
    }
    
  } catch (error) {
    console.error('Error:', error);
    return responseErrorServerInternal();
  }
};

module.exports.deleteEmployer = async (event) => {
  try {
    let employerId = getParamIdOfEvent(event);

    const response = await Employer.update({
      estado: false, fechamodificacion: new Date
    }, {
      where: {id: employerId, estado: true}
    });

    if( response != 0 ) {
      return responseSuccess(_, 'Registro eliminado');
    }else {
      return responseNotFound();
    }
    
  } catch (error) {
    console.error('Error:', error);
    return responseErrorServerInternal();
  }
};