import { Linkedin, Twitter, Facebook, Youtube } from 'lucide-react';
import logoSvg from '../../../public/logo.svg';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="text-gray-300">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <div>
                            <Link to="/" className="flex items-center gap-2">
                                <img src={logoSvg} alt="logo" width={38} height={32} />
                                <h2 className="text-primary-100">IntelliPrep</h2>
                            </Link>
                        </div>
                        <p className="text-sm mb-4">
                            Experience realistic interview scenarios with intelligent AI that adapts to your responses.                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-blue-400 transition-colors">
                                <Linkedin size={20} />
                            </a>
                            <a href="#" className="hover:text-blue-400 transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="hover:text-blue-400 transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="hover:text-blue-400 transition-colors">
                                <Youtube size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Platform</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                            {/* <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li> */}
                            {/* <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li> */}
                            {/* <li><a href="#" className="hover:text-white transition-colors">Security</a></li> */}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Resources</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Interview Guides</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center text-sm">
                        <p>&copy; {new Date().getFullYear()} IntelliPrep. All rights reserved.</p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}