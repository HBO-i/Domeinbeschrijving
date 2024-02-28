export interface Response<T> {
    data: T;
}

export interface Competence {
    id: number;
    value: string;
    description: FilterItem;
}

export interface ProfessionSkill {
    id: number;
    value: string;
    competencies: Competence[];
}

export interface FilterItem {
    id: number;
    value: string;
}

export interface DescriptionItem {
    id: number;
    value: string;
    items: DescriptionItem[] | string[];
}

export interface FilterOptionsResponse {
    levels: FilterItem[];
    activities: FilterItem[];
    architecture_layers: FilterItem[];
}

export type DescriptionIndexResponse = DescriptionItem[];
export type ProfessionSkillIndexResponse = ProfessionSkill[];

// Request
export interface DescriptionIndexRequest {
    grouping: string;
    search?: string;
    language?: string;
    level?: number[];
    activity?: number[];
    architecture_layer?: number[];
}
