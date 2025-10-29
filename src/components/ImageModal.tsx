import { useState } from 'react';
import { MdClose } from 'react-icons/md';

interface ImageModalProps {
    src: string;
    alt: string;
    className?: string;
}

export default function ImageModal({ src, alt, className = '' }: ImageModalProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div
                className={`${className} cursor-pointer transition-transform duration-300 hover:scale-105`}
                onClick={() => setIsOpen(true)}
            >
                <img src={src} alt={alt} className="w-full rounded-lg shadow-xl" />
            </div>

            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                    onClick={() => setIsOpen(false)}
                >
                    <button
                        className="absolute top-4 right-4 p-2 text-white hover:text-amber-400 transition-colors"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close modal"
                    >
                        <MdClose className="w-8 h-8" />
                    </button>
                    <img
                        src={src}
                        alt={alt}
                        className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </>
    );
}
