import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sprout, ArrowLeft, LayoutDashboard } from "lucide-react";

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center"
    >
      <Sprout className="h-16 w-16 text-primary mb-6" />

      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-muted-foreground mb-6 max-w-md">
        Oops! This page doesn&amp;t exist. Let&amp;s get you back to growing smarter 🌱
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-primary text-white hover:bg-primary/90 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Go to Home
        </Link>

        <Link
          to="/dashboard"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md border border-border hover:bg-accent transition"
        >
          <LayoutDashboard className="h-4 w-4" />
          Go to Dashboard
        </Link>
      </div>
    </motion.div>
  );
};

export default NotFound;
