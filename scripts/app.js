// Dom Queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');

// Add A New Chat
newChatForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chatroom.addChat(message)
    .then(() => newChatForm.reset())
    .catch(err => console.log(err));
});

// Update The Username
newNameForm.addEventListener('submit', e => {
  e.preventDefault();

  // Update Name Via Chatroom
  const newName = newNameForm.name.value.trim();
  chatroom.updateName(newName);

  // Reset The Form
  newNameForm.reset();
  
  // Show Then Hide The Update Message
  updateMssg.innerText = `Your name was updated to ${newName}`;
  setTimeout(() => updateMssg.innerText = '', 3000);
});

// Update The Chat Room
rooms.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute('id'));
    chatroom.getChats(chat => chatUI.render(chat));
  }
});

// Check Local Storage For Name
const username = localStorage.username ? localStorage.username : 'Anonymous';

// Class Instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('gaming', username);

// Get Chats & Render
chatroom.getChats(data => chatUI.render(data));