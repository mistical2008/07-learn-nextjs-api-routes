import { generateDataPath, readData } from "../api/feedback";

function FeedbackPage(props) {
  // console.log(props);
  const { feedbackItems } = props;
  return (
    <ul>
      {feedbackItems.map((item) => (
        <li key={item.id}>
          <b>{item.email}: </b>
          {item.message}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const dataPath = generateDataPath();
  const data = readData(dataPath);

  return {
    props: {
      feedbackItems: data,
    },
  };
}

export default FeedbackPage;
