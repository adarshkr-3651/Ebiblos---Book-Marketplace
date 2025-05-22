import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import Swal from "sweetalert2";

export default function SellerMessages() {
  const [offers, setOffers] = useState([]);
  const [userId, setUserId] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [postTitles, setPostTitles] = useState({});

  useEffect(() => {
    const fetchUserAndOffers = async () => {
      const user = await appwriteService.getCurrentUser();
      if (user) {
        setUserId(user.$id);
        setSellerName(user.name || "Seller");

        const allOffers = await appwriteService.getOffers();
        const sellerOffers = allOffers.documents.filter(
          (offer) => offer.sellerId === user.$id
        );

        setOffers(sellerOffers);

        const titles = {};
        await Promise.all(
          sellerOffers.map(async (offer) => {
            if (offer.postId && !titles[offer.postId]) {
              try {
                const post = await appwriteService.getPost(offer.postId);
                titles[offer.postId] = post.title || "Untitled Product";
              } catch (error) {
                console.error("Error fetching post:", error);
                titles[offer.postId] = "Unknown Product";
              }
            }
          })
        );

        setPostTitles(titles);
      }
    };

    fetchUserAndOffers();
  }, []);

  const handleDecision = async (
    offerDocId,
    decision,
    buyerId,
    buyerName,
    offerPrice,
    postId
  ) => {
    try {
      const notifications = await appwriteService.getNotifications(postId, buyerId);

      if (notifications.documents.length > 0) {
        const notif = notifications.documents[0];

        const newMessage = `${sellerName} has ${decision}ed your offer of Rs ${offerPrice} for "${postTitles[postId] || "your product"}".`;

        const updatedMessages = notif.messages
          ? [...notif.messages, newMessage]
          : [newMessage];

        await appwriteService.updateNotificationMessages(notif.$id, updatedMessages);
      }

      // ✅ Remove just this buyer's offer
      await appwriteService.removeBuyerOffer(offerDocId, buyerId, offerPrice);

      Swal.fire(
        "Response Sent",
        `You have ${decision}ed the offer.`,
        decision === "accept" ? "success" : "info"
      );

      // Remove from UI
      setOffers((prevOffers) =>
        prevOffers.map((offer) => {
          if (offer.$id === offerDocId) {
            const newBuyerId = [...offer.buyerId];
            const newBuyerName = [...offer.buyerName];
            const newOfferPrice = [...offer.offerPrice];

            const indexToRemove = offer.buyerId.findIndex(
              (id, idx) => id === buyerId && offer.offerPrice[idx] === offerPrice
            );

            if (indexToRemove !== -1) {
              newBuyerId.splice(indexToRemove, 1);
              newBuyerName.splice(indexToRemove, 1);
              newOfferPrice.splice(indexToRemove, 1);
            }

            return {
              ...offer,
              buyerId: newBuyerId,
              buyerName: newBuyerName,
              offerPrice: newOfferPrice,
            };
          }

          return offer;
        }).filter(offer => offer.buyerId.length > 0) // Remove entire offer doc if empty
      );
    } catch (error) {
      console.error("Failed to respond to offer:", error);
      Swal.fire("Error", "Unable to respond to offer. Try again.", "error");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Incoming Offers</h2>
      {offers.length === 0 ? (
        <p className="text-gray-600">No offers at the moment.</p>
      ) : offers.flatMap((offer) =>
          offer.buyerId.map((buyerId, index) => (
            <div
              key={`${offer.$id}-${index}`}
              className="bg-white shadow-md rounded-xl p-4 mb-4 border"
            >
              <p className="text-gray-800 mb-2">
                <strong>{offer.buyerName[index]}</strong> has offered{" "}
                <strong>Rs {offer.offerPrice[index]}</strong> for your product{" "}
                <strong>{postTitles[offer.postId] || "..."}</strong>.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() =>
                    handleDecision(
                      offer.$id,
                      "accept",
                      buyerId,
                      offer.buyerName[index],
                      offer.offerPrice[index],
                      offer.postId
                    )
                  }
                  className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                >
                  Accept
                </button>
                <button
                  onClick={() =>
                    handleDecision(
                      offer.$id,
                      "reject",
                      buyerId,
                      offer.buyerName[index],
                      offer.offerPrice[index],
                      offer.postId
                    )
                  }
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
    </div>
  );
}
