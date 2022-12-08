const data = async function getData() {
  const response = await fetch("../services/mi_challenge.json");
  const data = await response.json();
  showData(data);
  openModal();
};
data();

function showData(arr) {
  const fragment = document.createDocumentFragment();
  const container = document.querySelector(".grid-container");

  arr.map((e) => {
    const article = document.createElement("article");
    article.classList.add("item");
    article.innerHTML = `
      <div class="lds-roller">
         <span></span>
         <span></span>
         <span></span>
         <span></span>
         <span></span>
         <span></span>
         <span></span>
         <span></span>
      </div>

      <img
      src="${e.image}"
      alt="${e.name}"
      class="item__img"
      data-id="${e.id}"
      />
      `;
    fragment.appendChild(article);
  });
  container.appendChild(fragment);
}

function openModal() {
  const modal = document.querySelector(".modal");
  const allImages = document.querySelectorAll(".item__img");
  const closeModal = document.querySelector(".modal__close");
  const iframeContainer = document.querySelector(".iframe-container");

  allImages.forEach((e) => {
    e.addEventListener("click", () => {
      modal.classList.add("modal-active");
      showIframe(e, iframeContainer);
    });
  });
  closeModal.addEventListener("click", () =>
    modal.classList.remove("modal-active")
  );
  addLoaderImage(allImages);
}

function showIframe(element, modal) {
  let id = element.getAttribute("data-id");
  fetch(`../services/mi_challenge.json`)
    .then((res) => res.json())
    .then((data) => {
      data.map((ele) => {
        if (ele.id === id) {
          console.log(ele.id);
          console.log(ele.id);
          modal.innerHTML = `
            <span class="loader"></span>
            ${ele.iframe}`;
        }
      });

      addLoaderIframe();
    });
}
function addLoaderIframe() {
  const iframe = document.getElementById("challenge");
  const loader = document.querySelector(".loader");
  loader.style.display = "block";
  iframe.style.opacity = "0";
  iframe.addEventListener("load", () => {
    loader.style.display = "none";
    iframe.style.opacity = "1";
  });
}
function addLoaderImage(images) {
  images.forEach((e) => {
    e.addEventListener("load", () => {
      e.previousElementSibling.style.display = "none";
      e.style.display = "block";
    });
  });
}
