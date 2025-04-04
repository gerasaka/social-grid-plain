import { filterPosts, getPosts } from './utils/posts';
import { Post } from './utils/posts.dto';
import './components/comment-modal';
import { CommentModal } from './components/comment-modal';
import { createPostItem } from './components/post-item';

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

function handleSearch(posts: Post[]) {
  document.getElementById('search')!.addEventListener('input', (e) => {
    const query = (e.target as HTMLInputElement).value.toLowerCase();
    const filteredPosts = filterPosts(posts, query);

    renderPosts(filteredPosts);
  });
}

async function init() {
  const posts = await getPosts();

  renderPosts(posts);
  handleSearch(posts);

  const commentModal = document.createElement('comment-modal') as CommentModal;
  document.body.appendChild(commentModal);
}

init();
