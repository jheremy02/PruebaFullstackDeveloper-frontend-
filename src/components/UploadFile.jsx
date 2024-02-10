// FileUploadComponent.js
import React, { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const UploadFile = ({files, setFiles}) => {
  

  const onDrop = useCallback((acceptedFiles) => {
    // Handle dropped files
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*', // Specify accepted file types (e.g., images)
  });

  const fileList = useMemo(() => {
    return files.map((file) => (
      <li key={file.path}>
        {file.path}
      </li>
    ));
  }, [files]);

  return (
    <div className="max-w-md mx-auto my-8 p-6 border rounded-lg shadow-lg">
      <div {...getRootProps()} className={`dropzone ${isDragActive ? 'drag-active' : ''}`}>
        <input {...getInputProps()} />
        <p className="text-center">Arrastra o click aqui para seleccionar archivo</p>
      </div>
      <ul className="mt-4">{fileList}</ul>
    </div>
  );
};

export default UploadFile;

