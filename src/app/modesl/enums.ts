export enum alignsTexts {
  left = 'left',
  right = 'right',
}

export enum messageDirections {
  inc = 'INCOMING',
  out = 'OUTGOING',
  bot = 'BOT',
}

export enum WebSocketEventType {
  OPEN = 'open_chat',
  DLETE = 'delete_all_chats',
  SEND = 'send_message',
  ERROR = 'error',
  LIST = 'chat_list',
}
