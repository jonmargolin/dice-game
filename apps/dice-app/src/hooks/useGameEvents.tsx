import { useEffect, useRef } from 'react';
import { url } from '../api/config';
import { useNavigate } from 'react-router-dom';

type EventListener = (event: MessageEvent) => void;

const useGameEvents = (onMessage: EventListener) => {
  const eventSourceRef = useRef<EventSource | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Create a new EventSource when the component mounts
    if (eventSourceRef.current === null) {
      eventSourceRef.current = new EventSource(
        `${url}api/server-side-update/gameUpdates`,
        { withCredentials: true }
      );

      // Attach the event listener for messages
      eventSourceRef.current.addEventListener('message', onMessage);

      eventSourceRef.current.onerror = () => {
        if (eventSourceRef.current) {
          eventSourceRef.current.close();
          eventSourceRef.current.removeEventListener('message', onMessage);
        }
        navigate('/');
      };
    }

    // Cleanup when the component unmounts
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current.removeEventListener('message', onMessage);
      }
    };
  }, []);

  return {
    closeConnection: () => {
      // Close the EventSource connection
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    },
  };
};

export default useGameEvents;
