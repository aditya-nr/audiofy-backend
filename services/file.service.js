import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { env } from '../constants.js';

export const client = new S3Client({
    region: env.AWS_S3_REGION,
    credentials: {
        accessKeyId: env.AWS_S3_KEY_ID,
        secretAccessKey: env.AWS_S3_KEY
    }
})
export class FileServie {
    static getObjectUrl = async (Key) => {
        const command = new GetObjectCommand({
            Bucket: env.AWS_S3_BUCKET,
            Key
        })
        const url = await getSignedUrl(client, command, {
            expiresIn: 3600, // URL expiration time in seconds
            corsParams: {
                'x-amz-meta-origin': '*', // Example: Allow any origin
                'x-amz-meta-method': 'GET' // Example: Allow only GET method
            }
        });
        return url;
    }

    static putObjectUrl = async (key, contentType) => {
        const command = new PutObjectCommand({
            Bucket: env.AWS_S3_BUCKET,
            Key: key,
            ContentType: contentType
        })
        const url = await getSignedUrl(client, command);
        return url;
    }
}