import handler from '../api/chat.js';

const req = {
  method: 'POST',
  body: { messages: [{ role: 'user', content: 'how do i know he has the right experience' }] }
};

const res = {
  status(code) {
    this.statusCode = code;
    return this;
  },
  json(data) {
    console.log(`Status: ${this.statusCode}`);
    console.log(data);
  }
};

handler(req, res).catch(console.error);
