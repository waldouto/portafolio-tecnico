export const initNavigation = () => {

  const menuButton =
    document.getElementById(
      "menuButton"
    );

  const navigation =
    document.getElementById(
      "mainNavigation"
    );


  if (!menuButton || !navigation) {
    return;
  }


  const closeMenu = () => {

    navigation.classList.remove(
      "open"
    );


    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

  };


  menuButton.addEventListener(
    "click",
    () => {

      const isOpen =
        navigation.classList.toggle(
          "open"
        );


      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    }
  );


  navigation
    .querySelectorAll("a")
    .forEach((link) => {

      link.addEventListener(
        "click",
        closeMenu
      );

    });


  window.addEventListener(
    "resize",
    () => {

      if (window.innerWidth > 700) {
        closeMenu();
      }

    }
  );

};
