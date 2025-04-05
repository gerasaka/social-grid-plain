import { describe, it, beforeEach, vi, expect } from 'vitest';
import { renderKeywordCount, renderUserTable } from '../report/report.js';
import { MOCK_POSTS } from './sample-response/posts.js';

const MOCK_KEYWORD = 'rerum';

vi.mock('../utils/posts.js', () => ({
  PostService: {
    init: vi.fn(async () => ({
      countKeyword: vi.fn(() => 3),
      getAllPosts: vi.fn(() => MOCK_POSTS),
      countPostsByUser: vi.fn(() => ({ 1: 4 })),
    })),
  },
}));

describe('Report page', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <section>
        <p id="keyword">"rerum"</p>
        <span id="keyword-count" ></span>    
        <span id="users"></span>
        <span id="posts"></span>
      </section>
      <table id="user-table"></table>
    `;
  });

  it('renders stats correctly', async () => {
    renderKeywordCount(MOCK_KEYWORD);

    expect(document.getElementById('keyword')!.textContent).toContain(MOCK_KEYWORD);
    expect(document.getElementById('keyword-count')!.textContent).toContain('3');
    expect(document.getElementById('users')!.textContent).toContain('1');
    expect(document.getElementById('posts')!.textContent).toContain(`${MOCK_POSTS.length}`);
  });

  it('renders user table correctly', async () => {
    renderUserTable({ 1: 4, 2: 2 });

    const rows = document.querySelectorAll('#user-table tr');

    expect(rows.length).toBe(2);
    expect(rows[0].innerHTML).contain('1').and.contain('4');
    expect(rows[1].innerHTML).contain('2').and.contain('2');
  });
});
