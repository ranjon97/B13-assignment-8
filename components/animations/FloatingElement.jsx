"use client";

import { useSpring, animated } from "@react-spring/web";
import { useEffect, useState } from "react";

export default function FloatingElement({
  children,
  delay = 0,
  amplitude = 15,
  className = "",
}) {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((p) => (p === 0 ? amplitude : 0));
    }, 2000);
    return () => clearInterval(interval);
  }, [amplitude]);

  const styles = useSpring({
    transform: `translateY(${position}px)`,
    delay,
    config: { mass: 1, tension: 80, friction: 20 },
  });

  return (
    <animated.div style={styles} className={className}>
      {children}
    </animated.div>
  );
}
