import { ConfigType } from "@V1/types/config.type";

export default (): ConfigType => ({
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET
})