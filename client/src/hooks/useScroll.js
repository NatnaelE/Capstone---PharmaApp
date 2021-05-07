import { useState, useEffect } from 'react';

export const useScroll = (top = 0) => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollTop, setScrollTop] = useState(true);
  

  useEffect(() => {
    const onScroll = () => {
      let position = window.pageYOffset;
      setScrollY(position <= 0 ? 0 : position)
      setScrollTop(position <= top)
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollY, scrollTop, top])

  return {
    scrollY,
    scrollTop
  }
}