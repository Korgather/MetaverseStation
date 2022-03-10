export interface reply {
  content: string;
  user_id?: string;
  created_at: string;
}

export interface IComment {
  created_at: string;
  content: string;
  user_id?: string;
  replies?: reply[];
}
