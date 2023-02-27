(function () {
  MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

  let buttonClose = document.querySelector("#close-aside");
  let page = document.querySelector("#page");
  let buttonOpenMenu = document.querySelector("#mobile-menu");
  let modal = document.querySelector("#modal-from");
  let aside = document.querySelector("#form-aside");

  let openModal = function () {
    modal.classList.remove("aside-right", "aside-top", "aside-menu");
    modal.classList.add("open");
    page.classList.add("active");
    document.body.classList.add("fix");
  };

  let closeModal = function () {
    modal.classList.remove("open");
    page.classList.remove("active");
    document.body.classList.remove("fix");

    if (aside) {
      aside.classList.add("hide");
    }
  };

  let openFormRegistration = function () {
    openModal();
    modal.classList.add("aside-right");
    aside.classList.remove("hide");
  };

  let openMenu = function () {
    openModal();
    modal.classList.add("aside-right", "aside-menu");
    aside.classList.remove("hide");
  };

  if (document.querySelectorAll(".open-registration")) {
    let buttonOpen = document.querySelectorAll(".open-registration");

    for (let btn of buttonOpen) {
      btn.addEventListener("click", openFormRegistration);
    }
  }

  if (document.querySelector("#input-link")) {
    let buttonRecover = document.querySelector("#input-link");

    buttonRecover.addEventListener("click", function () {
      openModal();
      modal.classList.add("aside-top");
      aside.classList.remove("hide");
    });
  }

  let openFormInvite = function () {
    let invite = document.querySelector("#form-invite");
    let close = document.querySelector(".form-invite__close");

    aside.classList.add("hide");
    openModal();
    invite.classList.remove("hide");

    close.addEventListener("click", function () {
      invite.classList.add("hide");
      closeModal();
    });
  };

  if (document.querySelector(".button-share")) {
    document
      .querySelector(".button-share")
      .addEventListener("click", openFormInvite);
  }

  let changeParent = function () {
    let menu = document.querySelector("#header-menu");

    if (
      window.innerWidth <= 860 &&
      menu.parentElement.classList.contains("header")
    ) {
      aside.appendChild(menu);
    } else {
      if (
        window.innerWidth > 860 &&
        menu.parentElement.classList.contains("aside-form")
      ) {
        document
          .querySelector("header")
          .insertBefore(menu, document.querySelector("#header-button"));
        if (modal.classList.contains("aside-menu")) {
          closeModal();
        }
      }
    }

    if (document.querySelector(".login")) {
      let login = document.querySelector(".login");
      if (
        window.innerWidth <= 600 &&
        login.parentElement.classList.contains("header-buttons")
      ) {
        aside.appendChild(login);
      } else {
        if (
          window.innerWidth > 600 &&
          login.parentElement.classList.contains("aside-form")
        ) {
          document
            .querySelector("#header-button")
            .insertBefore(login, document.querySelector("#mobile-menu"));
        }
      }
    }
  };

  if (buttonClose) {
    buttonClose.addEventListener("click", closeModal);
  }

  window.addEventListener("resize", changeParent);
  window.addEventListener("DOMContentLoaded", changeParent);
  buttonOpenMenu.addEventListener("click", openMenu);

  let checkMenuContent = (menu, blocks) => {
    let items = menu.children;

    for (let i = 0; i < items.length; i++) {
      items[i].addEventListener("click", function () {
        if (!items[i].classList.contains("current")) {
          let x = 0;
          while (x < items.length) {
            items[x].classList.remove("current");

            if (blocks[x]) {
              blocks[x].classList.remove("current");
            }

            x++;
          }

          items[i].classList.add("current");

          if (blocks[i]) {
            blocks[i].classList.add("current");
          }
        }
      });
    }
  };

  let cemeteryPhotoLength = function () {
    let photos = document.querySelectorAll(".cemetery-photo__item");
    let viewPhotosLength = 5;

    let hidePhoto = function () {
      for (let i = 3; i < photos.length; i++) {
        photos[i].classList.remove("hide");
      }

      for (let i = viewPhotosLength; i < photos.length; i++) {
        photos[i].classList.add("hide");
      }

      if (document.querySelector(".photo-hide")) {
        document.querySelector(".photo-hide").remove();
      }

      let div = document.createElement("div");
      div.className = "photo-hide";
      div.innerHTML = `Смотреть еще ${photos.length - viewPhotosLength} фото`;
      photos[viewPhotosLength - 1].querySelector(".gallery").append(div);
    };

    let changeNumber = function () {
      if (innerWidth >= 980) {
        viewPhotosLength = 5;
      } else {
        if (innerWidth < 980 && innerWidth >= 600) {
          viewPhotosLength = 4;
        } else {
          viewPhotosLength = 3;
        }
      }

      hidePhoto();
    };

    window.addEventListener("resize", changeNumber);
    window.addEventListener("load", changeNumber);
  };

  let openVerticalMenu = (menu) => {
    let mobileMenuCemetery = () => {
      menu.classList.toggle("open");
    };

    let checkEvent = () => {
      if (innerWidth <= 480) {
        menu.addEventListener("click", mobileMenuCemetery);
      } else {
        menu.removeEventListener("click", mobileMenuCemetery);
      }
    };

    window.addEventListener("resize", checkEvent);
    window.addEventListener("load", checkEvent);
  };

  if (document.querySelector(".cemetery-menu")) {
    let cemeteryMenu = document.querySelector(".cemetery-menu");
    let items = document.querySelectorAll(".cemetery-content__item");

    checkMenuContent(cemeteryMenu, items);
    openVerticalMenu(cemeteryMenu);
    cemeteryPhotoLength();
  }

  let communityPhotoLength = () => {
    let photos = document.querySelectorAll(".community-photo__item");
    let viewPhotosLength = 5;

    let hidePhoto = function () {
      for (let i = 3; i < photos.length; i++) {
        photos[i].classList.remove("hide");
      }

      for (let i = viewPhotosLength; i < photos.length; i++) {
        photos[i].classList.add("hide");
      }

      if (!document.querySelector(".photo-hide")) {
        let div = document.createElement("div");
        div.className = "photo-hide";
        div.innerHTML = `Смотреть еще ${photos.length - viewPhotosLength} фото`;
        photos[viewPhotosLength - 1].append(div);

        if (document.querySelector(".last-item")) {
          document.querySelector(".last-item").classList.remove("last-item");
        }
        photos[viewPhotosLength - 1].classList.add("last-item");
      }
    };

    let changeNumber = function () {
      if (window.innerWidth > 1280) {
        viewPhotosLength = 5;
      } else {
        if (window.innerWidth <= 1280 && window.innerWidth >= 1120) {
          viewPhotosLength = 4;
        } else {
          if (window.innerWidth <= 768 && window.innerWidth >= 600) {
            viewPhotosLength = 5;
          }
        }
      }
      hidePhoto();
    };

    window.addEventListener("resize", changeNumber);
    window.addEventListener("load", changeNumber);
  };

  if (document.querySelector(".community-photo")) {
    let menuCommunity = document.querySelector(".community-nav");
    let items = document.querySelectorAll(".community-tab");

    checkMenuContent(menuCommunity, items);
    communityPhotoLength();
    openVerticalMenu(menuCommunity);
  }

  // FUNCTION UNWRAP RESULT SEARCH
  if (document.querySelector(".map-results")) {
    let buttonUnwrap = document.querySelector(".map-results__unwrap");

    let mapResultsUnwrap = function () {
      let listResult = document.querySelector(".map-results");
      listResult.classList.toggle("unwrap");
    };

    buttonUnwrap.addEventListener("click", mapResultsUnwrap);
  }

  //VALIDATION FORM
  function validation(items) {
    let inputStatusValidate = [];

    // validation form
    for (let i = 0; i < items.length; i++) {
      if (items[i].value === "") {
        if (!items[i].parentElement.classList.contains("no-valid")) {
          items[i].parentElement.classList.add("no-valid");
          items[i].parentElement.insertAdjacentHTML(
            "afterend",
            '<span class="is-invalid">Это обязательное поле</span>'
          );
        }

        inputStatusValidate.push(false);
      } else {
        items[i].classList.remove("no-valid");
        inputStatusValidate.push(true);
        if (items[i].parentElement.classList.contains("no-valid")) {
          items[i].parentElement.nextElementSibling.remove();
          items[i].parentElement.classList.remove("no-valid");
        }
      }
    }

    // true = canceled sending
    if (inputStatusValidate.includes(false)) {
      return false;
    }
  }

  //INIT FANCYBOX
  if (document.querySelector(".gallery")) {
    Fancybox.bind(".gallery", {
      groupAll: false, // Group all items
      Toolbar: {
        display: [
          { id: "prev", position: "center" },
          { id: "counter", position: "center" },
          { id: "next", position: "center" },
          "zoom",
          "slideshow",
          "fullscreen",
          "close",
        ],
      },
    });
  }

  if (document.querySelector("#login-form")) {
    document
      .querySelector("#login-form")
      .addEventListener("submit", function (event) {
        event.preventDefault();

        let inputs = this.querySelectorAll(".input-text");

        validation(inputs);

        if (validation(inputs) === false) {
          return false;
        }
      });
  }

  if (document.querySelector("#form-registration")) {
    document
      .querySelector("#form-registration")
      .addEventListener("submit", function (event) {
        event.preventDefault();

        let inputs = this.querySelectorAll(".input-text");

        validation(inputs);

        if (validation(inputs) === false) {
          return false;
        }
      });
  }

  //CHANGE USER AVATAR
  let showFile = function () {
    let inputImage = document.querySelector(".input-avatar");
    let preview = document.querySelector(".preview-avatar-wrap");
    let file = inputImage.files[0];

    var img = document.createElement("img");
    img.classList.add("bg-img");
    img.file = file;
    preview.append(img);

    let reader = new FileReader();
    reader.onload = (function (aImg) {
      return function (e) {
        aImg.src = e.target.result;
      };
    })(img);

    reader.readAsDataURL(file);

    document.querySelector(".delete-avatar").classList.remove("hide");
  };

  if (document.querySelector(".input-avatar")) {
    document
      .querySelector(".input-avatar")
      .addEventListener("change", showFile);

    //DELETE USER AVATAR
    let btnDelete = document.querySelector(".delete-avatar");
    btnDelete.addEventListener("click", function () {
      document.querySelector(".preview-avatar-wrap .bg-img").remove();
      btnDelete.classList.add("hide");

      if (document.querySelector(".user-current-avatar .bg-img")) {
        document.querySelector(".user-current-avatar .bg-img").remove();
      }
    });
  }

  let loadPhoto = function (input, files) {
    let previewresource = input.closest(".input-photo");

    for (let x = 0; x < files.length; x++) {
      if (files[x].type.startsWith("image/")) {
        let div = document.createElement("div");
        let img = document.createElement("img");
        let button = document.createElement("button");
        div.classList.add("input-photo-preview");
        img.classList.add("bg-img");
        button.setAttribute("type", "button");
        button.classList.add("delete-resource");
        button.innerHTML =
          '<svg><path d="m11 9.5-4-4 3.9-3.9c.4-.4.4-1 0-1.3s-1-.4-1.3 0L5.7 4.2l-4-4C1.3-.2.7-.2.4.2c-.4.4-.4 1 0 1.4l4 4-4.1 4c-.4.4-.4 1 0 1.3s1 .4 1.3 0l4.1-4.1 4 4c.4.4 1 .4 1.3 0s.3-.9 0-1.3z"/></svg>';

        let inputHidden = document.createElement("input");
        inputHidden.setAttribute("type", "file");
        inputHidden.setAttribute("hidden", "hidden");
        inputHidden.setAttribute("name", "load-resource");
        inputHidden.files = files;

        img.resource = files[x];
        previewresource.prepend(div);
        div.append(button);

        div.append(inputHidden);

        let reader = new FileReader();

        reader.onload = (function () {
          return function (e) {
            img.src = e.target.result;
            div.append(img);
          };
        })(img);

        reader.readAsDataURL(files[x]);
      } else {
        if (files[x].type.startsWith("video/")) {
          let div = document.createElement("div");
          let video = document.createElement("video");

          let reader = new FileReader();
          reader.readAsDataURL(files[x]);

          reader.onload = function () {
            video.src = reader.result;
          };

          div.classList.add("input-photo-preview");
          video.classList.add("bg-img");
          let button = document.createElement("button");
          button.setAttribute("type", "button");
          button.classList.add("delete-resource");
          button.innerHTML =
            '<svg><path d="m11 9.5-4-4 3.9-3.9c.4-.4.4-1 0-1.3s-1-.4-1.3 0L5.7 4.2l-4-4C1.3-.2.7-.2.4.2c-.4.4-.4 1 0 1.4l4 4-4.1 4c-.4.4-.4 1 0 1.3s1 .4 1.3 0l4.1-4.1 4 4c.4.4 1 .4 1.3 0s.3-.9 0-1.3z"/></svg>';

          let inputHidden = document.createElement("input");
          inputHidden.setAttribute("type", "file");
          inputHidden.setAttribute("hidden", "hidden");
          inputHidden.setAttribute("name", "load-resource");
          inputHidden.files = files;

          video.resource = files[x];
          previewresource.prepend(div);
          div.append(button);

          div.append(inputHidden);

          div.append(video);
          previewresource.prepend(div);
        } else {
          let div = document.createElement("div");
          let img = document.createElement("img");
          let button = document.createElement("button");
          div.classList.add("input-photo-preview");
          img.classList.add("icon-pdf");
          img.src = "img/pdf-icon.png";
          button.setAttribute("type", "button");
          button.classList.add("delete-resource");
          button.innerHTML =
            '<svg><path d="m11 9.5-4-4 3.9-3.9c.4-.4.4-1 0-1.3s-1-.4-1.3 0L5.7 4.2l-4-4C1.3-.2.7-.2.4.2c-.4.4-.4 1 0 1.4l4 4-4.1 4c-.4.4-.4 1 0 1.3s1 .4 1.3 0l4.1-4.1 4 4c.4.4 1 .4 1.3 0s.3-.9 0-1.3z"/></svg>';

          let inputHidden = document.createElement("input");
          inputHidden.setAttribute("type", "file");
          inputHidden.setAttribute("hidden", "hidden");
          inputHidden.setAttribute("name", "load-resource");
          inputHidden.files = files;

          previewresource.prepend(div);
          div.append(button);
          div.append(img);
          div.append(inputHidden);
        }
      }
    }

    let btnDelete = document.querySelectorAll(".delete-resource");

    for (let i = 0; i < btnDelete.length; i++) {
      btnDelete[i].addEventListener("click", function () {
        btnDelete[i].parentElement.remove();
      });
    }
  };

  if (document.querySelector(".load-files")) {
    let inputsFile = document.querySelectorAll(".load-files");

    for (let input of inputsFile) {
      input.addEventListener("change", function () {
        let files = input.files;

        loadPhoto(input, files);
      });
    }
  }

  //MASK TADE FORM
  if (document.querySelector(".mask-data")) {
    let inputsMask = document.querySelectorAll(".mask-data");

    for (let inpDate of inputsMask) {
      let lazyMask = IMask(inpDate, {
        mask: Date,
        autofix: true,
        blocks: {
          d: {
            mask: IMask.MaskedRange,
            placeholderChar: "d",
            from: 1,
            to: 31,
            maxLength: 2,
          },
          m: {
            mask: IMask.MaskedRange,
            placeholderChar: "m",
            from: 1,
            to: 12,
            maxLength: 2,
          },
          Y: {
            mask: IMask.MaskedRange,
            placeholderChar: "y",
            from: 1900,
            to: 2999,
            maxLength: 4,
          },
        },
      });
    }
  }

  if (document.querySelector(".mask-tel")) {
    let inputsMask = document.querySelector(".mask-tel");

    let maskOptions = {
      mask: "+{7}(000)000-00-00",
    };

    let mask = IMask(inputsMask, maskOptions);
  }

  //CUSTOM SELECT
  let select = function () {
    let selects = document.querySelectorAll(".select-form");
    let items = document.querySelectorAll(".select-list__item");

    for (let select of selects) {
      select.addEventListener("click", function () {
        select.classList.toggle("focus-select");
      });
    }

    window.addEventListener("click", function (event) {
      if (!event.target.closest(".select-form")) {
        let focusSelects = document.querySelectorAll(".focus-select");

        for (let select of focusSelects) {
          select.classList.remove("focus-select");
        }
      }
    });

    for (let item of items) {
      item.addEventListener("click", function () {
        item.parentElement.previousElementSibling.innerHTML = item.innerHTML;
      });
    }
  };

  if (document.querySelector(".select-form")) {
    select();
  }

  //step transition
  if (document.querySelector(".add-profile")) {
    let itemsNav = document.querySelectorAll(".steeps-nav__item");
    let steeps = document.querySelectorAll(".steep");
    let btnSave = document.querySelector(".save-and-next");
    let btnSaveDraft = document.querySelector(".save-draft");

    let currentSteep = 0;

    for (let i = 0; i < itemsNav.length; i++) {
      itemsNav[i].addEventListener("click", function () {
        for (let x = 0; x < itemsNav.length; x++) {
          itemsNav[x].classList.remove("active", "current");
          steeps[x].classList.add("hide");
        }

        if (i > 0) {
          for (let x = i; x >= 0; x--) {
            itemsNav[x].classList.add("active");
          }
        }

        steeps[i].classList.remove("hide");
        itemsNav[i].classList.add("active", "current");
        currentSteep = i;

        if (currentSteep + 1 === steeps.length) {
          btnSaveDraft.classList.remove("hide");
          btnSave.innerHTML = "Сохранить и опубликовать";
        } else {
          btnSaveDraft.classList.add("hide");
          btnSave.innerHTML = "Сохранить и продолжить";
        }
      });
    }

    btnSave.addEventListener("click", function () {
      if (currentSteep < steeps.length - 1) {
        ++currentSteep;

        for (let x = 0; x < itemsNav.length; x++) {
          if (x !== currentSteep) {
            steeps[x].classList.add("hide");
          } else {
            steeps[x].classList.remove("hide");
          }
        }

        itemsNav[currentSteep].classList.add("active", "current");

        if (currentSteep === steeps.length - 1) {
          btnSaveDraft.classList.remove("hide");
          btnSave.innerHTML = "Сохранить и опубликовать";

          if (document.querySelector(".preview-avatar-wrap .bg-img")) {
            let wrap = document.querySelector(".user-current-avatar");
            let el = document.querySelector(".preview-avatar-wrap .bg-img");
            let clone = el.cloneNode(true);
            wrap.append(clone);
          }
        }
      }
    });
  }

  if (document.querySelector(".swiper")) {
    let sliders = document.querySelectorAll(".swiper");

    for (let slider of sliders) {
      const swiper = new Swiper(slider, {
        slidesPerView: 5,
        spaceBetween: 25,
        freeMode: true,
        navigation: {
          nextEl: slider.parentElement.querySelector(".arrows-right"),
          prevEl: slider.parentElement.querySelector(".arrows-left"),
        },
        breakpoints: {
          320: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          650: {
            slidesPerView: 3,
          },
          1050: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 5,
          },
        },
      });
    }
  }

  if (document.querySelector(".article-profile-slider")) {
    let slider = document.querySelector(".article-profile-slider");

    const swiper = new Swiper(slider, {
      slidesPerView: 5,
      spaceBetween: 10,
      freeMode: true,
      navigation: {
        nextEl: slider.parentElement.querySelector(".arrows-right"),
        prevEl: slider.parentElement.querySelector(".arrows-left"),
      },
      breakpoints: {
        320: {
          slidesPerView: 2,
        },
        480: {
          slidesPerView: 3,
        },
        600: {
          slidesPerView: 5,
        },
        768: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 4,
        },
        1430: {
          slidesPerView: 5,
        },
      },
    });
  }

  //play video
  let videos = document.querySelectorAll("video");

  if (videos) {
    for (let video of videos) {
      let bntPlay = video.nextElementSibling;

      function play() {
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }

        bntPlay.classList.toggle("video-pause");
      }

      video.addEventListener("click", play);
      bntPlay.addEventListener("click", play);
    }
  }

  //slider img article
  let sliders = document.querySelectorAll(".article-slider");
  if (sliders) {
    for (let slider of sliders) {
      let swiper = new Swiper(slider, {
        spaceBetween: 0,
        slidesPerView: 1,
        navigation: {
          nextEl: slider.parentElement.querySelector(".arrows-right"),
          prevEl: slider.parentElement.querySelector(".arrows-left"),
        },
        pagination: {
          el: slider.parentElement.querySelector(".swiper-pagination"),
          clickable: true,
        },
      });
    }
  }

  let btnSearch = document.querySelector(".button-search");

  if (btnSearch) {
    let search = document.querySelector("#popup-search");
    let closeSearch = document.querySelector(".close-search");

    btnSearch.addEventListener("click", function () {
      openModal();
      search.classList.remove("hide");
    });

    closeSearch.addEventListener("click", function () {
      closeModal();
      search.classList.add("hide");
    });

    let config = {
      childList: true,
      subtree: true,
    };

    let callback = function (mutationsList, observer) {
      for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
          if (
            search.scrollHeight >= window.innerHeight &&
            !search.classList.contains("scroll")
          ) {
            search.classList.add("scroll");
          } else {
            if (
              search.scrollHeight < window.innerHeight &&
              search.classList.contains("scroll")
            ) {
              search.classList.remove("scroll");
            }
          }
        }
      }
    };

    const observer = new MutationObserver(callback);

    observer.observe(search, config);
  }

  if (document.querySelector(".community-preview-buttons")) {
    let changeParentEl = () => {
      let buttonsWrap = document.querySelector(".community-preview-buttons");
      let previewTitle = document.querySelector(".community-preview-title");
      let followers = document.querySelector(".followers-wrap");

      if (
        window.innerWidth <= 768 &&
        buttonsWrap.parentElement.classList.contains("community-preview")
      ) {
        previewTitle.insertBefore(buttonsWrap, followers);
      } else {
        if (
          window.innerWidth > 768 &&
          !buttonsWrap.parentElement.classList.contains("community-preview")
        ) {
          document.querySelector(".community-preview").append(buttonsWrap);
        }
      }
    };

    window.addEventListener("resize", changeParentEl);
    window.addEventListener("load", changeParentEl);
  }

  if (document.querySelector(".family-card-nav")) {
    let familyCardNav = document.querySelector(".family-card-nav");
    let familyItems = document.querySelectorAll(".family-card-nav__item");

    familyCardNav.addEventListener("click", function (event) {
      if (
        !event.target.classList.contains("active") ||
        !event.target.closest(".active")
      ) {
        for (let i = 0; i < familyItems.length; i++) {
          familyItems[i].classList.remove("active");
        }

        let item;

        if (!event.target.classList.contains("family-card-nav__item")) {
          item = event.target.closest(".family-card-nav__item");
        } else {
          item = event.target.closest(".family-card-nav__item");
        }

        item.classList.add("active");
      }
    });
  }

  if (document.querySelector(".profiles-slider-wrap")) {
    let slider = document.querySelector(".profiles-slider-wrap");

    let swiper = new Swiper(slider, {
      slidesPerView: 5,
      spaceBetween: 21,
      freeMode: true,
      navigation: {
        nextEl: document.querySelector(".family-profiles-nav__next"),
        prevEl: document.querySelector(".family-profiles-nav__prev"),
      },
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        480: {
          slidesPerView: 3,
        },
        600: {
          slidesPerView: 4,
        },
        980: {
          spaceBetween: 15,
          slidesPerView: 4,
        },
        1120: {
          slidesPerView: 5,
        },
        1280: {
          slidesPerView: 3,
        },
        1430: {
          slidesPerView: 5,
        },
      },
    });
  }

  window.addEventListener("load", function () {
    //слайдеры карточек
    let qrCodeSlider = document.querySelector(".qr-code-slider");

    if (qrCodeSlider) {
      let swiper = new Swiper(qrCodeSlider, {
        slidesPerView: 2,
        spaceBetween: 30,
        centeredSlides: true,
        navigation: {
          nextEl: ".qr-code-slider__next",
          prevEl: ".qr-code-slider__prev",
        },
      });

      let btnGrid = document.querySelector(".btn-style-grid");
      let btnInline = document.querySelector(".btn-style-inline");
      let gallery = document.querySelector(".member-images");

      btnGrid.addEventListener("click", function () {
        gallery.classList.remove("no-grid");
      });

      btnInline.addEventListener("click", function () {
        gallery.classList.add("no-grid");
      });
    }
  });
})();
