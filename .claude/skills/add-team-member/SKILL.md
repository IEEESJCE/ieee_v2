---
name: add-team-member
description: Add or update a member of the current IEEE-SJCE team on the Team page, including their photo. Use when asked to add, replace, or edit a team member's name, post, photo, LinkedIn, or email.
disable-model-invocation: true
---

Add or update a team member: $ARGUMENTS

Ask for anything missing: name, post, division, photo file location, LinkedIn URL, email.

1. **Where the data lives**: the current team is in `src/pages/TeamPage.jsx`, in per-division arrays (`CURRENT_EXECUTIVE_COMMITTEE`, `MEMBERSHIP_DEVELOPMENT_COMMITTEE`, `ELECTRON_DEVICES_SOCIETY`, `ROBOTICS_AND_AUTOMATION_SOCIETY`, `SIGNAL_PROCESSING_SOCIETY`, `AEROSPACE_AND_ELECTRONIC_SYSTEMS_SOCIETY`, `WOMEN_IN_ENGINEERING`, `EDITORIAL_BOARD`, `WEB_DEVELOPMENT_BOARD`). Do **not** edit `current_team_photo` in `src/components/team_photo.js` — that's the archived 2025-26 roster.

2. **Photo**: copy it into `public/photos/members26-27/`. Prefer a name like `First_Last.jpg` (no spaces, lowercase extension). The `src` must match the filename's case exactly — Vercel is case-sensitive even though Windows isn't.

3. **Entry**: match the shape of neighboring entries in that array:
   ```js
   {
     name: "First Last",
     post: "Post Title",
     type: "<division_key>",          // omit in CURRENT_EXECUTIVE_COMMITTEE (added automatically)
     src: "/photos/members26-27/First_Last.jpg",
     linkedin: "https://www.linkedin.com/in/...",
     gmail: "...@gmail.com",
   },
   ```
   If the face is off-center or too small, add an `imageStyle` with `transform`/`transformOrigin` like existing entries do, and explain what the values do.

4. **Check**: `git ls-files --others public/photos/members26-27` should list the new photo (remind me to commit it), then run `npm run build`. Tell me to look at `/team` in the browser.
