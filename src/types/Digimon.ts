export interface DigimonImage {
    href: string;
    transparent: boolean;
}

export interface DigimonLevel {
    id: number;
    level: string;
}

export interface DigimonType {
    id: number;
    type: string;
}

export interface DigimonAttribute {
    id: number;
    attribute: string;
}

export interface DigimonField {
    id: number;
    field: string;
    image: string;
}

export interface DigimonDescription {
    origin: string;
    language: string;
    description: string;
}

export interface DigimonSkill {
    id: number;
    skill: string;
    translation: string;
    description: string;
}

export interface DigimonEvolution {
    id: number;
    digimon: string;
    condition: string;
    image: string;
    url: string;
}

export type ReducedDigimon = {
    id: number;
    name: string;
    href: string;
    image: string;
}

export type DigimonData = {
    id: number;
    name: string;
    xAntibody: boolean;
    images: DigimonImage[];
    levels: DigimonLevel[];
    types: DigimonType[];
    attributes: DigimonAttribute[];
    fields: DigimonField[];
    releaseDate: string;
    descriptions: DigimonDescription[];
    skills: DigimonSkill[];
    priorEvolutions: DigimonEvolution[];
    nextEvolutions: DigimonEvolution[];
}
