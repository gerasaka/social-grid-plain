import { getPosts } from './utils/posts';
import { Post } from './utils/posts.dto';
import './components/comment-modal';
import { CommentModal } from './components/comment-modal';

let allPosts: Post[] = [];

function createPostRow(post: Post) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${post.id}</td>
    <td>${post.title}</td>
    <td>${post.body}</td>
    <td>
      <button class="show-comments">Show Comments</button>
    </td>
  `;

  tr.querySelector('.show-comments')!.addEventListener('click', () => {
    commentModal.open(post.id);
  });

  if (post.body.includes('rerum')) tr.classList.add('bg-yellow-100');

  return tr;
}

async function renderPosts(posts: Post[]) {
  const container = document.getElementById('post-container')!;
  container.innerHTML = '';

  if (posts.length === 0) container.innerHTML = '<tr><td colspan="4">No posts available.</td></tr>';
  else {
    posts.forEach((post) => {
      const row = createPostRow(post);
      container.appendChild(row);
    });
  }
}

async function init() {
  try {
    allPosts = await getPosts();
    renderPosts(allPosts);
  } catch (err) {
    console.error(err);
  }
}

document.getElementById('search')!.addEventListener('input', (e) => {
  const query = (e.target as HTMLInputElement).value.toLowerCase();
  const filteredPosts = allPosts.filter((post) => {
    const { title, body } = post;
    return title.toLowerCase().includes(query) || body.toLowerCase().includes(query);
  });
  renderPosts(filteredPosts);
});

const commentModal = document.createElement('comment-modal') as CommentModal;
document.body.appendChild(commentModal);

init();
