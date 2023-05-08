import logo from "../logo/logo.png";

// basic chatgpt generated footer component
function Footer() {
    return (
        <footer className="fixed bottom-0 w-full bg-gray-800">
            <div className="max-w-7xl mx-auto py-1 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between">
                    <div>
                        <img src={logo} alt="Logo" className="h-8 w-auto" />
                        <p className="text-gray-400 text-sm">
                            &copy; {new Date().getFullYear()} Glovebox Challenge
                        </p>
                    </div>
                    <div className="flex items-center">
                        <a
                            href="https://github.com/DerekBanister"
                            className="text-gray-400 hover:text-white"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
