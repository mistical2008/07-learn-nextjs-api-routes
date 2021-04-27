import { useRef, useState } from "react";

const Home = () => {
  const emailRef = useRef();
  const messageRef = useRef();
  const [debugData, setDebugData] = useState("");

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
        {debugData && (
          <>
            <h2>Debug data</h2>
            <pre>{debugData}</pre>
          </>
        )}
        <button>Send message</button>
      </form>
    </div>
  );
};

export default Home;
