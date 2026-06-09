import { useEffect, useRef, useState } from 'react';
import { Camera, X, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CameraCapture({ facingMode = 'environment', onCapture, onClose }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);
  const [currentFacing, setCurrentFacing] = useState(facingMode);

  const startCamera = async (facing) => {
    // Stop any existing stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
    }
    setReady(false);
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facing }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) setReady(true);
        };
      }
    } catch (err) {
      setError('Camera access denied. Please allow camera access and try again.');
    }
  };

  useEffect(() => {
    startCamera(currentFacing);
    return () => {
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    };
  }, [currentFacing]);

  const handleCapture = () => {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    canvas.toBlob((blob) => {
      const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
      onCapture(file);
    }, 'image/jpeg', 0.92);
  };

  const toggleCamera = () => {
    setCurrentFacing(f => f === 'user' ? 'environment' : 'user');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black flex flex-col"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Flip camera */}
      <button
        onClick={toggleCamera}
        className="absolute top-4 left-4 z-10 h-10 w-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white"
      >
        <RefreshCw className="h-5 w-5" />
      </button>

      {/* Video feed — full screen */}
      <div className="absolute inset-0">
        {error ? (
          <p className="text-white text-center px-8 text-sm absolute inset-0 flex items-center justify-center">{error}</p>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
            style={{ transform: currentFacing === 'user' ? 'scaleX(-1)' : 'none' }}
          />
        )}
      </div>

      {/* Capture button — overlay */}
      {!error && (
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center pb-12 pt-6">
          <button
            onClick={handleCapture}
            disabled={!ready}
            className="rounded-full border-4 border-white bg-white/20 flex items-center justify-center disabled:opacity-40 active:scale-95 transition-transform"
            style={{ width: 72, height: 72 }}
          >
            <Camera className="h-8 w-8 text-white" />
          </button>
        </div>
      )}
    </motion.div>
  );
}