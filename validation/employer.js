const Joi = require('joi');

const employerCreateSchema = Joi.object({
    nombre: Joi.string().pattern(new RegExp('^[a-zA-Z ]*$')).required(),
    edad: Joi.number().min(18).max(65).required(),
    cargo: Joi.string().required(),
});

const employerUpdateSchema = Joi.object({
  id: Joi.number().required(),
  nombre: Joi.string().pattern(new RegExp('^[a-zA-Z ]*$')),
  edad: Joi.number().min(18).max(65),
  cargo: Joi.string(),
});

const employerCreateValidate = (employer) => {
  return employerCreateSchema.validate(employer);
};

const employerUpdateValidate = (employer) => {
  return employerUpdateSchema.validate(employer);
};

module.exports = { employerCreateValidate, employerUpdateValidate }