export interface GalleryImage {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
  publicId: string;
  tags: string[];
  isFeatured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  width?: number;
  height?: number;
}

export interface GalleryResponse {
  data: GalleryImage[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}