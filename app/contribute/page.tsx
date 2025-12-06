"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Rocket,
  Star,
  Trophy,
  Check,
  Send,
  Building,
  CreditCard,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { PageTransition, ScrollAnimation } from "@/components/page-transition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const sponsorshipTiers = [
  {
    name: "Supporter",
    price: "৳10,000+",
    icon: Heart,
    color: "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400",
    benefits: [
      "Name on website",
      "Social media mention",
      "Newsletter updates",
      "Certificate of appreciation",
    ],
  },
  {
    name: "Bronze",
    price: "৳50,000+",
    icon: Star,
    color: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
    benefits: [
      "All Supporter benefits",
      "Logo on website",
      "Logo on team merchandise",
      "Quarterly progress reports",
    ],
  },
  {
    name: "Silver",
    price: "৳1,00,000+",
    icon: Rocket,
    color: "bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-gray-300",
    benefits: [
      "All Bronze benefits",
      "Logo on rover",
      "Invitation to team events",
      "Featured in press releases",
      "Workshop visit opportunity",
    ],
    popular: true,
  },
  {
    name: "Gold",
    price: "৳2,50,000+",
    icon: Trophy,
    color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400",
    benefits: [
      "All Silver benefits",
      "Prominent logo placement",
      "Speaking opportunity at events",
      "Dedicated social media campaign",
      "Priority partnership opportunities",
      "VIP access to competitions",
    ],
  },
];

const bankDetails = {
  bankName: "Dutch-Bangla Bank Limited",
  accountName: "Team Durbar - KUET",
  accountNumber: "1234567890123",
  branch: "KUET Branch, Khulna",
  routingNumber: "090123456",
};

export default function ContributePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white dark:from-space-gunmetal/50 dark:to-space-black">
        <div className="section-container">
          <ScrollAnimation>
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block px-4 py-1.5 rounded-full bg-mars/10 text-mars text-sm font-medium mb-4">
                Support Us
              </span>
              <h1 className="section-heading mb-4">
                Help Us Reach <span className="text-mars">Mars</span>
              </h1>
              <p className="section-subheading mx-auto">
                Your support enables us to push the boundaries of space
                robotics. Join us in making Bangladesh proud on the global
                stage.
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Sponsorship Tiers */}
      <section className="py-16 md:py-20">
        <div className="section-container">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Sponsorship Packages
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Choose a sponsorship tier that aligns with your support goals
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sponsorshipTiers.map((tier, index) => (
              <ScrollAnimation key={tier.name} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className={`card p-6 h-full flex flex-col relative ${
                    tier.popular ? "ring-2 ring-mars" : ""
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-3 py-1 rounded-full bg-mars text-white text-xs font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div
                    className={`w-14 h-14 rounded-xl ${tier.color} flex items-center justify-center mb-4`}
                  >
                    <tier.icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-2xl font-bold text-mars mb-4">
                    {tier.price}
                  </p>

                  <ul className="space-y-3 flex-1 mb-6">
                    {tier.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                      >
                        <Check className="w-4 h-4 text-mars flex-shrink-0 mt-0.5" />
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={tier.popular ? "default" : "outline"}
                    className="w-full"
                  >
                    Select Plan
                  </Button>
                </motion.div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Bank Details */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-space-gunmetal/50">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Bank Info */}
            <ScrollAnimation>
              <div className="card p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-mars/10 flex items-center justify-center">
                    <CreditCard className="w-7 h-7 text-mars" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Bank Transfer
                    </h3>
                    <p className="text-sm text-gray-500">
                      Direct bank deposit details
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {Object.entries(bankDetails).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between py-3 border-b border-gray-100 dark:border-zinc-800 last:border-0"
                    >
                      <span className="text-sm text-gray-500 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-sm text-gray-500">
                  Please include your name and &quot;Team Durbar Sponsorship&quot; in
                  the transaction reference.
                </p>
              </div>
            </ScrollAnimation>

            {/* Contact Info */}
            <ScrollAnimation delay={0.1}>
              <div className="card p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-mars/10 flex items-center justify-center">
                    <Building className="w-7 h-7 text-mars" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Contact Information
                    </h3>
                    <p className="text-sm text-gray-500">Get in touch with us</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-mars flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Address
                      </p>
                      <p className="text-sm text-gray-500">
                        Khulna University of Engineering & Technology
                        <br />
                        Khulna-9203, Bangladesh
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-mars flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Email
                      </p>
                      <a
                        href="mailto:teamdurbar@kuet.ac.bd"
                        className="text-sm text-mars hover:underline"
                      >
                        teamdurbar@kuet.ac.bd
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-mars flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Phone
                      </p>
                      <a
                        href="tel:+8801712345678"
                        className="text-sm text-gray-500 hover:text-mars"
                      >
                        +880 1712-345678
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-16 md:py-20">
        <div className="section-container">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Get in Touch
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Have questions about sponsorship or partnership opportunities?
                Send us a message.
              </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={0.1}>
            <div className="max-w-2xl mx-auto">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="card p-8 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Thank you for reaching out. We&apos;ll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="card p-8 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Your Name *
                      </label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Organization
                      </label>
                      <Input
                        value={formData.organization}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            organization: e.target.value,
                          })
                        }
                        placeholder="Company Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+880 1XXX-XXXXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Message *
                    </label>
                    <Textarea
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Tell us about your interest in supporting Team Durbar..."
                      rows={5}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </PageTransition>
  );
}

