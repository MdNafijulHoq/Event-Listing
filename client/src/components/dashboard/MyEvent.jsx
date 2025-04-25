import React, { useEffect } from "react";
import RootLayout from "../layout/RootLayout";
import EventStore from "../../zustandStore/useEventStore";
import { Pencil, Trash2 } from "lucide-react";

const MyEvent = () => {
  const { Event, getEventByUser, DeleteEvent } = EventStore();
  useEffect(() => {
    (async () => {
      await getEventByUser();
    })();
  }, [getEventByUser]);

  const handleDelete = async (id) => {
    const isDeleted = await DeleteEvent(id);
    if (isDeleted) {
      await getEventByUser(); 
    }
  };
  
  return (
    <>
      <RootLayout>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-12 place-items-center py-8">
          {Event && Event.length > 0 ? (
            Event.map((item) => {
              return (
                <div
                  key={item._id}
                  className="w-full max-w-xs bg-white shadow-md rounded-2xl overflow-hidden flex flex-col transition-transform hover:scale-105 duration-300 h-[420px]"
                >
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src={item?.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between p-4 flex-1">
                    <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
                      {item.title}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="mt-auto text-sm text-gray-500">
                      <p>
                        <strong>Organizer:</strong>
                        {item.organizer}
                      </p>
                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(item.eventDate).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Time:</strong> {item.startTime} - {item.endTime}
                      </p>
                      <p>
                        <strong>Location:</strong> {item.location}
                      </p>
                    </div>
                    {/* Update/Delete Icons */}
                    <div className="flex justify-between gap-3 mt-4">
                      <button
                        onClick={() => console.log("Update", item._id)}
                        className="text-indigo-600 hover:text-indigo-800 transition cursor-pointer"
                        title="Update"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-500 hover:text-red-700 transition cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No event found</p>
          )}
        </div>
      </RootLayout>
    </>
  );
};

export default MyEvent;
