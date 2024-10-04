import React, { useState, useRef, useEffect, useMemo } from 'react';

interface ImageEditorProps {
  imageSrc: string | File;
  viewBoxSize: number;
  displaySize?: number;
  initialRotation?: number;
  initialScale?: number;
  minZoom?: number;
  maxZoom?: number;
  zoomStep?: number;
  onPositionChange?: (position: { x: number; y: number }) => void;
  onScaleChange?: (scale: number) => void;
  onRotationChange?: (rotation: number) => void;
}

const ImageEditor: React.FC<ImageEditorProps> = ({
  imageSrc,
  viewBoxSize,
  displaySize = viewBoxSize,
  initialRotation = 0,
  initialScale = 1,
  minZoom = 0.1,
  maxZoom = 5,
  zoomStep = 0.1,
  onPositionChange,
  onScaleChange,
  onRotationChange,
}) => {
  const [scale, setScale] = useState(initialScale);
  const [rotation, setRotation] = useState(initialRotation);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Create a memoized URL for File objects
  const imageUrl = useMemo(() => {
    if (imageSrc instanceof File) {
      return URL.createObjectURL(imageSrc);
    }
    return imageSrc;
  }, [imageSrc]);

  // Clean up the created URL when the component unmounts or when the File changes
  useEffect(() => {
    return () => {
      if (imageSrc instanceof File) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageSrc, imageUrl]);

  useEffect(() => {
    const image = imageRef.current;
    if (image) {
      const updateNaturalSize = () => {
        setNaturalSize({ width: image.naturalWidth, height: image.naturalHeight });
      };
      image.onload = updateNaturalSize;
      if (image.complete) {
        updateNaturalSize();
      }
    }
  }, [imageUrl]);

  useEffect(() => {
    if (naturalSize.width && naturalSize.height) {
      const fitScale = Math.max(viewBoxSize / naturalSize.width, viewBoxSize / naturalSize.height);
      setScale(Math.min(maxZoom, Math.max(minZoom, fitScale * initialScale)));
      setPosition({ x: 0, y: 0 });
    }
  }, [naturalSize, viewBoxSize, initialScale, minZoom, maxZoom]);

  const handleZoom = (delta: number) => {
    const newScale = Math.max(minZoom, Math.min(maxZoom, scale + delta * zoomStep));
    setScale(newScale);
    onScaleChange?.(newScale);
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      handleZoom(-Math.sign(e.deltaY));
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const dist = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
        handleZoom(dist * 0.01);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
        container.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, [scale, minZoom, maxZoom, zoomStep, onScaleChange]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const rect = containerRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setStartPos({ x: x - position.x, y: y - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const rect = containerRef.current!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newPosition = {
        x: x - startPos.x,
        y: y - startPos.y,
      };
      setPosition(newPosition);
      onPositionChange?.(newPosition);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleRotate = (direction: 'left' | 'right') => {
    const newRotation = (rotation + (direction === 'left' ? -90 : 90) + 360) % 360;
    setRotation(newRotation);
    onRotationChange?.(newRotation);
  };

  const handleApply = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = viewBoxSize;
    canvas.height = viewBoxSize;

    ctx.save();
    ctx.translate(viewBoxSize / 2, viewBoxSize / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(scale, scale);
    ctx.translate(-viewBoxSize / 2, -viewBoxSize / 2);
    ctx.drawImage(
      imageRef.current!,
      position.x,
      position.y,
      naturalSize.width,
      naturalSize.height
    );
    ctx.restore();

    const croppedImage = canvas.toDataURL('image/png');
    console.log('Cropped image data URL:', croppedImage);
    // Here you can send the croppedImage to a server or use it as needed
  };

  const scaleFactor = Math.min(displaySize / viewBoxSize, 1);

  return (
    <div className="flex flex-col items-center">
      <div
        style={{
          width: `${displaySize}px`,
          height: `${displaySize}px`,
          overflow: 'hidden',
        }}
      >
        <div
          ref={containerRef}
          className="relative"
          style={{
            width: `${displaySize}px`,
            height: `${displaySize}px`,
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100%',
              height: '100%',
              transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: `${naturalSize.width}px`,
                height: `${naturalSize.height}px`,
                transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px) scale(${scale * scaleFactor})`,
              }}
            >
              <img
                ref={imageRef}
                src={imageUrl}
                alt="Editable image"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex space-x-4">
        <input
          type="range"
          min={minZoom}
          max={maxZoom}
          step={zoomStep}
          value={scale}
          onChange={(e) => {
            const newScale = parseFloat(e.target.value);
            setScale(newScale);
            onScaleChange?.(newScale);
          }}
          className="w-40"
        />
        <button onClick={() => handleRotate('left')} className="px-2 py-1 bg-blue-500 text-white rounded">
          Rotate Left
        </button>
        <button onClick={() => handleRotate('right')} className="px-2 py-1 bg-blue-500 text-white rounded">
          Rotate Right
        </button>
        <button onClick={handleApply} className="px-2 py-1 bg-green-500 text-white rounded">
          Apply
        </button>
      </div>
    </div>
  );
};

export default ImageEditor;