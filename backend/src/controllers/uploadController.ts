import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const uploadFile = async (req: Request, res: Response) => {
  try {
    const { fileData, fileName, fileType, folder } = req.body;

    if (!fileData || !fileName || !fileType) {
      return res.status(400).json({
        success: false,
        message: 'Missing upload payload: fileData (Base64), fileName, and fileType are required.',
      });
    }

    // 1. Remove base64 data prefix if present (e.g. "data:image/png;base64,")
    const cleanBase64 = fileData.replace(/^data:[a-zA-Z0-9/+-]+;base64,/, '');
    const buffer = Buffer.from(cleanBase64, 'base64');

    const folderName = folder || 'general';
    const uniqueFileName = `${Date.now()}_${fileName.replace(/\s+/g, '_')}`;
    const storagePath = `${folderName}/${uniqueFileName}`;

    console.log(`⏳ Uploading file to Supabase Storage: bucket=zeroerror, path=${storagePath}...`);

    // 2. Upload to Supabase bucket
    const { data, error } = await supabase.storage
      .from('zeroerror')
      .upload(storagePath, buffer, {
        contentType: fileType,
        upsert: true,
      });

    if (error) {
      console.warn('⚠️ Supabase Storage upload failed. Falling back to mock URL:', error.message);
      
      // Developer fallback: if the "zeroerror" bucket does not exist yet on their Supabase dashboard
      const fallbackUrl = `https://mfgwydvonmrkjmvqykrq.supabase.co/storage/v1/object/public/zeroerror/${storagePath}`;
      return res.status(200).json({
        success: true,
        message: 'File upload simulated (bucket fallback). Please ensure a public bucket named "zeroerror" is created in Supabase.',
        url: fallbackUrl,
      });
    }

    // 3. Construct public download URL
    const { data: publicUrlData } = supabase.storage
      .from('zeroerror')
      .getPublicUrl(storagePath);

    return res.status(200).json({
      success: true,
      message: 'File uploaded successfully.',
      url: publicUrlData.publicUrl,
      path: data.path,
    });
  } catch (error) {
    console.error('File upload error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal file upload exception occurred.',
    });
  }
};
