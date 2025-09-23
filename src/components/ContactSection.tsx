import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import contactImage from "@/assets/contact-bg.jpg";

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector("#contact");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;

    try {
      if (!publicKey || !serviceId || !templateId) {
        throw new Error("Email service not configured");
      }

      const response = await emailjs.send(serviceId, templateId, {
        // Commonly used variables in EmailJS templates
        from_name: formData.name,
        fullname: formData.name,
        email: formData.email,
        reply_to: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        to_email: "vpocris@gmail.com"
      }, { publicKey });

      if (response.status !== 200) {
        throw new Error("EmailJS failed");
      }

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
        variant: "default",
      });

      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error: any) {
      console.error("EmailJS error", error);
      toast({
        title: "Error sending message",
        description: (error?.message as string) || "Please try again or email me directly at vpocris@gmail.com.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      value: "vpocris@gmail.com",
      link: "mailto:vpocris@gmail.com"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      value: "+353 85 872 5445",
      link: "tel:+353858725445"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Location",
      value: "Wicklow, Ireland",
      link: "https://www.google.com/maps/place/Ballybeg,+Rathnew,+Co.+Wicklow,+Ireland/data=!4m2!3m1!1s0x4867ba0c388ccc9b:0xa00c7a997318190?sa=X&ved=1t:242&ictx=111"
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="h-6 w-6" />,
      name: "GitHub",
      url: "https://github.com/vladpocris",
      color: "hover:text-white"
    },
    {
      icon: <Linkedin className="h-6 w-6" />,
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/vlad-pocris-315aa7212/",
      color: "hover:text-blue-400"
    }
  ];

  return (
    <section 
      id="contact" 
      className="parallax-section relative"
      style={{ 
        backgroundImage: `linear-gradient(rgba(34, 34, 34, 0.8), rgba(34, 34, 34, 0.6)), url(${contactImage})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-secondary opacity-60" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        {/* Section Title */}
        <div className={`text-center mb-16 animate-slide-up ${isVisible ? "in-view" : ""}`}>
          <h2 className="gradient-text text-5xl lg:text-6xl font-bold mb-4">CONTACT</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto mb-6" />
          <p className="text-foreground text-lg max-w-2xl mx-auto">
            Let's connect and discuss how we can work together to bring your ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className={`space-y-8 animate-slide-left ${isVisible ? "in-view" : ""}`} style={{ animationDelay: "0.2s" }}>
            {/* Contact Info Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card rounded-xl p-6 block hover:scale-105 transition-all duration-300 group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary/20 rounded-lg text-primary group-hover:scale-110 transition-transform duration-300">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-primary font-semibold text-lg">{info.title}</h3>
                      <p className="text-foreground">{info.value}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="gradient-text text-xl font-bold mb-4">Connect With Me</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-secondary/50 rounded-lg text-foreground transition-all duration-300 hover:scale-110 ${social.color}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Info */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="gradient-text text-xl font-bold mb-4">Quick Info</h3>
              <div className="space-y-3 text-foreground">
                <p><span className="text-primary font-semibold">Response Time:</span> Usually within 24 hours</p>
                <p><span className="text-primary font-semibold">Availability:</span> Open to new opportunities</p>
                <p><span className="text-primary font-semibold">Languages:</span> English, Romanian, Russian</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`animate-slide-right ${isVisible ? "in-view" : ""}`} style={{ animationDelay: "0.4s" }}>
            <div className="glass-card rounded-xl p-8">
              <h3 className="gradient-text text-2xl font-bold mb-6">Send Me a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-foreground font-medium mb-2 block">Name *</label>
                    <Input
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-secondary/50 border-white/10 text-foreground placeholder:text-muted-foreground"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="text-foreground font-medium mb-2 block">Email *</label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-secondary/50 border-white/10 text-foreground placeholder:text-muted-foreground"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="text-foreground font-medium mb-2 block">Phone (optional)</label>
                    <Input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-secondary/50 border-white/10 text-foreground placeholder:text-muted-foreground"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-foreground font-medium mb-2 block">Subject *</label>
                  <Input
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="bg-secondary/50 border-white/10 text-foreground placeholder:text-muted-foreground"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="text-foreground font-medium mb-2 block">Message *</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="bg-secondary/50 border-white/10 text-foreground placeholder:text-muted-foreground resize-none"
                    placeholder="Tell me about your project or opportunity..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-gradient py-3 text-lg font-medium"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Send className="h-5 w-5" />
                      <span>Send Message</span>
                    </div>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`text-center mt-16 animate-fade-in ${isVisible ? "in-view" : ""}`} style={{ animationDelay: "0.6s" }}>
          <div className="glass-card rounded-xl p-6">
            <p className="text-foreground mb-4">
              © 2025 Vlad Pocris. Built with React, TypeScript, and Tailwind CSS.
            </p>
            <p className="text-muted-foreground text-sm">
              Thank you for visiting my portfolio. Looking forward to connecting with you!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;