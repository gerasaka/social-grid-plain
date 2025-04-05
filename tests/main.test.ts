import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MOCK_POSTS } from './sample-response/posts';
import { renderPosts } from '../main';

vi.mock('../utils/posts', () => ({
  PostService: {
    init: vi.fn(async () => ({
      getAllPosts: vi.fn(() => MOCK_POSTS),
      filterPosts: vi.fn((query: string) =>
        MOCK_POSTS.filter((p) => p.title.includes(query) || p.body.includes(query))
      ),
    })),
  },
}));

describe('Post page', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <table><tbody id="post-container"></tbody></table>
      <input id="search" />
    `;
  });

  it('renders posts correctly', () => {
    renderPosts(MOCK_POSTS);

    const rows = document.querySelectorAll('#post-container tr');

    expect(rows.length).toBe(4);
    expect(rows[0].innerHTML).toContain(MOCK_POSTS[0].title);
    expect(rows[1].innerHTML).toContain(MOCK_POSTS[1].title);
  });

  it('renders "No posts available" when list is empty', () => {
    renderPosts([]);
    expect(document.querySelector('#post-container')!.innerHTML).toContain('No posts available.');
  });
});
