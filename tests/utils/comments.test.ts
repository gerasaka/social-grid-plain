import { getPostComments } from '../../utils/comments';
import { vi, describe, it, expect } from 'vitest';
import { MOCK_COMMENTS } from '../sample-response/comments';

describe('getPostComments', () => {
  it('should fetch and return comments for a given postId', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(MOCK_COMMENTS),
    });

    const result = await getPostComments(1);

    expect(fetch).toHaveBeenCalledWith('http://jsonplaceholder.typicode.com/posts/1/comments');
    expect(result).toEqual(MOCK_COMMENTS);
  });

  it('should handle fetch errors gracefully', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Fetch error'));

    const result = await getPostComments(1);

    expect(fetch).toHaveBeenCalledWith('http://jsonplaceholder.typicode.com/posts/1/comments');
    expect(result).toEqual([]);
  });
});
