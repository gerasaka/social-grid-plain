import { Post } from './types';

export class PostService {
  private posts: Post[] = [];
  private constructor() {} // Private constructor to prevent instantiation

  static async init() {
    const instance = new PostService();
    await instance.getPosts();
    return instance;
  }

  async getPosts() {
    const res = await fetch('http://jsonplaceholder.typicode.com/posts');
    const data: Post[] = await res.json();
    this.posts = data;
  }

  getAllPosts() {
    return this.posts;
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
