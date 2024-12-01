'use client';

import { useState, useRef } from 'react';
import { Camera, CameraIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CameraCaptureProps {
  onCapture: (imageData: string) => void;
  onClose: () => void;
}

export function CameraCapture({ onCapture, onClose }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const switchCamera = async () => {
    stopCamera();
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  };

  const takePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg');
        onCapture(imageData);
        stopCamera();
        onClose();
      }
    }
  };

  useState(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 space-y-4 rounded-lg bg-background p-6 shadow-lg sm:inset-x-auto sm:left-1/2 sm:w-full sm:max-w-lg sm:-translate-x-1/2">
        <div className="aspect-video relative rounded-lg overflow-hidden bg-muted">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className={cn(
              'w-full h-full object-cover',
              facingMode === 'user' && 'scale-x-[-1]'
            )}
          />
        </div>

        <div className="flex justify-center gap-4">
          <Button variant="outline" size="icon" onClick={switchCamera}>
            <CameraIcon className="h-4 w-4" />
          </Button>
          <Button size="icon" onClick={takePhoto}>
            <Camera className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              stopCamera();
              onClose();
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
