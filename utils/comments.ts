import { Comment } from './types';

export async function getPostComments(postId: number) {
  const res = await fetch(`http://jsonplaceholder.typicode.com/posts/${postId}/comments`);
  const data: Comment[] = await res.json();
  return data;
}
