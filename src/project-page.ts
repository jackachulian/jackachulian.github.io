// import "./style.css";
import "./syntax-highlight.css";
import { marked } from "marked";
import { loadProjects } from "./projects";
import { createShaderBackground } from "./webgl";
// import headerShader from "./shaders/header.frag?raw";
import mainShader from "./shaders/main.frag?raw";


// Using ES6 import syntax
import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';

// Then register the languages you need
hljs.registerLanguage('python', python);


async function loadDescription(id: string): Promise<string> {
    // const descriptionUrl = new URL(, import.meta.url).href;
    // get relative to the url (/projects/...)
    const response = await import(`./content/projects/${id}/description.md?raw`);
    console.log(response);

    // if (!response.ok) {
    //     throw new Error("Could not load project description from " + `./content/projects/${id}/description.md`);
    // }

    return await response.default;
}

export async function renderProjectPage(id: string) {
    const projects = loadProjects();

    const project = projects.find(project => project.id === id);

    const app = document.querySelector<HTMLDivElement>("#app")!;

    if (!project) {
        app.innerHTML = `
            <main>
                <h1>Project Not Found</h1>
                <a href="/">Return Home</a>
            </main>
        `;

        return;
    }

    // console.log(id);

    const description_markdown = await loadDescription(id);
    // console.log(description_markdown);

    const parsedHtml = await marked.parse(description_markdown);
    const parsedDocument = new DOMParser().parseFromString(parsedHtml, "text/html");

    parsedDocument.querySelectorAll<HTMLImageElement>("img[src]").forEach(image => {
        console.log(image);
        // console.log(project)
        image.src = new URL(`./content/projects/${project.id}/${image.getAttribute("src") || ""}`, import.meta.url).href;
    });

    const html = parsedDocument.body.innerHTML;
    // console.log(html);

    console.log(project);

    const thumbnailUrl = project.thumbnail
        ? new URL(`./content/projects/${project.id}/${project.thumbnail}`, import.meta.url).href
        : "";

    // const thumbnailUrl =
    //     thumbnailPath
    //         ? thumbnailUrls[thumbnailPath]
    //         : undefined;

    var subtitle_text = `${new Date(project.date).getFullYear()} · ${project.status}`
    if (project.itchPage) {
        subtitle_text += ` · <a href="${project.itchPage}"><svg aria-hidden="true" viewBox="0 0 24 24" focusable="false"><path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5" /></svg><span>Itch.IO</span></a>`;
    }
    if (project.steamPage) {
        subtitle_text += ` · <a href="${project.steamPage}"><svg aria-hidden="true" viewBox="0 0 24 24" focusable="false"><circle cx="16.5" cy="7.5" r="3.5" /><circle cx="7" cy="17" r="3" /><path d="m9.2 15.1 4.8-4.8M4.3 16.1l3.5 1.6" /></svg><span>Steam</span></a>`;
    }


    app.innerHTML = `
        <main class="project-page">
            <a href="/portfolios/game-programmer/#projects" class="back-button">
                ← Back to Projects
            </a>

            <header>
                <h1>${project.title}</h1>

                 <div class="project-image">
                    ${
                        thumbnailUrl
                            ? `<img src="${thumbnailUrl}" alt="${project.title} Thumbnail">`
                            : ""
                    }
                </div>

                <div class="project-tags">
                    ${project.technologies
                        .map(technology => `<span>${technology}</span>`)
                        .join("")}
                </div>

                <small class="project-subtitle">
                    ${subtitle_text}
                </small>
            </header>

            <article class="project-description">
                ${html}
            </article>

        </main>
    `;

    app.querySelectorAll("pre code").forEach((element) => {
        console.log(element);
        hljs.highlightElement(element as HTMLElement);
    });

    const mainCanvas =
        document.querySelector<HTMLCanvasElement>(
            "#main-background"
        );
    if (mainCanvas) {
        createShaderBackground(
            mainCanvas,
            mainShader
        );  
    }
}