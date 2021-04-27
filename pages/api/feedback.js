import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const methods = {
    POST: () => post(req, res),
  };

  methods[req.method]();
}

function post(req, res) {
  const newFeedback = {
    id: new Date().getTime(),
    email: req.body.email,
    message: req.body.message,
  };

  const dataPath = path.join(process.cwd(), "data", "feedback.json");
  const fileData = fs.readFileSync(dataPath);
  const data = JSON.parse(fileData);
  data.push(newFeedback);
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  res.status(201).json({
    statusCode: 0,
    data: newFeedback,
    messages: ["Message write success"],
  });
}
