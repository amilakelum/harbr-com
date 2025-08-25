import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, InfoIcon, X } from "lucide-react";
import { useState, useEffect } from "react";

/**
 * FormMessage component for displaying feedback after form submission
 * Provides a consistent, visually appealing way to show success, error, and info messages
 */
export default function FormMessage({
  type,
  message,
  onDismiss,
  autoHideDuration = 6000,
  showIcon = true,
  showDismiss = true,
  className = "",
}) {
  const [isVisible, setIsVisible] = useState(true);

  // Auto-hide the message after the specified duration
  useEffect(() => {
    if (!message || !autoHideDuration) return;

    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onDismiss) {
        setTimeout(onDismiss, 300); // Allow animation to complete
      }
    }, autoHideDuration);

    return () => clearTimeout(timer);
  }, [message, autoHideDuration, onDismiss]);

  // Handle manual dismissal
  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) {
      setTimeout(onDismiss, 300); // Allow animation to complete
    }
  };

  if (!message) return null;

  // Determine background, text, and icon based on message type
  const styles = {
    success: {
      bg: "bg-green-50 border-green-200",
      text: "text-green-800",
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
    },
    error: {
      bg: "bg-red-50 border-red-200",
      text: "text-red-800",
      icon: <AlertCircle className="w-5 h-5 text-red-500" />,
    },
    info: {
      bg: "bg-blue-50 border-blue-200",
      text: "text-blue-800",
      icon: <InfoIcon className="w-5 h-5 text-blue-500" />,
    },
    warning: {
      bg: "bg-amber-50 border-amber-200",
      text: "text-amber-800",
      icon: <AlertCircle className="w-5 h-5 text-amber-500" />,
    },
  };

  const currentStyle = styles[type] || styles.info;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
      transition={{ duration: 0.3 }}
      className={`mt-4 p-3 rounded-lg border ${currentStyle.bg} ${className}`}
    >
      <div className="flex items-start">
        {showIcon && (
          <div className="flex-shrink-0 mr-3 pt-0.5">{currentStyle.icon}</div>
        )}
        <div className={`flex-1 ${currentStyle.text} text-sm font-medium`}>
          {message}
        </div>
        {showDismiss && (
          <button
            type="button"
            className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-600 focus:outline-none"
            onClick={handleDismiss}
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
