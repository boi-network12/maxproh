"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue, HTMLMotionProps } from "framer-motion";

interface SocialButtonProps extends HTMLMotionProps<"button"> {
  icon: React.ReactNode;
  isSelected?: boolean;
}

const SocialButton = React.forwardRef<HTMLButtonElement, SocialButtonProps>(
  ({ icon, className, isSelected, ...props }, ref) => {
    const radius = 50;
    const [hovered, setHovered] = React.useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
      const { left, top } = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
    }

    return (
      <motion.button
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: useMotionTemplate`
            radial-gradient(
              ${hovered ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.4),
              transparent 80%
            )
          `, 
        }}
        className={cn(
          `w-full max-w-[95.1px] h-20 flex items-center justify-center rounded-md text-black shadow-input transition duration-300 !bg-gray-100 hover:shadow-md md:w-30 md:h-30 border ${
            isSelected ? "border-blue-500" : "border-gray-200"
          }`,
          className
        )}
        {...props}
      >
        {icon}
      </motion.button>
    );
  }
);

SocialButton.displayName = "SocialButton";
export default SocialButton;
