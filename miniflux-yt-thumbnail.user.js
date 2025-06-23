// ==UserScript==
// @name        Miniflux YT Thumbnail
// @namespace   miniflux-yt-thumbnail-user
// @grant       none
// @inject-into content
// @version     1.0.2
// @encoding    utf-8
// @author      sentriz, mateusjdev
// @icon        https://raw.githubusercontent.com/miniflux/logo/master/icon.svg
// @description User script for youtube feed thumbnails in miniflux
// @updateURL   https://github.com/mateusjdev/miniflux-youtube-thumbnails/raw/master/miniflux-yt-thumbnail.user.js
// @run-at      document-end
// ==/UserScript==

// Before using this script, change '@match' inside scripts settings or UserScript variables to the url of your miniflux instance,
// if you use chose to do it in the code itself, on every update applied theses values need to be changed again.
// Example:
// @match       http*://*.miniflux.example.com/*
// @match       http*://192.168.1.80:8080/*

const makeThumbURL = (videoID) => `https://img.youtube.com/vi/${videoID}/mqdefault.jpg`;
const makeThumb = (src) => {
  const img = document.createElement("img");
  img.src = src;
  img.style.float = "right";
  img.style.height = "80px";
  img.style.marginLeft = "5px";
  return img;
};

const findVideoIDExpr = /(?:watch\?v=|shorts\/)([0-9a-zA-Z-_]+)/;
const findVideoID = (url) => url.match(findVideoIDExpr)?.[1];
const findVideoURL = (elm) =>
  elm.querySelector(".item-meta > .item-meta-icons a[target=_blank]")?.href;

const attachThumbs = () => {
  const items = document.querySelectorAll("main .items article");
  if (!items?.length) return;

  for (const item of items) {
    const url = findVideoURL(item);
    if (!url) continue;
    const id = findVideoID(url);
    if (!id) continue;

    const thumbURL = makeThumbURL(id);
    const thumb = makeThumb(thumbURL);
    item.prepend(thumb);
  }
};

const tryAttach = setInterval(() => {
  if (document.readyState !== "complete") return;

  attachThumbs();
  clearInterval(tryAttach);
}, 10);
