import joi from 'joi'; 

export const email = joi.string().email().required();
export const password = joi.string().min(6).required();
