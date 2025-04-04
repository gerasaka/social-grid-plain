import { Comment, Post } from './posts.dto';

export async function getPosts() {
  const res = await fetch('http://jsonplaceholder.typicode.com/posts');
  const data: Post[] = await res.json();
  return data;
}

export async function getPostComments(postId: number) {
  const res = await fetch(`http://jsonplaceholder.typicode.com/posts/${postId}/comments`);
  const data: Comment[] = await res.json();
  return data;
}

export function filterPosts(posts: Post[], query: string) {
  return posts.filter((p) => {
    const { title, body } = p;
    return title.toLowerCase().includes(query) || body.toLowerCase().includes(query);
  });
}
