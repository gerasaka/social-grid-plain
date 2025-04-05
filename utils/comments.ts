import { Comment } from './types';

export async function getPostComments(postId: number) {
  try {
    const res = await fetch(`http://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    const data: Comment[] = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
}
