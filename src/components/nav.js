import { Link } from "react-router-dom";
import logo from "../logo/logo.png";

function Navbar() {
    return (
        <nav className="bg-gray-800">
            {/* mx-1 moved entire nav logo/text to far left (which is good), not sure why */}
            <div className="max-w-7xl px-4 sm:px-6 lg:px-2 mx-1">
                <div className="flex items-center h-14">
                    <div className="flex">
                        <a
                            href="https://gloveboxapp.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src={logo}
                                alt="Logo"
                                className="h-8 w-auto"
                            />
                        </a>
                        <Link
                            to="https://gloveboxapp.com/"
                            className="ml-2 text-white text-2xl"
                            target="_blank"
                        >
                            Glovebox Challenge
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
