'use client';
import { motion } from "framer-motion";
import PartnerImage from "./PartnerImage";

/**
 * Animated row of partner logos with continuous scrolling
 * Content is duplicated to create seamless infinite loop
 */
export default function PartnersRow() {
    const partners = Array(10).fill(null);

    return (
        <motion.div
            style={{ 
                display: 'flex',
                alignItems: 'center', 
                gap: '64px',
            }}
            initial={{ x: "0%" }}
            animate={{ x: "-50%" }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
            {/* First set of partners */}
            {partners.map((_, index) => (
                <PartnerImage key={`partner-1-${index}`} />
            ))}
            
            {/* Duplicate set for seamless loop */}
            {partners.map((_, index) => (
                <PartnerImage key={`partner-2-${index}`} />
            ))}
        </motion.div>
    );
}