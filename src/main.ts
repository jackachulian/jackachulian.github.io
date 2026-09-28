import "./style.css";
import { renderProjectPage } from "./project-page";
import { renderSiteHomePage } from "./pages/site-home";
import { renderPortfoliosPage } from "./pages/portfolios";
import { renderGameProgrammerPortfolio } from "./pages/game-programmer";

const path = window.location.pathname.replace(/\/+$/, "") || "/";
const gameProgrammerPath = "/portfolios/game-programmer";
const projectPathPrefix = `${gameProgrammerPath}/projects/`;

if (path === "/") {
    renderSiteHomePage();
} else if (path === "/portfolios") {
    renderPortfoliosPage();
} else if (path === gameProgrammerPath) {
    renderGameProgrammerPortfolio();
} else if (path.startsWith(projectPathPrefix)) {
    const id = path.slice(projectPathPrefix.length).split("/")[0];
    if (id) renderProjectPage(id);
    else renderNotFound();
} else {
    renderNotFound();
}

function renderNotFound() {
    const app = document.querySelector<HTMLDivElement>("#app")!;
    app.innerHTML = `
        <main>
            <h1>Page not found</h1>
            <a href="/">Return to homepage</a>
        </main>
    `;
}