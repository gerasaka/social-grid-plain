import { getPostComments } from '../utils/comments';

export class CommentModal extends HTMLElement {
  dialog: HTMLDialogElement;

  constructor() {
    super();
    this.dialog = document.createElement('dialog');
  }

  private handleCloseModal = () => {
    this.dialog.close();
  };

  connectedCallback() {
    this.dialog.innerHTML = `
      <h2>Comments</h2>
      <ul id="comments-list"></ul>
      <button id="close-modal">Close</button>
    `;
    this.appendChild(this.dialog);
    const closeButton = this.dialog.querySelector('#close-modal')!;

    closeButton.addEventListener('click', this.handleCloseModal);
  }

  disconnectedCallback() {
    const closeButton = this.dialog.querySelector('#close-modal')!;

    closeButton.removeEventListener('click', this.handleCloseModal);
  }

  async open(postId: number) {
    const comments = await getPostComments(postId);
    const list = this.dialog.querySelector('#comments-list')!;

    list.innerHTML = comments
      .map((c) => `<li><strong>${c.email}:</strong> ${c.body}</li>`)
      .join('');

    this.dialog.showModal();
  }
}

customElements.define('comment-modal', CommentModal);
