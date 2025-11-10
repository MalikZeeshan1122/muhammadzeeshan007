import { useState } from "react";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(100, { message: "Name must be less than 100 characters" }),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255, { message: "Email must be less than 255 characters" }),
  phone: z.string().trim().max(20, { message: "Phone must be less than 20 characters" }).optional(),
  message: z.string().trim().min(1, { message: "Message is required" }).max(1000, { message: "Message must be less than 1000 characters" })
});

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const whatsappMessage = encodeURIComponent("Hi, I'd like to get in touch with you.");
  const whatsappUrl = `https://wa.me/923406525171?text=${whatsappMessage}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      // Validate form data
      const validatedData = contactFormSchema.parse(formData);

      // Prepare email content
      const subject = encodeURIComponent(`Contact from ${validatedData.name}`);
      const body = encodeURIComponent(
        `Name: ${validatedData.name}\nEmail: ${validatedData.email}\nPhone: ${validatedData.phone || "N/A"}\n\nMessage:\n${validatedData.message}`
      );
      
      // Open email client
      window.location.href = `mailto:malikzeeshan3.1417@gmail.com?subject=${subject}&body=${body}`;

      toast({
        title: "Opening email client",
        description: "Your email client will open with the pre-filled message.",
      });

      // Reset form
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-foreground mb-8">Contact Me</h2>
      
      <div className="space-y-8">
        {/* Contact Information */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-primary" />
            <a 
              href="mailto:malikzeeshan3.1417@gmail.com" 
              className="text-link hover:text-link-hover transition-colors"
            >
              malikzeeshan3.1417@gmail.com
            </a>
          </div>
          
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-primary" />
            <a 
              href="tel:+923406525171" 
              className="text-foreground"
            >
              +92 340 6525171
            </a>
          </div>

          <Button
            asChild
            className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white"
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4 mr-2" />
              Message on WhatsApp
            </a>
          </Button>
        </Card>

        {/* Contact Form */}
        <Card className="p-6">
          <p className="text-foreground/70 mb-6">...or use the following form</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Your Name *
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "border-destructive" : ""}
                maxLength={100}
              />
              {errors.name && (
                <p className="text-destructive text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Your Email *
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "border-destructive" : ""}
                maxLength={255}
              />
              {errors.email && (
                <p className="text-destructive text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                Your Phone
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? "border-destructive" : ""}
                maxLength={20}
              />
              {errors.phone && (
                <p className="text-destructive text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Your Message *
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? "border-destructive" : ""}
                rows={6}
                maxLength={1000}
              />
              {errors.message && (
                <p className="text-destructive text-sm mt-1">{errors.message}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default Contact;
