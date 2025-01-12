export const throttle = (func: Function, limit: number) => {
    let lastFunc: NodeJS.Timeout;
    let lastRan: number | null = null;
  
    return (...args: any[]) => {
      const now = Date.now();
      if (!lastRan || now - lastRan >= limit) {
        func(...args);
        lastRan = now;
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(() => {
          func(...args);
          lastRan = Date.now();
        }, limit - (now - lastRan));
      }
    };
  };

  