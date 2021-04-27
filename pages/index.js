import { useRef } from "react";

const Home = () => {
  const emailRef = useRef();
  const messageRef = useRef();

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
    res.json();
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
      </form>
    </div>
  );
};

export default Home;
