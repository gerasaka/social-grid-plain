import { describe, it, beforeEach, vi, expect } from 'vitest';
import { renderKeywordCount, renderUserTable } from '../report/report.js';

const MOCK_KEYWORD = 'rerum';

vi.mock('../utils/posts.js', () => ({
  PostService: {
    init: vi.fn(async () => ({
      countKeyword: vi.fn(() => 3),
    })),
  },
}));

describe('Report page', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="keyword-count">
        <h2></h2>
        <p></p>
      </div>
      <table id="user-table"></table>
    `;
  });

  it('renders keyword count correctly', async () => {
    renderKeywordCount(MOCK_KEYWORD);

    expect(document.querySelector('h2')!.textContent).toContain(MOCK_KEYWORD);
    expect(document.querySelector('p')!.textContent).toContain('Total: 3');
  });

  it('renders user table correctly', async () => {
    renderUserTable({ 1: 4, 2: 2 });

    const rows = document.querySelectorAll('#user-table tr');

    expect(rows.length).toBe(2);
    expect(rows[0].innerHTML).toContain('<td>1</td><td>4</td>');
    expect(rows[1].innerHTML).toContain('<td>2</td><td>2</td>');
  });
});
