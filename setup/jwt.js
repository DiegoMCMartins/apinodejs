import jwt from 'jsonwebtoken'

const secret = 'iIsInR5cCI6IkpXVCJ9eyJhbGciOiJIUzI1N'

export const sign = payload => jwt.sign(payload, secret, { expiresIn: 120 })
export const verify = token => jwt.verify(token, secret)
