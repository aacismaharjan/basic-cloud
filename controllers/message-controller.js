let messages = [];

export const storeMessage = (req, res) => {
  const { message } = req.body;
  messages.push(message);
  console.log(`Message stored: ${message}`);
  res.json({ status: 'Message stored', message });
};

export const getMessages = (req, res) => {
  res.json({ messages });
};
