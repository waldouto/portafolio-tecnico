export const initFilters = () => {

  const buttons =
    document.querySelectorAll(
      ".filter-button"
    );

  const projects =
    document.querySelectorAll(
      ".project-card"
    );

  const status =
    document.getElementById(
      "filterStatus"
    );


  if (!buttons.length || !projects.length) {
    return;
  }


  const updateButtons = (activeButton) => {

    buttons.forEach((button) => {

      const isActive =
        button === activeButton;


      button.classList.toggle(
        "active",
        isActive
      );


      button.setAttribute(
        "aria-pressed",
        String(isActive)
      );

    });

  };


  const filterProjects = (filter) => {

    let visibleCount = 0;


    projects.forEach((project) => {

      const categories =
        (
          project.dataset.category ||
          ""
        )
          .split(" ")
          .filter(Boolean);


      const shouldShow =
        filter === "all" ||
        categories.includes(filter);


      project.hidden =
        !shouldShow;


      if (shouldShow) {
        visibleCount += 1;
      }

    });


    if (status) {

      status.textContent =
        `${visibleCount} proyecto${visibleCount === 1 ? "" : "s"} visible${visibleCount === 1 ? "" : "s"}.`;

    }

  };


  buttons.forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const filter =
          button.dataset.filter ||
          "all";


        updateButtons(button);

        filterProjects(filter);

      }
    );

  });

};
