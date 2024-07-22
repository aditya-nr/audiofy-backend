import dotenv from 'dotenv';
dotenv.config({ path: "./audiofy.env" });

const {
    AWS_S3_KEY_ID,
    AWS_S3_KEY,
    AWS_S3_REGION,
    AWS_S3_BUCKET
} = process.env;

export const env = {
    AWS_S3_KEY_ID,
    AWS_S3_KEY,
    AWS_S3_REGION,
    AWS_S3_BUCKET,
};