'use strict';

const { Employer } = require('./entities/employer');
const { employerUpdateValidate, employerCreateValidate } = require('./validation/employer')
const { getParamIdOfEvent, buildFilterEmployerFind, responseErrorServerInternal, responseGeneral } = require('./utils/utils');

module.exports.getEmployer = async (event) => {
  try {
    const employerId = getParamIdOfEvent( event );

    const filterEmployer = buildFilterEmployerFind( employerId );

    const employers = await Employer.findAll(filterEmployer);
    console.log(employers.length)
    return responseGeneral(
      employers.length!=0?200:404, 
      employers, 
      employers.length!=0?"":"Registro no encontrado");

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
    
    return responseGeneral(
      response!=0?200:400,
      null,
      response!=0?"Registro creado":"Error al creado registro"
    );

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

    return responseGeneral(
      response!=0?200:400,
      null,
      response!=0?"Registro actualizado":"Error al actualizar registro"
    );
    
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

    return responseGeneral( 
      response!=0?200:404,
      null,
      response!=0?"Registro eliminado":"No se encontro registro"
    );
    
  } catch (error) {
    console.error('Error:', error);
    return responseErrorServerInternal();
  }
};