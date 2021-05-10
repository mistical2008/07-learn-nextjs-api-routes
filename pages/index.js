import { useRef, useState } from "react";

const Home = () => {
  const emailRef = useRef();
  const messageRef = useRef();
  const [debugData, setDebugData] = useState("");
  const [feedbackItems, setFeedbackItems] = useState([]);

  const submitHandler = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const message = messageRef.current.value;

    const res = await fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({ email, message }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await res.json();
    setDebugData(JSON.stringify(data, null, 2));
  };

  const loadData = async () => {
    const res = await fetch("/api/feedback", { method: "GET" });
    const data = await res.json();
    console.log("Feddback from responce:", data.feedback);
    setFeedbackItems(data.feedback);
    console.log("Feddback items:", feedbackItems);
  };

  return (
    <div>
      <h1>This is home page :)</h1>
      <form onSubmit={submitHandler}>
        <p>
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" name="email" ref={emailRef} />
        </p>
        <p>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            cols="30"
            rows="10"
            defaultValue="Type your text..."
            ref={messageRef}
          />
        </p>
        <button>Send message</button>
        <hr />
      </form>
      {debugData && (
        <>
          <h1>Debug data:</h1>
          <pre>{debugData}</pre>
        </>
      )}
      <button onClick={() => loadData()}>Load feedback</button>
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>
            <b>{item.email}: </b>
            {item.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
