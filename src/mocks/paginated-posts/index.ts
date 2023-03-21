import { posts } from '../posts';

export const mockPagedData = {
  data: posts.slice(0, 10),
  hasPagination: true,
  page: 1,
  pageSize: 10,
  totalPages: Math.ceil(posts.length / 10),
  totalDocuments: posts.length,
};
