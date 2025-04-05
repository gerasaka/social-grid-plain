import { PostService } from '../utils/posts.js';

const postService = await PostService.init();
const KEYWORD = 'rerum';

export function renderKeywordCount(keyword: string) {
  const keywordCount = postService.countKeyword(keyword);

  const keywordEl = document.getElementById('keyword')!;
  const keywordCountEl = document.getElementById('keyword-count')!;
  const usersEl = document.getElementById('users')!;
  const postsEl = document.getElementById('posts')!;

  keywordEl.textContent = keyword;
  keywordCountEl.textContent = `${keywordCount}`;
  usersEl.textContent = `${Object.keys(postService.countPostsByUser()).length}`;
  postsEl.textContent = `${postService.getAllPosts().length}`;
}

export function renderUserTable(userMap: Record<string, number>) {
  const userTable = document.getElementById('user-table')!;
  userTable.innerHTML = '';

  for (const userId in userMap) {
    const row = document.createElement('tr');
    row.innerHTML = `<td class="text-center">${userId}</td><td class="text-center">${userMap[userId]}</td>`;

    if (Number(userId) % 2 === 0) row.classList.add('bg-gray-100');

    userTable.appendChild(row);
  }
}

export async function init() {
  const userMap = postService.countPostsByUser();

  renderKeywordCount(KEYWORD);
  renderUserTable(userMap);
}
