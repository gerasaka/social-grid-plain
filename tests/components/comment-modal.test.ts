// __tests__/comment-modal.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CommentModal } from '../../components/comment-modal';
import { getPostComments } from '../../utils/comments';
import { MOCK_COMMENTS } from '../sample-response/comments';

vi.mock('../utils/comments', () => ({
  getPostComments: vi.fn().mockResolvedValue(MOCK_COMMENTS),
}));

describe('CommentModal', () => {
  let modal: CommentModal;

  beforeEach(() => {
    document.body.innerHTML = '';
    modal = new CommentModal();
    document.body.appendChild(modal);
    modal.connectedCallback();

    modal.dialog.showModal = vi.fn();
    modal.dialog.close = vi.fn();
  });

  it('should render dialog with initial content', () => {
    const dialog = modal.querySelector('dialog') as HTMLDialogElement;

    expect(dialog).toBeTruthy();
    expect(dialog.innerHTML).toContain('<h2>Comments</h2>');
    expect(dialog.querySelector('#close-modal')).toBeTruthy();
  });

  it('should close modal on clicking close button', () => {
    const closeSpy = vi.spyOn(modal.dialog, 'close');
    const closeBtn = modal.querySelector('#close-modal') as HTMLButtonElement;

    closeBtn.click();
    expect(closeSpy).toHaveBeenCalled();
  });

  it('should open modal and render comments', async () => {
    const showModalSpy = vi.spyOn(modal.dialog, 'showModal');

    await modal.open(1);
    const list = modal.querySelector('#comments-list')!;

    expect(list.innerHTML).toContain('Eliseo@gardner.biz');
    expect(list.innerHTML).toContain('Jayne_Kuhic@sydney.com');
    expect(showModalSpy).toHaveBeenCalled();
  });
});
