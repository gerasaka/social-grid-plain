import { PostService } from '../utils/posts.js';

const postService = await PostService.init();
const KEYWORD = 'rerum';

async function init() {
  const keywordContainer = document.getElementById('keyword-count')!;
  const keywordCount = postService.countKeyword(KEYWORD);
  keywordContainer.querySelector('h2')!.textContent = `Posts containing "${KEYWORD}"`;
  keywordContainer.querySelector('p')!.textContent = `Total: ${keywordCount} posts`;

  const userTable = document.getElementById('user-table')!;
  const userMap = postService.countPostsByUser();

  for (const userId in userMap) {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${userId}</td><td>${userMap[userId]}</td>`;
    userTable.appendChild(row);
  }
}

init();
