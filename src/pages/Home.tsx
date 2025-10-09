import Navigation from "@/components/Navigation";
import FileUploadZone from "@/components/FileUploadZone";
import { Card } from "@/components/ui/card";
import { Activity, Brain, Shield, Zap } from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze fingerprint patterns"
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get your blood group prediction in seconds, not days"
    },
    {
      icon: Shield,
      title: "High Accuracy",
      description: "Our model achieves over 90% accuracy in blood group prediction"
    },
    {
      icon: Activity,
      title: "Non-Invasive",
      description: "No needles required - just upload a fingerprint image"
    }
  ];

  return (
    <div className="min-h-screen page-enter">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 card-enter">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 hover-glow">
            Advanced Blood Group{" "}
            <span className="text-primary">Prediction</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 stagger-1 card-enter">
            Using cutting-edge AI technology to predict blood groups from
            fingerprint analysis with high accuracy and reliability.
          </p>
        </div>

        {/* Upload Section */}
        <div className="mb-16 stagger-2 card-enter">
          <FileUploadZone />
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`medical-card p-6 text-center hover-lift card-enter stagger-${index + 1} theme-transition`}
            >
              <feature.icon className="h-12 w-12 text-primary mx-auto mb-4 transition-transform duration-300 hover:scale-110" />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* How It Works Section */}
        <Card className="medical-card p-8 hover-lift theme-transition stagger-3 card-enter">
          <h2 className="text-3xl font-bold text-center mb-8 hover-glow">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center card-enter stagger-1">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 hover:scale-110 transition-transform duration-300 hover-glow">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Upload Image</h3>
              <p className="text-muted-foreground">
                Take a clear photo of your fingerprint and upload it to our secure platform
              </p>
            </div>
            <div className="text-center card-enter stagger-2">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 hover:scale-110 transition-transform duration-300 hover-glow">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Analysis</h3>
              <p className="text-muted-foreground">
                Our trained neural network analyzes the unique patterns in your fingerprint
              </p>
            </div>
            <div className="text-center card-enter stagger-3">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 hover:scale-110 transition-transform duration-300 hover-glow">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Get Results</h3>
              <p className="text-muted-foreground">
                Receive your predicted blood group with confidence percentage instantly
              </p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Home;