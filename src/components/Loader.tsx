import { motion } from "framer-motion";
import { Sprout } from "lucide-react";

const Loader = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4 bg-background">
      {/* Spinner */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full"
      />

      {/* Brand Icon */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Sprout className="h-6 w-6 text-primary" />
      </motion.div>

      {/* Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-sm text-muted-foreground"
      >
        Preparing smart insights for your farm…
      </motion.p>
    </div>
  );
};

export default Loader;
