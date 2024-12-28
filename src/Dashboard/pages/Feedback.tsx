interface Feedback {
  id: string;
  phoneNumber: string;
  message: string;
  timestamp: string;
}
const feedbacks: Feedback[] = [
  {
    id: "1",
    phoneNumber: "0966 243 567 892",
    message:
      "Lorem ipsum dolor sit amet consectetur. Ut amet odio fames purus. Morbi pharetra scelerisque vitae ultrices eget vestibulum phasellus molestie lectus. Aliquet condimentum egestas suspendisse lorem orci venenatis senectus in aliquet. Consectetur sagittis tortor vulputate orci penatibus diam augue massa interdum.",
    timestamp: "10 mins ago",
  },
  {
    id: "2",
    phoneNumber: "0966 243 567 892",
    message:
      "Lorem ipsum dolor sit amet consectetur. Ut amet odio fames purus. Morbi pharetra scelerisque vitae ultrices eget vestibulum phasellus molestie lectus. Aliquet condimentum egestas suspendisse lorem orci venenatis senectus in aliquet. Consectetur sagittis tortor vulputate orci penatibus diam augue massa interdum.",
    timestamp: "10 mins ago",
  },
];
const Feedback = () => {
  return (
    <div className="min-h-screen p-6">
      <h2 className="text-3xl  text-primary-color font-semibold  mb-6">
        Customer Feedback
      </h2>
      <div className="space-y-4">
        {feedbacks.map((feedback) => (
          <div key={feedback.id} className="bg-navbgprimary rounded-lg p-4">
            <div className="flex items-start gap-3">
              <img
                src="https://randomuser.me/api/portraits/women/1.jpg"
                alt="user"
                className="h-8 w-8 rounded-full object-cover"
              />

              <div className="flex-1">
                <p className="text-gray-200 mb-2">{feedback.phoneNumber}</p>
                <p className="text-gray-300 text-sm mb-3">{feedback.message}</p>
                <p className="text-gray-400 text-xs">{feedback.timestamp}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Feedback;
