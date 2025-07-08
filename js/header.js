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
                <h4><a href="${rootPath}/exhibits">EXHIBITS</a></h4>
                <h4><a href="${rootPath}/sculptural">SCULPTURAL</a></h4>
                <h4><a href="${rootPath}/functional">FUNCTIONAL</a></h4>
                <h4><a href="${rootPath}/petportraits">PET PORTRAITS</a></h4>
            </div>
            <h3><a class="menu-text" href="${rootPath}/bio">BIO</a></h3>
            <h3><a class="menu-text" href="${rootPath}/cv">CV</a></h3>
            <h3><a class="menu-text" href="${rootPath}/contact">CONTACT</a></h3>
        </div>
    </div>
    <div class="header">
        <div class="name"><a href="/">Stephanie Kim</a></div>
        <div class="header-bar">
            <div class="header-item" id="artwork">ARTWORK
                <ul class="drop-down-container">
                    <li class="drop-down-item"><a href="${rootPath}/exhibits">EXHIBITS</a></l>
                        <li class="drop-down-item"><a href="${rootPath}/sculptural">SCULPTURAL</a></li>
                        <li class="drop-down-item"><a href="${rootPath}/functional">FUNCTIONAL</a></li>
                        <li id="portraits" class="drop-down-item"><a href=
                                "${rootPath}/petportraits">PET PORTRAITS</a></li>
                </ul>
            </div>
            <div class="header-item"><a href="${rootPath}/bio">BIO</a></div>
            <div class="header-item"><a href="${rootPath}/cv">CV</a></div>
            <div class="header-item"><a href="${rootPath}/contact">CONTACT</a></div>
        </div>
    </div>`;

document.addEventListener("DOMContentLoaded", function () {
  document.getElementsByClassName("header-wrapper")[0].innerHTML = headerHTML;
});