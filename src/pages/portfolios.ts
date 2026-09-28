export function renderPortfoliosPage() {
    const app = document.querySelector<HTMLDivElement>("#app")!;

    app.innerHTML = `
        <main class="portfolio-directory">
            <a class="text-link" href="/">← Home</a>
            <header>
                <p class="eyebrow">Jack Caesar</p>
                <h1>Portfolios</h1>
                <p>Browse my work by discipline.</p>
            </header>
            <section class="portfolio-list" aria-label="Available portfolios">
                <a class="portfolio-list-item" href="/portfolios/game-programmer/">
                    <span class="portfolio-number">01</span>
                    <span class="portfolio-list-copy">
                        <strong>Game Programmer</strong>
                        <span>Projects, technical work, and game development.</span>
                    </span>
                    <span class="portfolio-arrow" aria-hidden="true">↗</span>
                </a>
            </section>
        </main>
    `;
}