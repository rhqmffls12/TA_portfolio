# TA Portfolio Reel

A buildless HTML/CSS/JavaScript portfolio concept. Each project occupies one viewport; its muted video starts automatically when the project enters view, then the page advances when playback ends. Visitors can enable sound or move between projects with the on-screen arrows and keyboard.

## Add your work

1. Put optimized `.mp4` or `.webm` files in `media/` (or upload them to your video CDN/object storage).
2. Edit `projects.js`: update the title, year, role, tools, description, and `video` path for each project. Projects are shown from newest year to oldest within each discipline. Add optional `toolLogos` entries (`name` and `src`) to show subtle tool marks from `assets/tools/`. Local video paths can look like `./media/my-reel.mp4`; use a CDN URL if the videos are hosted separately.
3. Set `poster` to a representative image path or URL for the loading state.
4. Replace the sample email address and initials in `index.html`.

The included video URLs are public sample clips for preview only and are labeled as concept reels. They are not portfolio work. Browser autoplay requires muted playback; viewers can turn sound on with the sound control.

## Preview and deploy with GitHub Pages

Open `index.html` from a local static server (for example, `npx serve .`). To publish this repository, open **Settings → Pages** on GitHub, select **Deploy from a branch**, choose `main` and `/(root)`, then save. The project site URL is `https://rhqmffls12.github.io/TA_portfolio/`.

For a small demo, optimized MP4 files can live in `media/` and use relative paths such as `./media/my-reel.mp4`. GitHub blocks individual regular Git files larger than 100 MiB, and GitHub Pages has a 1 GB published-site limit and a 100 GB/month soft bandwidth limit. Keep the repository small; move larger or popular videos to object storage or a video CDN. See the [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).

## Test video

The first project uses `media/dednet.mp4` as a GitHub-hosted test clip. Replace this file or change the `video` path in `projects.js` when adding the final reel. Keep individual files below GitHub's 100 MiB limit; this test clip is about 10 MB.

## Video overlay

Project video color is kept close to the source. The `.video-shade` overlay in `styles.css` uses a diagonal dark gradient that is masked to fade completely to transparent at exactly two-thirds of the frame, leaving the rightmost third untouched. Text remains legible because the strongest shade stays behind the left-side copy. The mobile breakpoint uses a similar gradient.

## Portfolio disciplines

Each entry in `projects.js` has a `discipline` field: `cinematic` for Cinematic Art & Production, or `technical` for Technical Direction. The opening selector and the tabs above the reel filter projects by this field. Set the field when adding a project so it appears in the intended portfolio.


The full-screen discipline picker uses ssets/cinematic-art.png and ssets/technical-direction.png for its hover backgrounds.
