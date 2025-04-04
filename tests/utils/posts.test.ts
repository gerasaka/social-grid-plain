import { PostService } from '../../utils/posts';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { MOCK_POSTS } from '../sample-response/posts';

describe('PostService', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(MOCK_POSTS),
    });
  });

  it('should initialize and fetch posts', async () => {
    const service = await PostService.init();

    expect(fetch).toHaveBeenCalledWith('http://jsonplaceholder.typicode.com/posts');
    expect(service.getAllPosts()).toEqual(MOCK_POSTS);
  });

  it('should handle fetch errors gracefully', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Fetch error'));

    const service = await PostService.init();

    expect(service.getAllPosts()).toEqual([]);
  });

  it('should filter posts by query', async () => {
    const KEYWORD = 'rerum';
    const service = await PostService.init();
    const result = service.filterPosts(KEYWORD);

    expect(result[0].body).contains(KEYWORD);
    expect(result[0].title).toBe(MOCK_POSTS[0].title);
    expect(result).toHaveLength(3);
  });

  it('should count posts containing a keyword in body', async () => {
    const KEYWORD = 'rerum';
    const service = await PostService.init();
    const count = service.countKeyword(KEYWORD);

    expect(service.getAllPosts()).toHaveLength(4);
    expect(count).toBe(3);
  });

  it('should count number of posts by each user', async () => {
    const service = await PostService.init();
    const countByUser = service.countPostsByUser();

    expect(countByUser).toEqual({ 1: 4 });
  });
});
