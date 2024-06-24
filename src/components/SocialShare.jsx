import React from 'react';
import { FaTwitter, FaFacebook, FaWhatsapp } from 'react-icons/fa';

const SocialShare = ({ movie }) => {
    const shareUrl = encodeURIComponent(`${window.location.origin}/${movie.id}`);
    const shareText = encodeURIComponent(`Check out this mash-up movie: ${movie.name} (${movie.year}). A unique blend of top IMDb movies!`);

    const twitterUrl = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${shareText} ${shareUrl}`;

    return (
        <div className="flex justify-center space-x-4 mt-4">
            <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                <FaTwitter size={20} className="md:w-6 md:h-6" />
            </a>
            <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                <FaFacebook size={20} className="md:w-6 md:h-6" />
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-700">
                <FaWhatsapp size={20} className="md:w-6 md:h-6" />
            </a>
        </div>
    );
};

export default SocialShare;