import { config } from 'dotenv';

config();

export const PORT = process.env.PORT || 4001

export const SECRET_JWT = process.env.SECRET_JWT_SEED || 'Ash10'
