import { getPostComments, getPosts } from './utils/posts';
import { Post } from './utils/posts.dto';

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
    showComments(post.id);
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

init();

const dialog = document.getElementById('comment-modal') as HTMLDialogElement;
const commentList = document.getElementById('comment-list')!;
const closeDialog = document.getElementById('close-modal')!;

async function showComments(postId: number) {
  const comments = await getPostComments(postId);
  commentList.innerHTML = comments
    .map((c) => `<li><strong>${c.email}:</strong> ${c.body}</li>`)
    .join('');
  dialog.showModal();
}

closeDialog.addEventListener('click', () => dialog.close());
