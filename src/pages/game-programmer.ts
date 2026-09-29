import { loadProjects } from "../projects";
import { createShaderBackground } from "../webgl";
import { gameProgrammerProjectIds } from "../content/portfolios/game-programmer";
import headerShader from "../shaders/header.frag?raw";
import mainShader from "../shaders/main.frag?raw";

const portfolioPath = "/portfolios/game-programmer";

export function renderGameProgrammerPortfolio() {
    const projectsById = new Map(loadProjects().map(project => [project.id, project]));
    const projects = gameProgrammerProjectIds.flatMap(id => {
        const project = projectsById.get(id);
        return project ? [project] : [];
    });
    const app = document.querySelector<HTMLDivElement>("#app")!;

    app.innerHTML = `
        <!-- <a class="portfolio-home-link" href="/portfolios/">← All portfolios</a> -->
        <header class="hero">
            <h1>Jack Caesar</h1>
            <p>Computer Science Student &amp; Game Programmer</p>
            <nav class="social-links" aria-label="Contact and social links">
                <a href="mailto:jackcaesar04@gmail.com" aria-label="Email Jack">
                    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false"><path d="M3 5h18v14H3zM3 6l9 7 9-7" /></svg>
                    <span>jackcaesar04@gmail.com</span>
                </a>
                <a href="https://jackachulian.itch.io" aria-label="Jack on Itch.io">
                    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false"><path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5" /></svg>
                    <span>Itch.IO</span>
                </a>
                <a href="https://www.linkedin.com/in/jack-caesar-437103294" aria-label="Jack on LinkedIn">
                    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false"><path d="M5 8v11M5 5.5v.01M10 19v-6a3 3 0 0 1 6 0v6M10 11v8" /></svg>
                    <span>LinkedIn</span>
                </a>
                <a href="https://discord.com/users/403673232281960458" aria-label="Jack on Discord">
                    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false"><path d="M7 7a12 12 0 0 1 10 0l2 10a12 12 0 0 1-14 0L7 7Zm2 6h.01M15 13h.01M8 9c2 1 6 1 8 0" /></svg>
                    <span>Discord</span>
                </a>
            </nav>
        </header>
        <main>
            <p>Hey there! I'm a game programmer and computer science student. I love getting into the technical aspects of game development and making systems that are built to last. I'm also a musician and play jazz piano and trombone! Below is a list of some of my projects.</p>
            <section id="projects">
                <h2 class="projects-header">Featured Projects</h2>
                <div id="project-cards" class="projects-grid"></div>
            </section>
        </main>
    `;

    const projectsContainer = document.querySelector<HTMLDivElement>("#project-cards")!;

    for (const project of projects) {
        const card = document.createElement("article");
        const thumbnailUrl = project.thumbnail
            ? new URL(`../content/projects/${project.id}/${project.thumbnail}`, import.meta.url).href
            : "";

        card.className = "project-card";

        let subtitleText = `${new Date(project.date).getFullYear()} · ${project.status}`;
        if (project.links?.website) subtitleText += ` · <a href="${project.links.website}">Website</a>`;
        if (project.links?.steam) subtitleText += ` · <a href="${project.links.steam}">Steam</a>`;
        if (project.links?.itch) subtitleText += ` · <a href="${project.links.itch}">Itch.IO</a>`;
        if (project.links?.github) subtitleText += ` · <a href="${project.links.github}">GitHub</a>`;

        card.innerHTML = `
            <a href="${portfolioPath}/projects/${project.id}/">
                <div class="project-image">
                    ${thumbnailUrl ? `<img src="${thumbnailUrl}" alt="${project.title} Thumbnail">` : ""}
                </div>
            </a>
            <div class="project-content">
                <h3><a class="project-card-link" href="${portfolioPath}/projects/${project.id}/">${project.title}</a></h3>
                <p>${project.shortDescription}</p>
                <div class="project-tags">
                    ${project.technologies.map(technology => `<span>${technology}</span>`).join("")}
                </div>
                <small class="project-subtitle">${subtitleText}</small>
            </div>
        `;

        projectsContainer.appendChild(card);
    }

    const headerCanvas = document.querySelector<HTMLCanvasElement>("#header-background");
    if (headerCanvas) createShaderBackground(headerCanvas, headerShader);

    const mainCanvas = document.querySelector<HTMLCanvasElement>("#main-background");
    if (mainCanvas) createShaderBackground(mainCanvas, mainShader);
}