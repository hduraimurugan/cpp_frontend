import { FaSquareGithub } from "react-icons/fa6";
import { GoPersonFill } from "react-icons/go";


const Footer = () => {
  return (
    <footer className="border-t border-t-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">College Placement Portal</h2>
            <p className="text-sm">© 2024 Project done by <a href="https://durai-portfolio.vercel.app/" className="text-black font-semibold" target="_blank">Duraimurugan</a></p>
          </div>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <a href="https://durai-portfolio.vercel.app/" target="_blank" className="hover:text-gray-400" aria-label="Portfolio">
              <GoPersonFill className="w-7 h-7" />
            </a>
            <a href="https://www.linkedin.com/in/duraimurugan16/" target="_blank" className="hover:text-gray-400" aria-label="LinkedIn">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452H16.85v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.147V9.756h3.448v1.464h.05c.48-.91 1.653-1.871 3.401-1.871 3.634 0 4.307 2.39 4.307 5.498v5.605zM5.337 8.29c-1.105 0-2-.896-2-2 0-1.106.895-2 2-2 1.104 0 2 .895 2 2 0 1.104-.896 2-2 2zM7.119 20.452H3.553V9.756h3.566v10.696zM22.225 0H1.771C.791 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451c.979 0 1.771-.774 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z" /></svg>
            </a>
            <a href="https://github.com/hduraimurugan" target="_blank" className="hover:text-gray-400" aria-label="Github">
              <FaSquareGithub className="w-7 h-7" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
