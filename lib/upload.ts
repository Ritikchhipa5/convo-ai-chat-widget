import { UploadClient } from "@uploadcare/upload-client";

const publicKey = process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string;

export const upload = new UploadClient({ publicKey });
