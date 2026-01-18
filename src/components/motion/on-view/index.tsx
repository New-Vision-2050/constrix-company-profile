"use client";
import { HTMLMotionProps, motion } from "framer-motion";
import { forwardRef } from "react";
import { MotionBaseTransition } from "../base-transition";

const BaseOnViewDiv = forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  (props, ref) => {
    return (
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ amount: 0.1 }}
        {...props}
        ref={ref}
        transition={{ ...MotionBaseTransition, ...props.transition }}
      />
    );
  },
);
BaseOnViewDiv.displayName = "BaseOnViewDiv";

export default BaseOnViewDiv;
