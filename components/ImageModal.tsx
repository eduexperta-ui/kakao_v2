import React, { useEffect } from 'react';

interface ImageModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ src, alt, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 transition-all animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-6xl max-h-full flex items-center justify-center"
        onClick={e => e.stopPropagation()} // Prevent closing when clicking the container
      >
        <button
            onClick={onClose}
            className="absolute -top-12 right-0 md:top-0 md:-right-12 text-white hover:text-gray-300 p-2 focus:outline-none"
            aria-label="Close modal"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        <img 
          src={src} 
          alt={alt} 
          className="max-w-full max-h-[85vh] object-contain rounded-md shadow-2xl bg-white dark:bg-gray-800"
        />
      </div>
    </div>
  );
};
export default ImageModal;