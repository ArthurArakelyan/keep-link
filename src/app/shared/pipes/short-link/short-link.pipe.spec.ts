import { ShortLinkPipe } from './short-link.pipe';

describe('ShortLinkPipe', () => {
  let shortLinkPipe: ShortLinkPipe;

  beforeEach(() => {
    shortLinkPipe = new ShortLinkPipe();
  });

  it('should make the link shorter', () => {
    const links = [
      'google',
      'google.com',
      'https://google',
      'https://google.com',
      'www.google.com',
      'www.google.com/test',
      'https://www.google.com',
      'https://www.google.com/',
      'https://www.google.com/test',
      'https://www.google.com/test/test?query=1',
    ];
    const shortLinks = [
      'google',
      'google.com',
      'google',
      'google.com',
      'www.google.com',
      'www.google.com',
      'www.google.com',
      'www.google.com',
      'www.google.com',
      'www.google.com',
    ];

    links.forEach((link, index) => {
      expect(shortLinkPipe.transform(link)).toBe(shortLinks[index]);
    });
  });
});
