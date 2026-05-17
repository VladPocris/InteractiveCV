import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
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

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "name": return value.trim().length < 2 ? "Name must be at least 2 characters" : "";
      case "email": return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Please enter a valid email" : "";
      case "subject": return value.trim().length < 3 ? "Subject must be at least 3 characters" : "";
      case "message": return value.trim().length < 10 ? "Message must be at least 10 characters" : "";
      default: return "";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast({ title: "Copied!", description: `${field} copied to clipboard.` });
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      toast({ title: "Failed to copy", description: "Please copy manually.", variant: "destructive" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "phone") return;
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    setTouched({ name: true, email: true, subject: true, message: true });
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;

    try {
      if (!publicKey || !serviceId || !templateId) throw new Error("Email service not configured");
      const response = await emailjs.send(serviceId, templateId, {
        from_name: formData.name, fullname: formData.name,
        email: formData.email, reply_to: formData.email,
        phone: formData.phone, subject: formData.subject,
        message: formData.message, to_email: "vpocris@gmail.com"
      }, { publicKey });
      if (response.status !== 200) throw new Error("EmailJS failed");
      toast({ title: "Message sent!", description: "Thank you for reaching out. I'll get back to you within 24 hours." });
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setTouched({});
      setErrors({});
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
    { icon: <Mail className="h-5 w-5" />, title: "Email", value: "vpocris@gmail.com", link: "mailto:vpocris@gmail.com", copyValue: "vpocris@gmail.com" },
    { icon: <Phone className="h-5 w-5" />, title: "Phone", value: "+353 85 872 5445", link: "tel:+353858725445", copyValue: "+353858725445" },
    { icon: <MapPin className="h-5 w-5" />, title: "Location", value: "Wicklow, Ireland", link: "https://www.google.com/maps/place/Ballybeg,+Rathnew,+Co.+Wicklow,+Ireland" }
  ];

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, name: "GitHub", url: "https://github.com/vladpocris", color: "hover:text-white" },
    { icon: <Linkedin className="h-5 w-5" />, name: "LinkedIn", url: "https://www.linkedin.com/in/vlad-pocris-315aa7212/", color: "hover:text-blue-400" }
  ];

  return (
    <section id="contact" className="relative min-h-screen py-20">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className={`text-center mb-16 animate-slide-up ${isVisible ? "in-view" : ""}`}>
          <h2 className="gradient-text text-5xl lg:text-6xl font-bold mb-4">CONTACT</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto mb-6" />
          <p className="text-foreground text-lg max-w-2xl mx-auto">
            Let's connect and discuss how we can work together to bring your ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className={`space-y-6 animate-slide-left ${isVisible ? "in-view" : ""}`}>
            {contactInfo.map((info, index) => (
              <div key={index} className="glass-card rounded-xl p-5 block transition-all duration-300 group">
                <div className="flex items-center justify-between">
                  <a href={info.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="p-3 bg-primary/20 rounded-lg text-primary group-hover:scale-110 transition-transform duration-300">
                      {info.icon}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-primary font-semibold">{info.title}</h3>
                      <p className="text-foreground text-sm truncate">{info.value}</p>
                    </div>
                  </a>
                  {info.copyValue && (
                    <button
                      onClick={() => copyToClipboard(info.copyValue, info.title)}
                      className="p-2 text-muted-foreground hover:text-primary transition-colors shrink-0 w-8 h-8 flex items-center justify-center"
                      aria-label={`Copy ${info.title}`}
                    >
                      {copiedField === info.title ? <CheckCircle className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                    </button>
                  )}
                </div>
              </div>
            ))}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="glass-card rounded-xl p-5">
                <h3 className="gradient-text text-lg font-bold mb-4">Connect</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a key={index} href={social.url} target="_blank" rel="noopener noreferrer"
                      className={`p-3 bg-secondary/50 rounded-lg text-foreground transition-all duration-300 hover:scale-110 hover:bg-primary/20 ${social.color}`}
                      aria-label={`Visit ${social.name}`}>
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
              <div className="glass-card rounded-xl p-5">
                <h3 className="gradient-text text-lg font-bold mb-4">Quick Info</h3>
                <div className="space-y-2 text-sm text-foreground">
                  <p><span className="text-primary font-semibold">Response:</span> Within 24h</p>
                  <p><span className="text-primary font-semibold">Status:</span> Open to opportunities</p>
                  <p><span className="text-primary font-semibold">Languages:</span> EN, RO, RU</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className={`animate-slide-right ${isVisible ? "in-view" : ""}`}>
            <div className="glass-card rounded-xl p-6 sm:p-8">
              <h3 className="gradient-text text-2xl font-bold mb-6">Send Me a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-foreground font-medium mb-1.5 block text-sm" htmlFor="name">Name *</label>
                    <Input id="name" name="name" type="text" value={formData.name}
                      onChange={handleInputChange} onBlur={handleBlur}
                      className={`bg-secondary/50 border text-foreground placeholder:text-muted-foreground ${touched.name && errors.name ? "border-red-500/50" : "border-white/10"}`}
                      placeholder="Your full name"
                      aria-invalid={touched.name && !!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined} />
                    <p id="name-error" className="text-red-400 text-xs mt-1 min-h-[1.25rem]">{touched.name && errors.name ? errors.name : ""}</p>
                  </div>
                  <div>
                    <label className="text-foreground font-medium mb-1.5 block text-sm" htmlFor="email">Email *</label>
                    <Input id="email" name="email" type="email" value={formData.email}
                      onChange={handleInputChange} onBlur={handleBlur}
                      className={`bg-secondary/50 border text-foreground placeholder:text-muted-foreground ${touched.email && errors.email ? "border-red-500/50" : "border-white/10"}`}
                      placeholder="your.email@example.com"
                      aria-invalid={touched.email && !!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined} />
                    <p id="email-error" className="text-red-400 text-xs mt-1 min-h-[1.25rem]">{touched.email && errors.email ? errors.email : ""}</p>
                  </div>
                </div>

                <div>
                  <label className="text-foreground font-medium mb-1.5 block text-sm" htmlFor="subject">Subject *</label>
                  <Input id="subject" name="subject" type="text" value={formData.subject}
                    onChange={handleInputChange} onBlur={handleBlur}
                    className={`bg-secondary/50 border text-foreground placeholder:text-muted-foreground ${touched.subject && errors.subject ? "border-red-500/50" : "border-white/10"}`}
                    placeholder="What's this about?"
                    aria-invalid={touched.subject && !!errors.subject}
                    aria-describedby={errors.subject ? "subject-error" : undefined} />
                  <p id="subject-error" className="text-red-400 text-xs mt-1 min-h-[1.25rem]">{touched.subject && errors.subject ? errors.subject : ""}</p>
                </div>

                <div>
                  <label className="text-foreground font-medium mb-1.5 block text-sm" htmlFor="message">Message *</label>
                  <Textarea id="message" name="message" value={formData.message}
                    onChange={handleInputChange} onBlur={handleBlur} rows={5}
                    className={`bg-secondary/50 border text-foreground placeholder:text-muted-foreground resize-none ${touched.message && errors.message ? "border-red-500/50" : "border-white/10"}`}
                    placeholder="Tell me about your project or opportunity..."
                    aria-invalid={touched.message && !!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined} />
                  <p id="message-error" className="text-red-400 text-xs mt-1 min-h-[1.25rem]">{touched.message && errors.message ? errors.message : ""}</p>
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full btn-gradient py-3 text-lg font-medium min-h-[3rem] flex items-center justify-center">
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Send className="h-5 w-5" />
                      <span>Send Message</span>
                    </div>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>

        <div className={`text-center mt-16 animate-fade-in ${isVisible ? "in-view" : ""}`}>
          <div className="glass-card rounded-xl p-6">
            <p className="text-foreground mb-2">© 2025 Vlad Pocris. Built with React, TypeScript, and Tailwind CSS.</p>
            <p className="text-muted-foreground text-sm">Thank you for visiting. Looking forward to connecting!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;