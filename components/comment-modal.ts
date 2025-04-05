import { getPostComments } from '../utils/comments';
import { Comment } from '../utils/types';

export class CommentModal extends HTMLElement {
  dialog: HTMLDialogElement;

  constructor() {
    super();
    this.dialog = document.createElement('dialog');
  }

  connectedCallback() {
    this.dialog.setAttribute(
      'class',
      'backdrop:bg-[rgb(0,0,0,0.4)] bg-white p-5 my-auto mx-5 md:mx-auto rounded-xl max-w-[500px]'
    );
    this.dialog.innerHTML = `
      <div class="flex flex-col max-h-[calc(100svh-5rem)]">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-bold text-sky-800">Comments</h2>
          <button id="close-modal" class="show-comments text-xs text-white bg-sky-800 px-4 py-2 rounded-md flex gap-2 items-center w-max hover:bg-sky-700 hover:cursor-pointer">Close</button>
        </div>
        <ul id="comments-list" class="my-4 max-h-full flex-1 overflow-y-auto"></ul>
      </div>
    `;
    this.appendChild(this.dialog);

    const closeButton = this.dialog.querySelector('#close-modal')!;
    closeButton.addEventListener('click', this.close);
  }

  disconnectedCallback() {
    const closeButton = this.dialog.querySelector('#close-modal')!;

    closeButton.removeEventListener('click', this.close);
  }

  createCommentItem(comment: Comment) {
    const li = document.createElement('li');
    li.setAttribute('class', 'border-b border-sky-200 py-4');
    li.innerHTML = `
      <p class="font-semibold">${comment.name}</p>
      <p class="text-xs text-gray-400">(${comment.email})</p>
      <p class="mt-2 text-gray-700">${comment.body}</p>
    `;
    return li;
  }

  open = async (postId: number) => {
    const comments = await getPostComments(postId);
    const list = this.dialog.querySelector('#comments-list')!;

    list.innerHTML = '';

    if (comments.length === 0) list.innerHTML = '<li>No comments available.</li>';
    else {
      comments.forEach((comment) => {
        const li = this.createCommentItem(comment);
        list.appendChild(li);
      });
    }

    this.dialog.showModal();
  };

  close = () => {
    this.dialog.close();
  };
}

customElements.define('comment-modal', CommentModal);
