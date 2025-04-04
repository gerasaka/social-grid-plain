import { Post } from '../utils/posts.dto';
import { CommentModal } from './comment-modal';

export function createPostItem(post: Post): HTMLTableRowElement {
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
    const commentModal = document.querySelector('comment-modal') as CommentModal;
    commentModal.open(post.id);
  });

  if (post.body.includes('rerum')) tr.classList.add('bg-yellow-100');

  return tr;
}
