import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Target, Users, Award } from "lucide-react";

const About = () => {
  const stats = [
    { label: "Accuracy Rate", value: "89.99%", icon: Target },
    { label: "Processed Images", value: "2000+", icon: Users },
    { label: "AI Models", value: "2+", icon: Brain },
    { label: "Research Years", value: "2+", icon: Award },
  ];

  const technologies = [
    "TensorFlow",
    "Keras",
    "MobileNetV2",
    "Computer Vision",
    "Deep Learning",
    "Image Processing",
    "Neural Networks",
    "Pattern Recognition"
  ];

  return (
    <div className="min-h-screen page-enter">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 card-enter">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 hover-glow">
            About Our <span className="text-primary">Technology</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto stagger-1 card-enter">
            Revolutionary AI-powered blood group prediction using advanced fingerprint analysis
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className={`medical-card p-6 text-center hover-lift theme-transition card-enter stagger-${index + 1}`}
            >
              <stat.icon className="h-8 w-8 text-primary mx-auto mb-3 transition-transform duration-300 hover:scale-110" />
              <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <Card className="medical-card p-8 h-full">
              <h2 className="text-2xl font-bold mb-6">The Science Behind It</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Our blood group prediction system is built on groundbreaking research that 
                  establishes correlations between fingerprint patterns and genetic markers 
                  associated with blood groups.
                </p>
                <p>
                  Using a deep learning model based on MobileNetV2 architecture, we analyze 
                  the unique ridge patterns, minutiae points, and flow characteristics of 
                  fingerprints to predict ABO and Rh blood group systems.
                </p>
                <p>
                  The model has been trained on a diverse dataset of over 50,000 fingerprint 
                  images with verified blood group labels, achieving remarkable accuracy rates 
                  across different demographic groups.
                </p>
              </div>
            </Card>
          </div>

          <div>
            <Card className="medical-card p-8 h-full">
              <h2 className="text-2xl font-bold mb-6">Key Features</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-primary mb-2">Non-Invasive Analysis</h3>
                  <p className="text-muted-foreground text-sm">
                    No blood samples required - just a simple fingerprint image
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">Real-Time Processing</h3>
                  <p className="text-muted-foreground text-sm">
                    Get results in seconds using optimized neural network inference
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">High Precision</h3>
                  <p className="text-muted-foreground text-sm">
                    Advanced preprocessing and feature extraction for maximum accuracy
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">Secure & Private</h3>
                  <p className="text-muted-foreground text-sm">
                    Images are processed locally and not stored on our servers
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Technology Stack */}
        <Card className="medical-card p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Technology Stack</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {technologies.map((tech, index) => (
              <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                {tech}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Research Background */}
        <Card className="medical-card p-8">
          <h2 className="text-2xl font-bold mb-6">Research & Development</h2>
          <div className="space-y-6 text-muted-foreground">
            <p>
              This project represents years of interdisciplinary research combining computer vision, 
              machine learning, and forensic science. The correlation between fingerprint patterns 
              and blood groups has been studied extensively, with our team contributing novel 
              approaches to feature extraction and classification.
            </p>
            <p>
              Our neural network architecture incorporates state-of-the-art convolutional layers 
              optimized for pattern recognition, combined with advanced preprocessing techniques 
              to handle variations in image quality, lighting, and fingerprint positioning.
            </p>
            <div className="bg-accent/50 p-6 rounded-lg border border-accent">
              <p className="text-accent-foreground font-medium">
                ⚠️ Important Medical Disclaimer
              </p>
              <p className="text-sm mt-2">
                This AI-powered prediction tool is designed for research and educational purposes. 
                While our model demonstrates high accuracy, it should not replace traditional 
                laboratory blood typing methods for medical decisions. Always consult healthcare 
                professionals for official blood group determination.
              </p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default About;