import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createPostItem } from '../../components/post-item';
import { CommentModal } from '../../components/comment-modal';
import { MOCK_POSTS } from '../sample-response/posts';

describe('createPostItem', () => {
  beforeEach(() => {
    const modal = document.createElement('comment-modal') as CommentModal;
    modal.open = vi.fn();
    document.body.appendChild(modal);
  });

  it('should render post data correctly', () => {
    const row = createPostItem(MOCK_POSTS[0]);

    expect(row.querySelector('td')!.textContent).toBe(String(MOCK_POSTS[0].id));
    expect(row.querySelectorAll('td')[1].textContent).toBe(MOCK_POSTS[0].title);
    expect(row.querySelectorAll('td')[2].textContent).toBe(MOCK_POSTS[0].body);
  });

  it('should call commentModal.open when button is clicked', () => {
    const row = createPostItem(MOCK_POSTS[0]);
    const button = row.querySelector('.show-comments') as HTMLButtonElement;
    button.click();

    const modal = document.querySelector('comment-modal') as CommentModal;

    expect(modal.open).toHaveBeenCalledWith(MOCK_POSTS[0].id);
  });

  it('should add highlight class if post.body contains "rerum"', () => {
    const row = createPostItem(MOCK_POSTS[0]);

    expect(row.querySelectorAll('td')[2].textContent).contains('rerum');
    expect(row.classList.contains('bg-yellow-100')).toBe(true);
  });
});
