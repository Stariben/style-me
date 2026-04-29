import { useState, useRef } from 'react';
import { Camera, ImagePlus, X, User, Shirt } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import CameraCapture from './CameraCapture';
import { useCamera } from '@/lib/CameraContext';

export default function PhotoUploaderIOS({ type, imageUrl, onImageUploaded, onClear }) {
  const [isUploading, setIsUploading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const galleryInputRef = useRef(null);
  const { setIsCameraOpen } = useCamera();
  const { t } = useLang();

  const isPersonPhoto = type === 'person';
  const Icon = isPersonPhoto ? User : Shirt;
  const label = isPersonPhoto ? t('yourPhoto') : t('outfitPhoto');
  const hint = isPersonPhoto ? t('uploadSelfie') : t('uploadOutfit');

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';
    setIsUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    onImageUploaded(file_url);
    setIsUploading(false);
  };

  const openCamera = () => { setShowCamera(true); setIsCameraOpen(true); };
  const closeCamera = () => { setShowCamera(false); setIsCameraOpen(false); };

  const handleCameraCapture = async (file) => {
    closeCamera();
    setIsUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    onImageUploaded(file_url);
    setIsUploading(false);
  };

  const handleGalleryClick = () => {
    galleryInputRef.current?.click();
  };

  return (
    <div className="flex-1 flex flex-col">
      <AnimatePresence>
        {showCamera && (
          <CameraCapture
            facingMode={isPersonPhoto ? 'user' : 'environment'}
            onCapture={handleCameraCapture}
            onClose={closeCamera}
          />
        )}
      </AnimatePresence>
      <p className="text-sm font-semibold text-foreground mb-1">{label}</p>
      <p className="text-xs text-muted-foreground mb-3 min-h-[2.5rem] leading-tight">{hint}</p>

      <AnimatePresence mode="wait">
        {imageUrl ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/20 shadow-lg backdrop-blur-sm bg-white/50"
          >
            <img
              src={imageUrl}
              alt={label}
              className="w-full h-full object-cover"
            />
            <button
              onClick={onClear}
              className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white active:scale-90 transition-transform"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full aspect-[3/4] rounded-3xl border border-white/30 bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-md flex flex-col items-center justify-center gap-4 p-4"
          >
            {isUploading ? (
              <div className="w-8 h-8 border-3 border-white/30 border-t-primary rounded-full animate-spin" />
            ) : (
              <>
                <div className="h-14 w-14 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/50 flex items-center justify-center shadow-sm">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <button
                    onClick={openCamera}
                    className="w-full flex items-center justify-center gap-2 h-11 rounded-2xl bg-primary text-primary-foreground text-sm font-medium active:scale-95 transition-transform"
                  >
                    <Camera className="h-4 w-4" />
                    {t('takePhoto')}
                  </button>
                  <button
                    onClick={handleGalleryClick}
                    className="w-full flex items-center justify-center gap-2 h-11 rounded-2xl bg-white/40 backdrop-blur-sm border border-white/50 text-sm font-medium text-foreground active:scale-95 transition-transform"
                  >
                    <ImagePlus className="h-4 w-4" />
                    {t('gallery')}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}