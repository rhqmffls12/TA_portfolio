# TA Portfolio Reel

A buildless HTML/CSS/JavaScript portfolio concept. Each project occupies one viewport; its muted video starts automatically when the project enters view, then the page advances when playback ends. Visitors can enable sound or move between projects with the on-screen arrows and keyboard.

## Add your work

1. Put optimized `.mp4` or `.webm` files in `media/` (or upload them to your video CDN/object storage).
2. Edit `projects.js`: update the title, year, role, tools, description, and `video` path for each project. Local paths can look like `./media/my-reel.mp4`; use a CDN URL if the videos are hosted separately.
3. Set `poster` to a representative image path or URL for the loading state.
4. Replace the sample email address and initials in `index.html`.

The included video URLs are public sample clips for preview only and are labeled as concept reels. They are not portfolio work. Browser autoplay requires muted playback; viewers can turn sound on with the sound control.

## Preview and deploy with GitHub Pages

Open `index.html` from a local static server (for example, `npx serve .`). To publish this repository, open **Settings → Pages** on GitHub, select **Deploy from a branch**, choose `main` and `/(root)`, then save. The project site URL is `https://rhqmffls12.github.io/TA_portfolio/`.

For a small demo, optimized MP4 files can live in `media/` and use relative paths such as `./media/my-reel.mp4`. GitHub blocks individual regular Git files larger than 100 MiB, and GitHub Pages has a 1 GB published-site limit and a 100 GB/month soft bandwidth limit. Keep the repository small; move larger or popular videos to object storage or a video CDN. See the [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).
