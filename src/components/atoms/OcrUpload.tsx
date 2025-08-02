'use client';
import { useRef } from 'react';
import { recognize } from 'tesseract.js';
import { FaCamera } from 'react-icons/fa';
import Button from '../atoms/Button';

type OcrUploadProps = {
  onHandle: (text: string) => void;
};

const OcrUpload: React.FC<OcrUploadProps> = ({ onHandle }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const {
        data: { text },
      } = await recognize(file);
      onHandle(text);
    } catch (err) {
      console.error('OCR failed:', err);
    } finally {
      e.target.value = ''; // reset input so same image can be reselected if needed
    }
  };

  return (
    <div>
      <input
        type='file'
        accept='image/*'
        capture='environment'
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <Button onClick={() => fileInputRef.current?.click()}>
        <FaCamera />
      </Button>
    </div>
  );
};

export default OcrUpload;
