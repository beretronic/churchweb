import React from 'react';

const SermonCard = ({ sermon }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
            <div className="p-6">
                <span className="text-sm text-blue-600 font-bold uppercase">{sermon.series}</span>
                <h3 className="text-xl font-bold mt-2 text-gray-800">{sermon.title}</h3>
                <p className="text-gray-600 mt-2 line-clamp-3">{sermon.description}</p>
                <a
                    href={sermon.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Watch Now
                </a>
            </div>
        </div>
    );
};

export default SermonCard;