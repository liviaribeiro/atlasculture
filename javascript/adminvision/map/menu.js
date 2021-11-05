const openNav = (itemMenu)  => {
    const mediaQuery = window.matchMedia('(min-width: 480px)')
    if (mediaQuery.matches) {
        if (itemMenu) {
          document.getElementById(itemMenu).style.width = "408px";
        }

    }
    else {
        var w = document.documentElement.clientWidth-63;
        document.getElementById(itemMenu).style.width = w.toString()+"px";
    }
    const menus = ["equipement-menu", "politiques-menu", "depenses-menu", "entreprises-menu", "contexte-menu", "Arts du spectacle",
    "Arts visuels", "Cinéma", "Archives", "Éducation et formation", "Patrimoine", "Livre, lecture et presse"]
    for (var i = 0; i < menus.length; i++){
        if (menus[i] != itemMenu) {
            closeNav(menus[i]);
        }
    }
}

const closeNav = (itemMenu) => {
    if (itemMenu) {
      document.getElementById(itemMenu).style.width = "0";
    }
}

const openSubmenuNav = (itemMenu) => {
    const mediaQuery = window.matchMedia('(min-width: 480px)')
    if (mediaQuery.matches) {
        document.getElementById(itemMenu).style.width = "408px";
    }
    else {
        var w = document.documentElement.clientWidth-63;
        document.getElementById(itemMenu).style.width = w.toString()+"px";
    }
}

window.openNav = openNav
window.closeNav = closeNav
window.openSubmenuNav = openSubmenuNav

export { openNav, closeNav }
