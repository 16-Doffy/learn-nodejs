import * as services from "../services";

export const register = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(email, password)
        if (!email || !password) return res.status(400).json({
            err: 1,
            mes: 'Missing payloads'
        })
        const response = await services.register({ email, password })
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            mes: 'Interal Server Error'
        })
    }
}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(email, password)
        if (!email || !password) return res.status(400).json({
            err: 1,
            mes: 'Missing payloads'
        })
        const response = await services.login({ email, password })
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            mes: 'Interal Server Error'
        })
    }
}