import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/AuthStrore";
import { useNavigate } from "react-router-dom";

export default function HowItWorks() {
    const navigate = useNavigate();

    const { authState } = useAuthStore()
    const user = authState.user

    const steps = [
        {
            step: "1",
            title: "Create Your AI Interview",
            description: "Set up a personalized AI-driven interview session tailored to your job role and industry."
        },
        {
            step: "2",
            title: "Practice Like the Real Thing",
            description: "Experience realistic interview scenarios with intelligent AI that adapts to your responses."
        },
        {
            step: "3",
            title: "Get Smart Feedback",
            description: "Receive in-depth performance analysis, actionable tips, and strategies to boost your confidence."
        }
    ];


    return (
        <section className="px-6 py-20">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-6">How It Works</h2>
                    <p className="text-xl text-gray-300">Get started in just three simple steps</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((item, index) => (
                        <div key={index} className="text-center group">
                            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform">
                                {item.step}
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-4">{item.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{item.description}</p>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-12">
                    <Button
                        className="btn-primary max-sm:w-full"
                        onClick={() => {
                            if (user) {
                                navigate('/create-interview')
                            } else {
                                navigate('/sign-in')
                            }
                        }}
                    >
                        Start an Interview
                    </Button>
                </div>
            </div>
        </section>
    );
}
