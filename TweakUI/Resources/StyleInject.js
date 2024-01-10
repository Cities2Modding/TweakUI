(function () {
    const ID = "tu-styles";

    // Check if the link already exists
    var existingLink = document.getElementById(ID);
    if (existingLink) {
        // Remove the existing link
        existingLink.parentNode.removeChild(existingLink);
    }

    // Create a new link element
    var newLink = document.createElement("link");
    newLink.id = ID; // Set the ID on the new link
    newLink.rel = "stylesheet";
    newLink.type = "text/css";
    newLink.href = "coui://tweakui/TweakUI.css?v=" + new Date().getTime(); // Append timestamp to force reload

    // Append the new link to the head
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(newLink);
})();