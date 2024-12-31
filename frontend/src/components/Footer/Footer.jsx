import React from "react";
import { assets } from "../../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 flex flex-col gap-8 py-10 px-5 sm:px-10 lg:px-20 mt-24">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] w-full">
        {/* Left Section */}
        <div className="flex flex-col gap-5">
          <img className="w-[150px]" src={assets.logo} alt="Logo" />
          <p className="text-sm leading-6 text-gray-300 md:text-base md:leading-7">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Dignissimos quibusdam, mollitia delectus assumenda vero quasi
            eligendi reprehenderit itaque labore nostrum quisquam
            exercitationem. Incidunt enim recusandae rerum temporibus ullam
            fugiat reprehenderit.
          </p>

          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="w-6 hover:opacity-80 transition"
                src={assets.facebook_icon}
                alt="Facebook"
              />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="w-6 hover:opacity-80 transition"
                src={assets.twitter_icon}
                alt="Twitter"
              />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="w-6 hover:opacity-80 transition"
                src={assets.linkedin_icon}
                alt="LinkedIn"
              />
            </a>
          </div>
        </div>

        {/* Center Section */}
        <div className="flex flex-col gap-5">
          <h2 className="text-white text-lg font-semibold">Company</h2>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-[tomato] transition cursor-pointer">
              Home
            </li>
            <li className="hover:text-[tomato] transition cursor-pointer">
              About Us
            </li>
            <li className="hover:text-[tomato] transition cursor-pointer">
              Delivery
            </li>
            <li className="hover:text-[tomato] transition cursor-pointer">
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-5">
          <h2 className="text-white text-lg font-semibold">Get in Touch</h2>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-[tomato] transition cursor-pointer">
              (+02)01121323475
            </li>
            <li className="hover:text-[tomato] transition cursor-pointer">
              Abdelrahamankhaled633@gmail.com
            </li>
          </ul>
        </div>
      </div>

      <hr className="w-full h-px bg-gray-600 border-none" />

      {/* Footer Bottom */}
      <div className="text-center">
        <p className="text-sm">
          Copyright {new Date().getFullYear()} &copy; Tomato.com - All Rights
          Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
