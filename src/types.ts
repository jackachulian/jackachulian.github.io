export interface Project {
    id: string;
    title: string;
    shortDescription: string;
    date: string;
    status: string;
    itchPage?: String,
    steamPage?: String,

    technologies: string[];
    categories: string[];

    thumbnail?: string;

    links?: {
        github?: string;
        website?: string;
        itch?: string;
    };
}