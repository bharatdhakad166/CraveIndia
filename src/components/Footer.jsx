import google from "../assets/icons/google.png"
import facebook from "../assets/icons/facebook.png"
import x from "../assets/icons/twitter.png"
import insta from "../assets/icons/instagram.png"

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* BRAND */}
          <div>
            <h1 className="text-3xl font-bold text-orange-600">
              CraveIndia
            </h1>

            <p className="text-gray-500 text-sm leading-6 mt-4">
              Discover delicious meals from your favorite restaurants.
              Fast delivery, premium taste, and a modern food experience.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex gap-4 mt-6">

              <div className="w-10 h-10 rounded-full bg-gray-100 hover:bg-orange-500 hover:text-white transition-all duration-300 flex items-center justify-center cursor-pointer text-gray-600 text-lg">
                <img src={google} className="h-6"/>
              </div>

              <div className="w-10 h-10 rounded-full bg-gray-100 hover:bg-orange-500 hover:text-white transition-all duration-300 flex items-center justify-center cursor-pointer text-gray-600 text-lg">
                <img src={facebook} className="h-6"/>
              </div>

              <div className="w-10 h-10 rounded-full bg-gray-100 hover:bg-orange-500 hover:text-white transition-all duration-300 flex items-center justify-center cursor-pointer text-gray-600 text-lg">
                <img src={x} className="h-6"/>
              </div>

              <div className="w-10 h-10 rounded-full bg-gray-100 hover:bg-orange-500 hover:text-white transition-all duration-300 flex items-center justify-center cursor-pointer text-gray-600 text-lg">
                <img src={insta} className="h-6"/>
              </div>

            </div>
          </div>

          {/* COMPANY */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-5">
              Company
            </h2>

            <ul className="space-y-3 text-gray-500 text-sm">
              <li className="hover:text-orange-500 cursor-pointer transition">
                About Us
              </li>

              <li className="hover:text-orange-500 cursor-pointer transition">
                Careers
              </li>

              <li className="hover:text-orange-500 cursor-pointer transition">
                Blog
              </li>

              <li className="hover:text-orange-500 cursor-pointer transition">
                Contact
              </li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-5">
              Support
            </h2>

            <ul className="space-y-3 text-gray-500 text-sm">
              <li className="hover:text-orange-500 cursor-pointer transition">
                Help Center
              </li>

              <li className="hover:text-orange-500 cursor-pointer transition">
                Terms of Service
              </li>

              <li className="hover:text-orange-500 cursor-pointer transition">
                Privacy Policy
              </li>

              <li className="hover:text-orange-500 cursor-pointer transition">
                Refund Policy
              </li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-5">
              Stay Updated
            </h2>

            <p className="text-sm text-gray-500 leading-6 mb-4">
              Subscribe to receive latest offers and food updates.
            </p>

            <div className="flex flex-col gap-3">
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-gray-200 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-sm text-gray-400 text-center md:text-left">
            © 2026 CraveIndia. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-gray-500">
            <p className="hover:text-orange-500 cursor-pointer transition">
              Privacy
            </p>

            <p className="hover:text-orange-500 cursor-pointer transition">
              Terms
            </p>

            <p className="hover:text-orange-500 cursor-pointer transition">
              Cookies
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;