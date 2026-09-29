export interface Project {
    id: string;
    title: string;
    shortDescription: string;
    date: string;
    status: string;

    technologies: string[];
    categories: string[];

    thumbnail?: string;

    links?: {
        github?: string;
        website?: string;
        itch?: string;
        steam?: string;
    };
}