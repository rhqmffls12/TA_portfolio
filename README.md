# TA Portfolio Reel

A buildless HTML/CSS/JavaScript portfolio concept. Each project occupies one viewport; its muted video starts automatically when the project enters view, then the page advances when playback ends. Visitors can enable sound or move between projects with the on-screen arrows and keyboard.

## Add your work

1. Put optimized `.mp4` or `.webm` files in `media/` (or upload them to your video CDN/object storage).
2. Edit `projects.js`: update the title, year, role, tools, description, and `video` path for each project. Local paths can look like `./media/my-reel.mp4`; use a CDN URL if the videos are hosted separately.
3. Set `poster` to a representative image path or URL for the loading state.
4. Replace the sample email address and initials in `index.html`.

The included video URLs are public sample clips for preview only and are labeled as concept reels. They are not portfolio work. Browser autoplay requires muted playback; viewers can turn sound on with the sound control.

## Preview and deploy

Open `index.html` from a local static server (for example, `npx serve .`) or upload the site files to any static host. For the Sites deployment, `dist/` is the publish directory and contains a copy of the static site. If your own domain serves large video files, host them on a video CDN or object storage and put those URLs in `projects.js` so media delivery stays fast.
