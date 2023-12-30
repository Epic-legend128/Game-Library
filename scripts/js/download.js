function addToFavourites() {
    document.getElementById('fav').value = document.getElementsByTagName("h1")[0].innerHTML.replaceAll(/ /g, '').toLowerCase().substring(8);
}