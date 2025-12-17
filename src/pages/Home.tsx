import { Link } from "react-router";
import { Sprout, Droplets, TrendingUp, Cloud } from "lucide-react";

const Home = () => {
    return (
     <div className="min-h-screen bg-linear-to-b from-[#f9faf8] to-[#e8f5e9]">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-8">
        <nav className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-2">
            <Sprout className="h-8 w-8 text-primary" />
            <span className="text-2xl font-semibold text-primary">SmartCrop</span>
          </div>
        </nav>
        
        <div className="max-w-4xl mx-auto text-center py-16">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Grow Smarter with <span className="text-primary">SmartCrop</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Real-time weather insights and AI-powered crop analysis to help you make better farming decisions
          </p>
          <Link to="/dashboard" className="px-8 py-3 text-lg text-white bg-primary hover:bg-primary/90 h-10 rounded-md cursor-pointer has-[>svg]:px-4">Get Started</Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="flex flex-col gap-6 rounded-xl border-2 hover:border-primary transition-colors">
            <div className="pt-6 px-6 last:pb-6">
              <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mb-4">
                <Cloud className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-Time Weather</h3>
              <p className="text-muted-foreground">
                Get accurate weather data for your location with smart irrigation recommendations
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6 rounded-xl border-2 hover:border-primary transition-colors">
            <div className="pt-6 px-6 last:pb-6">
              <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mb-4">
                <Sprout className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Crop Analysis</h3>
              <p className="text-muted-foreground">
                Upload crop photos for instant AI-powered health analysis and care recommendations
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6 rounded-xl border-2 hover:border-primary transition-colors">
            <div className="pt-6 px-6 last:pb-6">
              <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Decisions</h3>
              <p className="text-muted-foreground">
                Make data-driven farming decisions with actionable insights tailored to your crops
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-primary text-primary-foreground rounded-2xl p-12 text-center max-w-4xl mx-auto">
          <Droplets className="h-16 w-16 mx-auto mb-4 opacity-90" />
          <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Farm?</h2>
          <p className="text-lg mb-6 opacity-90">
            Start making smarter irrigation decisions today
          </p>
          <Link to="/dashboard" className="px-8 py-3 text-lg text-primary bg-white hover:bg-white/90 h-10 rounded-md cursor-pointer has-[>svg]:px-4">Launch Dashboard</Link>
        </div>
      </section>
    </div>
    );
}
 
export default Home;