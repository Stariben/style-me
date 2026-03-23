import { useState, useRef } from 'react';
import { Camera, Upload, X, User, Shirt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';

export default function PhotoUploader({ type, imageUrl, onImageUploaded, onClear }) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const isPersonPhoto = type === 'person';
  const Icon = isPersonPhoto ? User : Shirt;
  const label = isPersonPhoto ? 'Your Photo' : 'Outfit Photo';
  const hint = isPersonPhoto ? 'Upload a clear selfie or portrait' : 'Upload the clothing item';

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    onImageUploaded(file_url);
    setIsUploading(false);
  };

  return (
    <div className="flex-1">
      <p className="text-sm font-semibold text-foreground mb-1.5">{label}</p>
      <p className="text-xs text-muted-foreground mb-3">{hint}</p>

      <AnimatePresence mode="wait">
        {imageUrl ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-border shadow-sm"
          >
            <img
              src={imageUrl}
              alt={label}
              className="w-full h-full object-cover"
            />
            <button
              onClick={onClear}
              className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ) : (
          <motion.button
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="w-full aspect-[3/4] rounded-2xl border-2 border-dashed border-border hover:border-primary/40 bg-muted/50 hover:bg-muted transition-all flex flex-col items-center justify-center gap-3 group"
          >
            {isUploading ? (
              <div className="w-8 h-8 border-3 border-muted-foreground/30 border-t-primary rounded-full animate-spin" />
            ) : (
              <>
                <div className="h-14 w-14 rounded-2xl bg-background border border-border flex items-center justify-center group-hover:border-primary/30 transition-colors shadow-sm">
                  <Icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  <Camera className="h-3.5 w-3.5" />
                  <span>Tap to upload</span>
                </div>
              </>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}