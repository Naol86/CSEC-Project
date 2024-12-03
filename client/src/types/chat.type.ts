export interface Chat {
  id: string;
  title: string;
  created_at: Date;
}

export interface CategorizedChats {
  today: Chat[];
  yesterday: Chat[];
  lastWeek: Chat[];
  older: Chat[];
}

export interface Message {
  role: string;
  content: string;
}
