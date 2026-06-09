import React, { useEffect, useRef, useState } from 'react';
import { Upload } from 'lucide-react';

const ImageUploader = ({
    maxFiles = 5,
    label = 'Images (optionnel)',
    hint = 'PNG, JPG',
    onChange,
    variant = 'default', // 'default' | 'dropzone'
    dropTitle = 'Ajoutez vos plus belles photos',
    dropSubtitle = 'Téléchargement de la simulation en cours...',
}) => {
    const [images, setImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileRef = useRef(null);

    useEffect(() => {
        return () => images.forEach((img) => URL.revokeObjectURL(img.url));
    }, [images]);

    useEffect(() => {
        if (onChange) onChange(images.map((i) => i.file));
    }, [images, onChange]);

    const addFiles = (files) => {
        const arr = Array.from(files || []);
        const newImages = arr.map((file) => ({ file, url: URL.createObjectURL(file) }));
        setImages((prev) => [...prev, ...newImages].slice(0, maxFiles));
    };

    const handleFiles = (e) => addFiles(e.target.files);

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        addFiles(e.dataTransfer.files);
    };

    const removeImage = (index) => {
        setImages((prev) => {
            const copy = [...prev];
            const [removed] = copy.splice(index, 1);
            if (removed) URL.revokeObjectURL(removed.url);
            return copy;
        });
    };

    if (variant === 'dropzone') {
        return (
            <div>
                <div
                    onClick={() => fileRef.current && fileRef.current.click()}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-3xl p-12 bg-white flex flex-col items-center justify-center space-y-4 cursor-pointer transition ${isDragging ? 'border-[#3D7A6D] bg-[#F6FBF9]' : 'border-gray-200'
                        }`}
                >
                    <div className="w-12 h-12 bg-[#E1ECE9] text-[#3D7A6D] rounded-full flex items-center justify-center">
                        <Upload size={24} />
                    </div>
                    <p className="font-bold text-gray-700">{dropTitle}</p>
                    <p className="text-xs text-gray-400">{dropSubtitle}</p>
                </div>

                <div className="mt-2 text-sm text-left text-gray-500">Glisser-déposer – ajoutez vos meilleures photos (prend en charge 1 à {maxFiles} images)</div>

                <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleFiles} className="hidden" />

                {images.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {images.map((img, idx) => (
                            <div key={img.url} className="relative border rounded-lg overflow-hidden">
                                <img src={img.url} alt={`preview-${idx}`} className="w-full h-28 object-cover" />
                                <button
                                    type="button"
                                    onClick={() => removeImage(idx)}
                                    className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-1 text-xs"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div>
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider block mb-2">{label}</label>

            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={() => fileRef.current && fileRef.current.click()}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                >
                    Ajouter des images
                </button>
                <span className="text-sm text-gray-500">{hint} — jusqu'à {maxFiles} fichiers</span>
            </div>

            <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleFiles} className="hidden" />

            {images.length > 0 && (
                <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {images.map((img, idx) => (
                        <div key={img.url} className="relative border rounded-lg overflow-hidden">
                            <img src={img.url} alt={`preview-${idx}`} className="w-full h-28 object-cover" />
                            <button
                                type="button"
                                onClick={() => removeImage(idx)}
                                className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-1 text-xs"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
