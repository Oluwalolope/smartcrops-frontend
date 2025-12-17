import { Link } from "react-router";
import { Sprout, Droplets, TrendingUp, Cloud } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const Home = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-[#f9faf8] to-[#e8f5e9]">
      
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-8">
        <nav className="flex items-center justify-between mb-16">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Sprout className="h-8 w-8 text-primary" />
            <span className="text-2xl font-semibold text-primary">
              SmartCrop
            </span>
          </motion.div>
        </nav>

        <motion.div
          className="max-w-4xl mx-auto text-center py-16"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Grow Smarter with{" "}
            <span className="text-primary">SmartCrop</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Real-time weather insights and AI-powered crop analysis to help you
            make better farming decisions
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/dashboard"
              className="px-8 py-3 text-lg text-white bg-primary hover:bg-primary/90 rounded-md inline-block"
            >
              Get Started
            </Link>
          </motion.div>
        </motion.div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[ 
            {
              icon: <Cloud className="h-8 w-8 text-primary" />,
              title: "Real-Time Weather",
              text: "Get accurate weather data for your location with smart irrigation recommendations"
            },
            {
              icon: <Sprout className="h-8 w-8 text-primary" />,
              title: "Crop Analysis",
              text: "Upload crop photos for instant AI-powered health analysis and care recommendations"
            },
            {
              icon: <TrendingUp className="h-8 w-8 text-primary" />,
              title: "Smart Decisions",
              text: "Make data-driven farming decisions with actionable insights tailored to your crops"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col gap-6 rounded-xl border-2 hover:border-primary transition-colors"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="pt-6 px-6 last:pb-6">
                <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          className="bg-primary text-primary-foreground rounded-2xl p-12 text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Droplets className="h-16 w-16 mx-auto mb-4 opacity-90" />
          <h2 className="text-3xl font-bold mb-4">
            Ready to Optimize Your Farm?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Start making smarter irrigation decisions today
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/dashboard"
              className="px-8 py-3 text-lg text-primary bg-white hover:bg-white/90 rounded-md inline-block"
            >
              Launch Dashboard
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;