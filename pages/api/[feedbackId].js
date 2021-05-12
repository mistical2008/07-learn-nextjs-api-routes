import { generateDataPath, readData } from "./feedback";

export default function handler(req, res) {
  const methods = {
    GET: () => get(req, res),
  };
  methods[req.method]();
}

function get(req, res) {
  const { feedbackId } = req.query;
  const fileData = readData(generateDataPath());
  const data = fileData.find((feedback) => String(feedback.id) === feedbackId);
  res.status(200).json({ data, statusCode: data ? 0 : 1 });
}
