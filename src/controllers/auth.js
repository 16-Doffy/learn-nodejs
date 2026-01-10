import * as services from "../services";
import { badRequest, internalServerError } from "../middleware/handle_errors";
import { email, password } from "../helper/joi_schema";
import joi from "joi";

export const register = async (req, res) => {
    try {
        const { error, value } = joi.object({email, password}).validate(req.body);
        if(error) return badRequest(error.details[0].message, res);
        
        const response = await services.register(value)
        return res.status(200).json(response);
    } catch (error) {
        console.error('Register error:', error);
        return internalServerError(res)
    }
}

export const login = async (req, res) => {
    try {
        const { error, value } = joi.object({email, password}).validate(req.body);
        if(error) return badRequest(error.details[0].message, res);
        
        const response = await services.login(value)
        return res.status(200).json(response);
    } catch (error) {
        console.error('Login error:', error);
        return internalServerError(res)
    }
}