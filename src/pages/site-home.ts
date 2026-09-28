export function renderSiteHomePage() {
    const app = document.querySelector<HTMLDivElement>("#app")!;

    app.innerHTML = `
        <header class="site-home-hero">
            <!-- <p class="eyebrow">Jack Caesar</p> -->
            <h1>Jack Caesar</h1>
            <p class="site-home-intro">I'm Jack, a computer science student, game programmer, and musician. This is the home for my work and the things I'm making.</p>
            <a class="primary-link" href="/portfolios/">Explore portfolios <span aria-hidden="true">→</span></a>
        </header>
        <main class="site-home-main">
            <span>Currently exploring</span>
            <p>Game systems, playful experiences, and the craft behind them.</p>
        </main>
    `;
}