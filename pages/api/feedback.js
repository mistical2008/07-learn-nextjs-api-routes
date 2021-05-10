import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const methods = {
    POST: () => post(req, res),
    GET: () => get(req, res),
  };
  methods[req.method]();
}

function generateDataPath() {
  return path.join(process.cwd(), "data", "feedback.json");
}

function readData(dataPath) {
  const fileData = fs.readFileSync(dataPath);
  return JSON.parse(fileData);
}

function post(req, res) {
  const newFeedback = {
    id: new Date().getTime(),
    email: req.body.email,
    message: req.body.message,
  };

  const dataPath = generateDataPath();
  const data = readData(dataPath);
  data.push(newFeedback);
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  res.status(201).json({
    statusCode: 0,
    data: newFeedback,
    messages: ["Message write success"],
  });
}

function get(req, res) {
  const dataPath = generateDataPath();
  const data = readData(dataPath);
  res.status(200).json({ feedback: data });
}
