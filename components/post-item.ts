import { Post } from '../utils/types';
import { CommentModal } from './comment-modal';

export function createPostItem(post: Post): HTMLTableRowElement {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td class="text-center p-2">${post.id}</td>
    <td class="p-2">${post.title}</td>
    <td class="p-2">${post.body}</td>
    <td class="p-2 min-w-max">
      <button class="show-comments text-xs text-white bg-sky-800 px-4 py-2 rounded-md flex gap-2 items-center w-max hover:bg-sky-700 hover:cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 512 512"><path fill="currentColor" d="M475.22 206.52c-10.34-48.65-37.76-92.93-77.22-124.68A227.4 227.4 0 0 0 255.82 32C194.9 32 138 55.47 95.46 98.09C54.35 139.33 31.82 193.78 32 251.37a215.66 215.66 0 0 0 35.65 118.76l4.35 6.05L48 480l114.8-28.56s2.3.77 4 1.42s16.33 6.26 31.85 10.6c12.9 3.6 39.74 9 60.77 9c59.65 0 115.35-23.1 156.83-65.06C457.36 365.77 480 310.42 480 251.49a213.5 213.5 0 0 0-4.78-44.97"/></svg>
        Comments
      </button>
    </td>
  `;

  tr.querySelector('.show-comments')!.addEventListener('click', () => {
    const commentModal = document.querySelector('comment-modal') as CommentModal;
    commentModal.open(post.id);
  });

  if (post.body.includes('rerum')) tr.classList.add('bg-yellow-100');
  else if (post.id % 2 === 0) tr.classList.add('bg-gray-100');
  else tr.classList.add('bg-white');

  return tr;
}
