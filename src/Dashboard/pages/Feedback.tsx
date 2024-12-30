import { db, FEEDBACK_COLLECTION } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import moment from "moment";

interface Feedback {
  id: string;
  phone: number;
  feedback: string;
  createdAt: { seconds: number; nanoseconds: number };
}

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    const fetchMenu = () => {
      const managerCollection = collection(db, FEEDBACK_COLLECTION);
      const unsub = onSnapshot(managerCollection, (snapshot) => {
        const items = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });
        setFeedbacks(items as Feedback[]);
        // console.log("menuList", menuList);
      });
      return unsub;
    };
    const unsub = fetchMenu();
    return () => unsub();
  }, []);

  return (
    <div className="min-h-screen p-6">
      <h2 className="text-3xl  text-primary-color font-semibold  mb-6">
        Customer Feedback
      </h2>
      <div className="space-y-4">
        {feedbacks.map((feedback) => (
          <div key={feedback.id} className="bg-navbgprimary rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-white rounded-full"></div>

              <div className="flex-1">
                <p className="text-gray-200 mb-2">{feedback.phone}</p>
                <p className="text-gray-300 text-sm mb-3">
                  {feedback.feedback}
                </p>
                <p className="text-gray-400 text-xs">
                  {
                    // use relative time
                    moment(feedback.createdAt.seconds * 1000).fromNow()
                  }
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Feedback;
