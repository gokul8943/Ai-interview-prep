import logoSvg from '../../../public/logo.svg'
export default function Footer() {
    return (
        <footer className="px-6 py-12">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Logo and Description */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                                <img src={logoSvg} className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">IntelliPrep</span>
                        </div>
                        <p className="text-gray-400 mb-6">
                            Empowering professionals to land their dream jobs through AI-powered interview preparation.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
