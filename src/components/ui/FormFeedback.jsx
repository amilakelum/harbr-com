import { motion } from "motion/react";
import { CheckCircle, AlertCircle, InfoIcon, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import FormMessage from "./FormMessage";

/**
 * FormFeedback component to handle the full form submission feedback experience
 * Includes loading state, success/error messages, and animations
 */
export default function FormFeedback({ 
  isSubmitting, 
  message,
  onDismiss,
  className = ""
}) {
  // If submitting, show loading state
  if (isSubmitting) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`mt-4 flex items-center justify-center p-3 ${className}`}
      >
        <Loader2 className="w-5 h-5 text-zinc-500 animate-spin mr-2" />
        <span className="text-sm text-zinc-600 font-medium">Processing your request...</span>
      </motion.div>
    );
  }
  
  // If there's a message, show it using the FormMessage component
  if (message?.text) {
    return (
      <FormMessage
        type={message.type}
        message={message.text}
        onDismiss={onDismiss}
        className={className}
      />
    );
  }
  
  // If neither submitting nor showing a message, return null
  return null;
} 