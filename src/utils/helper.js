export const getRandomMessage = () => {
  const names = ["Tiya", "Arul", "John", "Emily", "Alex", "Sophia"];
  const messages = [
    "Hello world",
    "How are you?",
    "Good morning!",
    "Nice to meet you!",
    "What's up?",
    "Have a great day!",
  ];

  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return { name: randomName, text: randomMessage };
};
