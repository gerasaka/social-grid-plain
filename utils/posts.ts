import { Comment, Post } from './posts.dto';

export async function getPosts() {}

export async function getPostComments(postId: number) {
  const res = await fetch(`http://jsonplaceholder.typicode.com/posts/${postId}/comments`);
  const data: Comment[] = await res.json();
  return data;
}

export function filterPosts(posts: Post[], query: string) {}

export class PostService {
  private posts: Post[] = [];

  constructor() {
    this.init();
  }

  async init() {
    const res = await fetch('http://jsonplaceholder.typicode.com/posts');
    const data: Post[] = await res.json();
    this.posts = data;

    return data;
  }

  getAllPosts() {
    return this.posts;
  }

  async getPostComments(postId: number) {
    const res = await fetch(`http://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    const data: Comment[] = await res.json();
    return data;
  }

  filterPosts(query: string) {
    return this.posts.filter((p) => {
      const { title, body } = p;
      return title.toLowerCase().includes(query) || body.toLowerCase().includes(query);
    });
  }

  countKeyword(keyword: string) {
    return this.posts.filter((p) => p.body.toLowerCase().includes(keyword)).length;
  }

  countPostsByUser() {
    const userPostCounts = this.posts.reduce((acc, curr) => {
      acc[curr.userId] = (acc[curr.userId] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    return userPostCounts;
  }
}
