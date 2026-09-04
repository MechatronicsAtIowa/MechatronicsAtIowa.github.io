# Mechatronics at Iowa

The public website for Mechatronics at Iowa, a University of Iowa student organization building toward RoboMaster competition.

Live site: [MechatronicsAtIowa.github.io](https://MechatronicsAtIowa.github.io)

## Project Structure

- `index.html` - Homepage, team introduction, build disciplines, field collage, and sponsor contact.
- `competition.html` - RoboMaster competition overview, robot roles, field references, and field viewer.
- `styles.css` - Shared layout, typography, responsive behavior, and homepage styling.
- `competition.css` - Competition page styling and responsive overrides.
- `script.js` - Header behavior, mobile menu, scroll state, and expandable build disciplines.
- `Content/` - Field, CAD, and competition images plus STEP reference files.
- `Logos/` - Mechatronics at Iowa logo assets.

This is a static site. It has no build step or package dependencies.

## Preview Locally

Run a local server from the repository root so image paths and browser behavior match deployment:

```powershell
py -m http.server 8000
```

Open [localhost:8000](http://localhost:8000/) in a browser. Opening the HTML files directly also works for most content, but a local server is recommended.

## Deploy With GitHub Pages

This repository is configured as a project site for `Ayarfox/MechAtIowa`.

1. Push changes to the `main` branch.
2. In GitHub, open **Settings > Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select `main` and `/ (root)`, then choose **Save**.
5. Visit `https://ayarfox.github.io/MechAtIowa/` after GitHub finishes publishing.

The site uses relative paths, so it works from the repository subpath. The `.nojekyll` file tells GitHub Pages to serve the files as a plain static site.

## Making Changes

Edit the HTML for copy and links, CSS for layout and visual changes, and `script.js` for interaction behavior. Keep asset filenames and folder capitalization unchanged because GitHub Pages serves files on a case-sensitive system.

The join and sponsor links currently use `mechatronics@uiowa.edu`. Update that address when the organization has a confirmed inbox.
