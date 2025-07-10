import React, { useEffect } from 'react';
import { X, AlertTriangle, CheckCircle, Info } from 'lucide-react';

const CustomAlert = ({ 
  isOpen, 
  onClose, 
  title, 
  message, 
  type = 'info', // 'info', 'success', 'warning', 'error'
  onConfirm,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  showCancel = true
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={24} color="#10b981" />;
      case 'warning':
        return <AlertTriangle size={24} color="#f59e0b" />;
      case 'error':
        return <AlertTriangle size={24} color="#ef4444" />;
      default:
        return <Info size={24} color="#3b82f6" />;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'success':
        return {
          border: 'rgba(16, 185, 129, 0.2)',
          background: 'rgba(16, 185, 129, 0.05)',
          button: '#10b981',
          buttonHover: '#059669'
        };
      case 'warning':
        return {
          border: 'rgba(245, 158, 11, 0.2)',
          background: 'rgba(245, 158, 11, 0.05)',
          button: '#f59e0b',
          buttonHover: '#d97706'
        };
      case 'error':
        return {
          border: 'rgba(239, 68, 68, 0.2)',
          background: 'rgba(239, 68, 68, 0.05)',
          button: '#ef4444',
          buttonHover: '#dc2626'
        };
      default:
        return {
          border: 'rgba(59, 130, 246, 0.2)',
          background: 'rgba(59, 130, 246, 0.05)',
          button: '#3b82f6',
          buttonHover: '#2563eb'
        };
    }
  };

  const colors = getColors();

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px'
    }}>
      <div style={{
        background: 'rgba(23, 23, 23, 0.95)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${colors.border}`,
        borderRadius: 16,
        padding: '24px',
        maxWidth: 400,
        width: '100%',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        animation: 'slideIn 0.3s ease-out'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}>
            {getIcon()}
            <h3 style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 600,
              color: '#fff'
            }}>
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#666',
              cursor: 'pointer',
              padding: 4,
              borderRadius: 4,
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.color = '#fff'}
            onMouseLeave={(e) => e.target.style.color = '#666'}
          >
            <X size={20} />
          </button>
        </div>

        {/* Message */}
        <p style={{
          margin: '0 0 24px 0',
          color: '#ccc',
          fontSize: 14,
          lineHeight: 1.5
        }}>
          {message}
        </p>

        {/* Actions */}
        <div style={{
          display: 'flex',
          gap: 12,
          justifyContent: 'flex-end'
        }}>
          {showCancel && (
            <button
              onClick={onClose}
              style={{
                padding: '10px 20px',
                background: 'transparent',
                border: '1px solid #444',
                color: '#ccc',
                borderRadius: 8,
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 500,
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#ccc';
              }}
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={() => {
              if (onConfirm) onConfirm();
              onClose();
            }}
            style={{
              padding: '10px 20px',
              background: colors.button,
              border: 'none',
              color: '#fff',
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 500,
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = colors.buttonHover}
            onMouseLeave={(e) => e.target.style.background = colors.button}
          >
            {confirmText}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default CustomAlert; 