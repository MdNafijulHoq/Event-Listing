import React from 'react';
import { Link } from 'react-router';

const EventCart = ({ event }) => {
  return (
    <div title={event.title} className="w-full max-w-xs bg-white shadow-md rounded-2xl overflow-hidden flex flex-col transition-transform hover:scale-105 duration-300 h-[420px]">
     <Link to={`/event-details/${event._id}`}>
     <div className="w-full h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-between p-4 flex-1">
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">{event.title}</h2>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{event.description}</p>

        <div className="mt-auto text-sm text-gray-500">
          <p><strong>Organizer:</strong> {event.organizer}</p>
          <p><strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {event.startTime} - {event.endTime}</p>
          <p><strong>Location:</strong> {event.location}</p>
        </div>
      </div>
     </Link>
    </div>
  );
};

export default EventCart;
