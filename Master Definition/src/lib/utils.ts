import * as fs from 'fs';

export interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
  error?: any;
  token?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}


export function toDataUri(imgPath: string) {
  const bitmap = fs.readFileSync(imgPath);
  const base64Image = Buffer.from(bitmap).toString('base64');
  const ext = imgPath.split('.').pop();
  const uri = `data:image/${ext};base64,${base64Image}`;


  return uri;
}