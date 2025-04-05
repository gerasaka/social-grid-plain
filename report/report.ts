import { PostService } from '../utils/posts.js';

const postService = await PostService.init();
const KEYWORD = 'rerum';

export function renderKeywordCount(keyword: string) {
  const keywordContainer = document.getElementById('keyword-count')!;
  const keywordCount = postService.countKeyword(keyword);
  keywordContainer.querySelector('h2')!.textContent = `Posts containing "${keyword}"`;
  keywordContainer.querySelector('p')!.textContent = `Total: ${keywordCount} posts`;
}

export function renderUserTable(userMap: Record<string, number>) {
  const userTable = document.getElementById('user-table')!;
  userTable.innerHTML = '';

  for (const userId in userMap) {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${userId}</td><td>${userMap[userId]}</td>`;
    userTable.appendChild(row);
  }
}
export async function init() {
  const userMap = postService.countPostsByUser();

  renderKeywordCount(KEYWORD);
  renderUserTable(userMap);
}

window.addEventListener('DOMContentLoaded', () => {
  init();
});
