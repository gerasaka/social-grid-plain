import { Post } from './posts.dto';

export async function getPosts() {
  const response = await fetch('http://jsonplaceholder.typicode.com/posts');
  const data: Post[] = await response.json();
  return data;
}
