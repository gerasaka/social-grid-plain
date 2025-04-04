import { getPosts } from '../utils/posts.js';

const countEl = document.getElementById('keyword-count')!;
const tbody = document.getElementById('user-table')!;

async function generateReport() {
  const posts = await getPosts();

  const rerumCount = posts.filter((post) => post.body.toLowerCase().includes('rerum')).length;
  countEl.textContent = `Total: ${rerumCount} posts`;

  const userMap = new Map();
  posts.forEach(({ userId }) => {
    userMap.set(userId, (userMap.get(userId) || 0) + 1);
  });

  for (const [userId, count] of userMap.entries()) {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${userId}</td><td>${count}</td>`;
    tbody.appendChild(row);
  }
}

const navbar = document.createElement('nav-bar');
document.body.prepend(navbar);

generateReport();
