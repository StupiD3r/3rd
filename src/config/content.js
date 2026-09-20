// ============================================================
//  💌  EDIT ME — every word on the website lives here.
//  Change the text, the wishes, the letter, and the photos.
//  Drop your own image files into the `public/photos/` folder
//  and point `photos[i].src` at them.
// ============================================================

export const content = {
  // ---------- SCENE 1 · Intro ----------
  intro: {
    lineOne: 'For my favorite person...',
    lineTwo: 'I made something for you. \u2661',
    hint: 'tap to continue \u2661',
  },

  // ---------- SCENE 2 · Closed booklet cover ----------
  cover: {
    title: 'For Aly \u2661',
    subtitle: 'Our Little Chapter',
    hint: 'click to open \u2661',
  },

  // ---------- SCENE 3 · The love letter (left page) ----------
  letter: {
    heading: 'A Letter For You',
    salutation: 'Dear Aly,',
    paragraphs: [
      'Happy 3rd monthsary, my love. Three months may sound short to some people, but for me, these three months have already given me so many moments that I want to keep close to my heart.',
      'Every little message, every laugh, every quiet goodnight — they all mean more to me than words can say. You turned ordinary days into something I look forward to, and I never want to take that for granted.',
    ],
    signature: 'Love, Der \u2661',
  },

  // ---------- SCENE 5 · Our Memories (photos) ----------
  photos: [
    { src: '/photos/pic1.jpg', caption: 'our little moments', rot: -3 },
    { src: '/photos/pic2.jfif', caption: 'you & me \u2661', rot: 2.5 },
    { src: '/photos/pic3.jfif', caption: 'memories worth keeping', rot: -2 },
  ],

  memoriesTitle: 'Our Little Moments \u2661',

  // ---------- SCENE 6 · My Wishes For Us ----------
  wishesTitle: 'My Wishes For Us \u2661',
  wishes: [
    'I wish we keep choosing each other.',
    'I wish we keep laughing over the smallest things.',
    'I wish distance never makes us feel far apart.',
    'I wish we make many more memories together.',
    "I wish this isn't just our 3rd monthsary, but one of many.",
  ],

  // ---------- Navigation hints ----------
  nav: {
    turnPage: 'turn the page \u2661',
    closeBook: 'close the book \u2661',
  },

  // ---------- FINAL SCENE ----------
  ending: {
    title: 'HAPPY 3RD MONTHSARY',
    name: 'ALY \u2661',
    sub: 'To many more chapters together.',
    love: 'I love you. \u2661',
    replay: 'replay \u2661',
  },

  // ---------- Optional soft background music ----------
  // Drop an mp3 file into `public/music/` (e.g. melody.mp3).
  // The song only starts after the booklet is opened (a real
  // user click), never automatically, and can be muted with the
  // little note icon in the corner.
  music: {
    src: 'music/melody.mp3', // set to '' to disable music entirely
    volume: 0.16,
    autoplayAfterOpen: true,
  },
}