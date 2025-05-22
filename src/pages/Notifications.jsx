import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [respondedBids, setRespondedBids] = useState({});

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const user = await appwriteService.getCurrentUser();
        if (user) {
          const res = await appwriteService.getNotifications(user.$id);
          setNotifications(res.documents || []);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleAccept = async (bidId, buyerId, title) => {
    try {
      await appwriteService.updateBidStatus(bidId, "accepted");
      await appwriteService.sendNotification({
        userId: buyerId,
        message: `Your bid for "${title}" was accepted!`,
        type: "bid-accepted",
      });
      alert("Bid accepted!");
      setRespondedBids((prev) => ({ ...prev, [bidId]: true }));
    } catch (error) {
      console.error("Error accepting bid:", error);
    }
  };

  const handleReject = async (bidId) => {
    try {
      await appwriteService.updateBidStatus(bidId, "rejected");
      alert("Bid rejected.");
      setRespondedBids((prev) => ({ ...prev, [bidId]: true }));
    } catch (error) {
      console.error("Error rejecting bid:", error);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading notifications...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Notifications</h1>
      {notifications.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        notifications.map((note) => (
          <div
            key={note.$id}
            className="bg-white dark:bg-slate-800 p-4 shadow rounded mb-4"
          >
            <p>{note.message}</p>
            {note.type === "bid" && !respondedBids[note.bidId] && (
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleAccept(note.bidId, note.buyerId, note.title)}
                  className="bg-green-500 px-3 py-1 text-white rounded"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(note.bidId)}
                  className="bg-red-500 px-3 py-1 text-white rounded"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Notifications;
