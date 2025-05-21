import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

export const runtime = 'nodejs';

const S3_ENDPOINT = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/s3`;
const S3_BUCKET = 'blog-images';
const S3_REGION = 'eu-west-3'; // Supabase S3 compatible endpoint, region can be anything
const S3_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY_ID || '';
const S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY || '';

// Check if credentials are available
if (!S3_ACCESS_KEY_ID || !S3_SECRET_ACCESS_KEY) {
  console.error('Missing S3 credentials in environment variables');
}

const s3 = new S3Client({
  region: S3_REGION,
  endpoint: S3_ENDPOINT,
  credentials: {
    accessKeyId: S3_ACCESS_KEY_ID,
    secretAccessKey: S3_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  if (!file) {
    return NextResponse.json({ error: 'Aucun fichier fourni.' }, { status: 400 });
  }
  const ext = file.name.split('.').pop();
  const key = `${uuidv4()}.${ext}`;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  try {    
    await s3.send(new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: file.type,
      ACL: 'public-read',
    }));
    // const publicUrl = `${S3_ENDPOINT}/${S3_BUCKET}/${key}`;
    const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${S3_BUCKET}/${key}`;
    return NextResponse.json({ url: publicUrl });
  } catch (err) {
    return NextResponse.json({ error: 'Erreur upload S3', details: err }, { status: 500 });
  }
}
