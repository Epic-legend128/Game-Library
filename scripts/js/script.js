String.prototype.replaceAt = function(start, end, str) {
    return this.substring(0, start) + str + this.substring(end);
}

function changeScreen(page) {
    location.href = location.href.replaceAt(location.href.lastIndexOf('/'), location.href.length, "/"+page);
}
