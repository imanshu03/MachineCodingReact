import { useEffect, useRef } from 'react';

export const usePrevious = (valueToBePersist) => {
  const previous = useRef(null);

  useEffect(() => {
    previous.current = valueToBePersist;
  }, [valueToBePersist]);

  return previous.current;
};
