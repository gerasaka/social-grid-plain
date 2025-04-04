import { getPosts } from './utils/posts';
import { Post } from './utils/posts.dto';

function createPostRow(post: Post) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${post.id}</td>
    <td>${post.title}</td>
    <td>${post.body}</td>
  `;

  return tr;
}

async function renderPosts() {
  const container = document.getElementById('post-container')!;
  container.innerHTML = '';

  const posts = await getPosts();

  if (posts.length === 0) container.innerHTML = '<tr><td colspan="3">No posts available.</td></tr>';
  else {
    posts.forEach((post) => {
      const row = createPostRow(post);
      container.appendChild(row);
    });
  }
}

renderPosts();
