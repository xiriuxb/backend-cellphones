const configJwt = {
    issuer: process.env.APP_NAME || "Jorge_Trujillo",
    expires_in: process.env.JWT_EXPIRATION || "1d",
    secret: process.env.JWT_SECRET || "SuperSecret!"
}

export default configJwt;