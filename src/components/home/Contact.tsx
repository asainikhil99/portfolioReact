"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Mail,
  User,
  MessageSquare,
  Send,
  Github,
  Linkedin,
} from "lucide-react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ElementType;
}

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  icon?: React.ElementType;
}

interface AlertProps {
  children: React.ReactNode;
  variant?: "error" | "success" | "default";
}

const Input = ({ icon: Icon, ...props }: InputProps) => (
  <div className="relative">
    {Icon && <Icon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />}
    <input
      {...props}
      className={`w-full px-4 py-2 ${
        Icon ? "pl-10" : ""
      } rounded-lg border border-gray-300 
      focus:ring-2 focus:ring-blue-500 focus:border-transparent 
      dark:bg-gray-800 dark:border-gray-700 dark:text-white
      transition-colors duration-200`}
    />
  </div>
);

const Textarea = ({ icon: Icon, ...props }: TextareaProps) => (
  <div className="relative">
    {Icon && <Icon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />}
    <textarea
      {...props}
      className={`w-full px-4 py-2 ${
        Icon ? "pl-10" : ""
      } rounded-lg border border-gray-300 
      focus:ring-2 focus:ring-blue-500 focus:border-transparent 
      dark:bg-gray-800 dark:border-gray-700 dark:text-white
      transition-colors duration-200 min-h-[120px] resize-y`}
    />
  </div>
);

const Alert = ({ children, variant = "default" }: AlertProps) => {
  const variantStyles = {
    error: "bg-red-50 text-red-900 dark:bg-red-900/10 dark:text-red-200",
    success:
      "bg-green-50 text-green-900 dark:bg-green-900/10 dark:text-green-200",
    default: "bg-blue-50 text-blue-900 dark:bg-blue-900/10 dark:text-blue-200",
  };

  return (
    <div className={`p-4 rounded-lg ${variantStyles[variant]}`}>{children}</div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "error" | "success" | "";
    message: string;
  }>({ type: "", message: "" });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus({
        type: "success",
        message: "Message sent successfully! We'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="fixed left-6 top-1/3 z-20 flex flex-col space-y-6">
        <a
          href="https://github.com/asainikhil99"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
        >
          <Github className="h-6 w-6" />
          <span className="hidden lg:block text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            GitHub
          </span>
        </a>
        <a
          href="https://www.linkedin.com/in/sai-nikhil-b197751a8/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
        >
          <Linkedin className="h-6 w-6" />
          <span className="hidden lg:block text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            LinkedIn
          </span>
        </a>
        <a
          href="mailto:asainikhil.99@gmail.com"
          className="group flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
        >
          <Mail className="h-6 w-6" />
          <span className="hidden lg:block text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Email
          </span>
        </a>
      </div>

      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Get in Touch
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Fill out the form below and we'll get back to you as soon as
            possible.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Input
              icon={User}
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />
          </div>

          <div className="space-y-2">
            <Input
              icon={Mail}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
            />
          </div>

          <div className="space-y-2">
            <Textarea
              icon={MessageSquare}
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
            />
          </div>

          {submitStatus.message && (
            <Alert variant={submitStatus.type || "default"}>
              {submitStatus.message}
            </Alert>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 
            disabled:bg-blue-400 text-white font-medium rounded-lg
            transition-colors duration-200 flex items-center justify-center
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            dark:focus:ring-offset-gray-800"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <Send className="mr-2 h-5 w-5" />
                Send Message
              </span>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
