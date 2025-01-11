export interface StreamingQueryType {
  title: string;
  is_active: boolean;
  tags: string[];
  thumbnail: string | null;
  category: string;
}

export interface StreamingMutateType {
  title: string;
  tags: string[];
  thumbnail: File | string | null;
  category: string;
}
