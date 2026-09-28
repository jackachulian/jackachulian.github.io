import type { Project } from "./types";

const projectFiles = import.meta.glob(
    "/src/content/projects/*/project.json",
    {
        eager: true,
        query: "?raw",
        import: "default"
    }
);

export function loadProjects(): Project[] {
    const projects: Project[] = Object.values(projectFiles).map(file => {
        return JSON.parse(file as string) as Project;
    });

    return projects.sort((first, second) =>
        new Date(second.date).getTime() - new Date(first.date).getTime()
    );
}