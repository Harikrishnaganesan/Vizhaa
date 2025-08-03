"use client";
import React, { useState, useEffect, useRef } from "react";

interface FullPageScrollProps {
  children: React.ReactNode[];
}

const FullPageScroll: React.FC<FullPageScrollProps> = ({ children }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const totalSections = children.length;

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    let touchStartY = 0;
    let touchEndY = 0;

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;
      
      e.preventDefault();
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (e.deltaY > 0 && currentSection < totalSections - 1) {
          // Scroll down
          setCurrentSection(prev => prev + 1);
        } else if (e.deltaY < 0 && currentSection > 0) {
          // Scroll up
          setCurrentSection(prev => prev - 1);
        }
      }, 50);
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrolling) return;
      
      touchEndY = e.changedTouches[0].clientY;
      const touchDiff = touchStartY - touchEndY;
      
      if (Math.abs(touchDiff) > 50) { // Minimum swipe distance
        if (touchDiff > 0 && currentSection < totalSections - 1) {
          // Swipe up (scroll down)
          setCurrentSection(prev => prev + 1);
        } else if (touchDiff < 0 && currentSection > 0) {
          // Swipe down (scroll up)
          setCurrentSection(prev => prev - 1);
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return;
      
      if (e.key === 'ArrowDown' && currentSection < totalSections - 1) {
        setCurrentSection(prev => prev + 1);
      } else if (e.key === 'ArrowUp' && currentSection > 0) {
        setCurrentSection(prev => prev - 1);
      }
    };

    // Add event listeners
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(scrollTimeout);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSection, totalSections, isScrolling]);

  // Handle section transitions
  useEffect(() => {
    if (!containerRef.current) return;
    
    setIsScrolling(true);
    
    const container = containerRef.current;
    const sectionHeight = window.innerHeight - 80; // Account for header height (pt-20 = 80px)
    const targetY = currentSection * sectionHeight;
    
    container.style.transform = `translateY(-${targetY}px)`;
    
    // Reset scrolling flag after transition
    const transitionTimeout = setTimeout(() => {
      setIsScrolling(false);
    }, 1000); // Match CSS transition duration
    
    return () => clearTimeout(transitionTimeout);
  }, [currentSection]);

  return (
    <div className="fixed inset-0 overflow-hidden pt-20">
      {/* Sections Container */}
      <div
        ref={containerRef}
        className="transition-transform duration-1000 ease-out"
        style={{ height: `${totalSections * 100}vh` }}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className="w-full flex items-center justify-center"
            style={{ height: 'calc(100vh - 80px)' }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FullPageScroll;
