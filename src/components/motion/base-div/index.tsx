import { HTMLMotionProps, motion } from "framer-motion";
import { forwardRef } from "react";
import { MotionBaseTransition } from "../base-transition";

const BaseMotionDiv = forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  (props, ref) => {
    return (
      <motion.div
        {...props}
        ref={ref}
        transition={{ ...MotionBaseTransition, ...props.transition }}
      />
    );
  }
);
BaseMotionDiv.displayName = "BaseMotionDiv";

export default BaseMotionDiv;
