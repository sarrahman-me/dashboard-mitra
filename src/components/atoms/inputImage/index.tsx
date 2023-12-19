"use client";
import React, { useState, ChangeEvent } from "react";

interface ImageInputProps {
  onImageChange: (base64Image: string) => void;
  multiple?: boolean;
  setError?: any;
}

const ImageInput: React.FC<ImageInputProps> = ({
  onImageChange,
  multiple,
  setError,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const imageFile = event.target.files[0];

      // Maksimum ukuran gambar yang diperbolehkan (dalam byte)
      const maxImageSize = 50 * 1024 * 1024; // 50 MB

      if (imageFile.size > maxImageSize) {
        setError("Gambar terlalu besar, maksimal 500 KB");
      } else {
        setError("");
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setSelectedImage(base64String);
        onImageChange(base64String);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  //   "classNameFileInput" adalah style class tailwind untuk file input
  const classNameFileInput = `block w-full text-sm text-slate-500 file:cursor-pointer
        file:mr-4 file:py-2 file:px-4
        file:rounded-md file:border-0
        file:text-sm file:font-semibold
        file:bg-indigo-50 file:text-indigo-700
        hover:file:bg-indigo-100`;

  return (
    <div className="my-2">
      <input
        className={classNameFileInput}
        multiple={multiple || false}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ImageInput;
