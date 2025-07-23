import React from "react";
import SocialButton from "../ui/SocialButton";
import { FaFacebookF, FaInstagram, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";

const _IconDetails = [
  {
    name: "tiktok",
    icon: <FaTiktok size={25} className="text-black/80" />,
    placeholder: "Enter TikTok URL",
  },
  {
    name: "facebook",
    icon: <FaFacebookF size={25} className="text-blue-600" />,
    placeholder: "Enter Facebook URL",
  },
  {
    name: "twitter",
    icon: <FaTwitter size={25} className="text-blue-400" />,
    placeholder: "Enter Twitter URL",
  },
  {
    name: "youtube",
    icon: <FaYoutube size={25} className="text-red-500" />,
    placeholder: "Enter YouTube URL",
  },
  {
    name: "instagram",
    icon: <FaInstagram size={25} className="text-pink-500" />,
    placeholder: "Enter Instagram URL",
  },
];

interface SocialContainerProps {
  onPlatformSelect: (platform: string, placeholder: string) => void;
  selectedPlatform: string;
}

const SocialContainer: React.FC<SocialContainerProps> = ({ onPlatformSelect, selectedPlatform }) => {
  return (
    <div className="w-[90%] max-w-screen-xl flex flex-wrap gap-5 items-center justify-start bg-white py-6">
      {_IconDetails.map(({ name, icon, placeholder }) => (
        <SocialButton
          key={name}
          icon={icon}
          onClick={() => onPlatformSelect(name, placeholder)}
          isSelected={selectedPlatform === name}
        />
      ))}
    </div>
  );
};

export default SocialContainer;