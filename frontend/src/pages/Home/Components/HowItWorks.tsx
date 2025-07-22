
export default function HowItWorks() {
  const steps = [
    {
      step: "1",
      title: "Create Interview",
      description: "Create your interview"
    },
    {
      step: "2",
      title: "Practice Interview",
      description: "Engage in realistic conversations with our AI interviewer in various formats."
    },
    {
      step: "3",
      title: "Get Feedback",
      description: "Receive detailed analysis and actionable tips to improve your performance."
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
      </div>
    </section>
  );
}
