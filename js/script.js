"use strict";

import galleryItems from "./gallery-items.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  lightbox: document.querySelector(".js-lightbox"),
  lightboxImg: document.querySelector(".lightbox__image"),
  lightboxButton: document.querySelector(".lightbox__button")
};

function createGallery(items, parent) {
  const galleryList = items
    .map(({ original, preview, description }) => {
      return `<li class="gallery__item">
    <a
      class="gallery__link"
      href="${original}"
    >
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
  
      <span class="gallery__icon">
        <i class="material-icons">zoom_out_map</i>
      </span>
    </a>
  </li>`;
    })
    .join("");
  parent.insertAdjacentHTML("beforeend", galleryList);
}

createGallery(galleryItems, refs.gallery);

function openModal(e) {
  e.preventDefault();
  refs.lightbox.classList.add("is-open");
  refs.lightboxImg.src = `${e.target.dataset.source}`;
  refs.lightbox.alt = `${e.target.alt}`;
  window.addEventListener("keydown", closeWithEsc);
  window.addEventListener("keydown", navigateGallery);
}

function closeModal({ target }) {
  if (target.nodeName === "IMG") return;
  refs.lightbox.classList.remove("is-open");
  refs.lightboxImg.src = "";
  refs.lightbox.alt = "";
  window.removeEventListener("keydown", closeWithEsc);
  window.removeEventListener("keydown", navigateGallery);
}

function closeWithEsc(e) {
  if (e.key === "Escape") {
    closeModal(e);
  }
}

function navigateGallery(e) {
  let galleryImages = [...document.querySelectorAll(".gallery__image")];
  const galleryImagesSrc = galleryImages.map(e => e.dataset.source);
  let i = galleryImagesSrc.indexOf(refs.lightboxImg.src);
  if (e.key === "ArrowLeft") {
    if (i === 0) {
      return;
    } else {
      refs.lightboxImg.src = `${galleryImagesSrc[i - 1]}`;
    }
  }
  if (e.key === "ArrowRight") {
    if (i === galleryImagesSrc.length - 1) {
      return;
    } else {
      refs.lightboxImg.src = `${galleryImagesSrc[i + 1]}`;
    }
  }
}

refs.gallery.addEventListener("click", openModal);
refs.lightbox.addEventListener("click", closeModal);