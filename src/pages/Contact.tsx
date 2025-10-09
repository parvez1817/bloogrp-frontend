import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, MessageSquare, Phone, MapPin } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPartnership, setShowPartnership] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent Successfully",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: "Error Sending Message",
        description: "Please try again later or contact us directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "fingroop@gmail.com",
      description: "Send us an email anytime"
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+91 8248518232",
      description: "Mon-Fri from 8am to 6pm"
    },
    {
      icon: MapPin,
      title: "Address",
      content: "Salem, TamilNadu",
      description: "Govindhan Street, Hasthampatti"
    },
    {
      icon: MessageSquare,
      title: "Support",
      content: "24/7 Help Center",
      description: "Get instant answers"
    }
  ];

  return (
    <div className="min-h-screen page-enter">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 card-enter">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 hover-glow">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto stagger-1 card-enter">
            Have questions about our AI blood group prediction technology? 
            We'd love to hear from you and help with your inquiries.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <Card 
              key={index} 
              className={`medical-card p-6 text-center hover-lift theme-transition card-enter stagger-${index + 1}`}
            >
              <info.icon className="h-10 w-10 text-primary mx-auto mb-4 transition-transform duration-300 hover:scale-110" />
              <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
              <p className="font-medium text-foreground mb-1">{info.content}</p>
              <p className="text-sm text-muted-foreground">{info.description}</p>
            </Card>
          ))}
        </div>

        {/* Contact Form and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="medical-card p-8 hover-lift theme-transition card-enter">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your full name"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@example.com"
                    className="mt-2"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="What is this regarding?"
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Tell us how we can help you..."
                  rows={6}
                  className="mt-2"
                />
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="predict-button w-full text-primary-foreground"
              >
                {isSubmitting ? "Sending Message..." : "Send Message"}
              </Button>
            </form>
          </Card>

          {/* Additional Info */}
          <div className="space-y-8">
            <Card className="medical-card p-8">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-primary mb-2">
                    How accurate is the blood group prediction?
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Our AI model achieves over 89.99% accuracy on our test dataset. However, 
                    this should be used for research purposes and not replace medical testing.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">
                    Is my fingerprint data stored?
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    No, we process images locally and do not store any fingerprint data 
                    on our servers for privacy and security reasons.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">
                    Can I use this for medical diagnosis?
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    This tool is for research and educational purposes only. Always consult 
                    healthcare professionals for official medical blood group determination.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="medical-card p-8">
              <h2 className="text-2xl font-bold mb-6">Research Collaboration</h2>
              <p className="text-muted-foreground mb-4">
                We welcome collaboration with researchers, healthcare institutions, 
                and technology partners interested in advancing AI applications in medicine.
              </p>
              <Button
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={() => setShowPartnership(!showPartnership)}
              >
                Learn About Partnerships
              </Button>
              <div
                className={`mt-4 overflow-hidden transition-all duration-500 ease-in-out ${
                  showPartnership ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-muted-foreground text-sm">
                  We are excited to collaborate with researchers, healthcare institutions, and technology partners to advance AI applications in medicine. Please reach out to discuss partnership opportunities, joint research projects, and technology integration.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;