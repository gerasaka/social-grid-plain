import { PostService } from '../utils/posts';
import { Post } from '../utils/types';
import '../components/comment-modal';
import { CommentModal } from '../components/comment-modal';
import { createPostItem } from '../components/post-item';

const postService = await PostService.init();

export function renderPosts(posts: Post[]) {
  const container = document.getElementById('post-container')!;
  container.innerHTML = '';

  if (posts.length === 0) container.innerHTML = '<tr><td colspan="4">No posts available.</td></tr>';
  else {
    posts.forEach((post) => {
      const row = createPostItem(post);
      container.appendChild(row);
    });
  }
}

function handleSearch() {
  document.getElementById('search')!.addEventListener('input', (e) => {
    const query = (e.target as HTMLInputElement).value.toLowerCase();
    const filteredPosts = postService.filterPosts(query);

    renderPosts(filteredPosts);
  });
}

export function init() {
  const posts = postService.getAllPosts();

  renderPosts(posts);
  handleSearch();

  const commentModal = document.createElement('comment-modal') as CommentModal;
  document.body.appendChild(commentModal);
}
