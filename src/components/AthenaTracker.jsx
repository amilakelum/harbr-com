import { useEffect } from 'react';

export function AthenaTracker() {
  useEffect(() => {
    const script = document.createElement('script');
    script.id = 'athena-telemetry-secure';
    script.async = true;
    script.src = 'https://cdn.athenahq.ai/api/tracking/3f17f985-892c-4180-8b63-a6beaaafc0b7';
    document.head.appendChild(script);
    
    return () => {
      const scriptElement = document.getElementById('athena-telemetry-secure');
      if (scriptElement) {
        scriptElement.remove();
      }
    };
  }, []);
  
  return null;
} 