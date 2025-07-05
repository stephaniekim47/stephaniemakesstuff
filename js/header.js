const rootPath = window.location.origin

const headerHTML = `
    <div class="menu-wrapper">
        <div class="menu-icon" tabindex="0">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
        </div>
        <div class="menu">
            <h3 class="artwork-menu-text">ARTWORK ▾</h3>
            <div class="artwork-sublinks">
                <h4><a href="${rootPath}exhibits">EXHIBITS</a></h4>
                <h4><a href="sculptural">SCULPTURAL</a></h4>
                <h4><a href="functional">FUNCTIONAL</a></h4>
                <h4><a href="petportraits">PET PORTRAITS</a></h4>
            </div>
            <h3><a class="menu-text" href="/bio">BIO</a></h3>
            <h3><a class="menu-text" href="/cv">CV</a></h3>
            <h3><a class="menu-text" href="/contact">CONTACT</a></h3>
        </div>
    </div>
    <div class="header">
        <h3 class="name"><a href="/">Stephanie Kim</a></h3>
        <div class="header-bar">
            <div class="header-item" id="artwork">ARTWORK
                <ul class="drop-down-container">
                    <li class="drop-down-item"><a href="exhibits">EXHIBITS</a></l>
                        <li class="drop-down-item"><a href="sculptural">SCULPTURAL</a></li>
                        <li class="drop-down-item"><a href="functional">FUNCTIONAL</a></li>
                        <li id="portraits" class="drop-down-item"><a href=
                                "petportraits">PET PORTRAITS</a></li>
                </ul>
            </div>
            <div class="header-item"><a href="bio">BIO</a></div>
            <div class="header-item"><a href="cv">CV</a></div>
            <div class="header-item"><a href="contact">CONTACT</a></div>
        </div>
    </div>`;

document.addEventListener("DOMContentLoaded", function () {
  document.getElementsByClassName("header-wrapper")[0].innerHTML = headerHTML;
});