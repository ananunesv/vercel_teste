// CAMADA 2: COMPORTAMENTO - MOLECULE  
// Toast para notificações e feedback do usuário

import React, { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type,
  duration = 5000,
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Tempo para animação de saída
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getToastStyles = () => {
    const baseStyles = "fixed top-4 right-4 p-4 rounded-lg shadow-lg transition-all duration-300 transform z-50 max-w-md";
    
    if (!isVisible) {
      return `${baseStyles} translate-x-full opacity-0`;
    }

    switch (type) {
      case 'success':
        return `${baseStyles} bg-gray-300 text-gray-800`;
      case 'error':
        return `${baseStyles} bg-gray-400 text-gray-900`;
      case 'warning':
        return `${baseStyles} bg-gray-200 text-gray-700`;
      case 'info':
      default:
        return `${baseStyles} bg-gray-100 text-gray-600`;
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '×';
      case 'warning':
        return '!';
      case 'info':
      default:
        return 'i';
    }
  };

  return (
    <div className={getToastStyles()}>
      <div className="flex items-center gap-3">
        <span className="text-xl font-bold">{getIcon()}</span>
        <div className="flex-1">
          <p className="font-medium">{message}</p>
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="text-gray-600 hover:text-gray-800 transition-colors"
        >
×
        </button>
      </div>
    </div>
  );
};