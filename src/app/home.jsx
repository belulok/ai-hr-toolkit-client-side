// src/app/home.jsx
"use client";  // since we use dynamic stuff like useRouter
import React from "react";
import { useRouter } from "next/navigation";  // for client-side navigation
import {
    Briefcase, 
    Mail, 
    MessageSquareText,
    ArrowRight,
    CheckCircle,
    Users,
    Clock,
    Zap,
    LineChart,
    Shield
} from "lucide-react";

function FeatureCard({ icon: Icon, title, description, gradient, onClick }) {
    return (
        <div onClick={onClick} className="relative group cursor-pointer">
            <div
                className="absolute -inset-0.5 bg-gradient-to-r rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-200"
                style={{ background: gradient }}
            />
            <div className="relative flex flex-col h-full bg-black/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-800 p-8">
                <div className="flex items-center justify-between mb-4">
                    <Icon
                        className="h-10 w-10"
                        style={{ color: gradient.match(/(#[A-Fa-f0-9]{6}|[a-z]+)/g)[0] }}
                    />
                    <ArrowRight className="h-5 w-5 text-gray-500 group-hover:text-white transition-colors duration-200" />
                </div>
                <h3
                    className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r"
                    style={{ backgroundImage: gradient }}
                >
                    {title}
                </h3>
                <p className="text-gray-400 text-sm">{description}</p>
            </div>
        </div>
    );
}

function BenefitCard({ icon: Icon, title, description }) {
    return (
        <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
            <Icon className="h-8 w-8 text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
            <p className="text-gray-400 text-sm">{description}</p>
        </div>
    );
}

function TestimonialCard({ name, role, company, content}) {
    return (
        <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
            <div className="flex items-center mb-4">
                <div>
                    <h4 className="text-white font-medium">{name}</h4>
                    <p className="text-gray-400 text-sm">{role}</p>
                </div>
            </div>
            <p className="text-gray-300 italic">"{content}"</p>
        </div>
    );
}

export default function HomePage() {
    const router = useRouter(); // use Next's router

    const features = [
        {
            icon: Briefcase,
            title: "AI Job Matcher",
            description: "Match resumes ...",
            gradient: "linear-gradient(to right, #3b82f6, #06b6d4)",
            path: "/job-matcher", // Next route
        },
        {
            icon: Mail,
            title: "Email Classifier",
            description: "Automatically categorize ...",
            gradient: "linear-gradient(to right, #8b5cf6, #d946ef)",
            path: "/email-classifier", // future route
        },
        {
            icon: MessageSquareText,
            title: "Sentiment Analysis",
            description: "Analyze candidate reviews ...",
            gradient: "linear-gradient(to right, #059669, #10b981)",
            path: "/sentiment-analysis", // future route
        },
    ];

    const benefits = [
        {
            icon: Clock,
            title: "Save Time",
            description: "Reduce manual screening time by up to 75% with AI-powered candidate matching."
        },
        {
            icon: Zap,
            title: "Increase Efficiency",
            description: "Streamline your HR workflow with automated email classification and response suggestions."
        },
        {
            icon: Users,
            title: "Better Matches",
            description: "Find the perfect candidates faster with advanced skill matching algorithms."
        },
        {
            icon: LineChart,
            title: "Data Insights",
            description: "Make data-driven decisions with comprehensive analytics and reporting."
        },
        {
            icon: Shield,
            title: "Reduce Bias",
            description: "Ensure fair hiring practices with objective, AI-based candidate assessment."
        },
        {
            icon: CheckCircle,
            title: "Quality Hire",
            description: "Improve hiring quality with comprehensive candidate-job fit analysis."
        }
    ];

    const testimonials = [
        {
            name: "AI-Powered Email Classifier for HR",
            role: "Reads incoming job applications (from emails).",
            company: "TechCorp",
            content: "Classifies emails into categories like 'Qualified,' 'Needs Review,' 'Rejected.'",
        },
        {
            name: "AI Chatbot for Basic HR Queries",
            role: "Talent Acquisition Manager",
            company: "InnovateCo",
            content: "AI chatbot that answers basic HR-related questions (leave policies, job openings, interview process).",
        },
        {
            name: "AI-Based Sentiment Analysis for Candidate Reviews",
            role: "Takes interview feedback as input.",
            company: "FutureScale",
            content: "Helps recruiters identify trends in hiring decisions",
        }
    ];

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                    AI-Powered HR Tools
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Streamline your HR processes with our suite of AI-powered tools.
                    Select a feature below to get started.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature) => (
                    <FeatureCard
                        key={feature.title}
                        {...feature}
                        onClick={() => router.push(feature.path)}
                    />
                ))}
            </div>
            {/* Benefits Section */}
            <div className="py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                        Why Choose AI HR Toolkit?
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Transform your HR operations with cutting-edge AI technology designed specifically for modern recruitment needs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefits.map((benefit) => (
                        <BenefitCard key={benefit.title} {...benefit} />
                    ))}
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                        Upcoming Features
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Updates on new features will be posted here, so stay tune
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <TestimonialCard key={testimonial.name} {...testimonial} />
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-16">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600">
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
                    <div className="relative px-8 py-12 text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Ready to Transform Your HR Process?
                        </h2>
                        <p className="text-gray-100 mb-8 max-w-2xl mx-auto">
                            Join thousands of companies using AI HR Toolkit to streamline their recruitment and HR operations.
                        </p>
                        <button
                            onClick={() => navigate('/job-matcher')}
                            className="bg-white text-blue-600 px-8 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors duration-200"
                        >
                            Get Started Now
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
