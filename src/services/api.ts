import axios from 'axios';
import { ReducedDigimon } from '../types/Digimon';

const API_URL = '/api/v1';

type FilterContextType = {
    digimonName: string;
    digimonLevel: string;
    xAntibody: string;
    digimonAttribute: string;
};

export const fetchCharacters = async (page: number): Promise<ReducedDigimon[]> => {
    const response = await axios.get(`${API_URL}/digimon/?name=&pageSize=10&page=${page}`);
    return response.data.content;
};

export const fetchCharactersWithFilters = async (page: number, data: FilterContextType): Promise<ReducedDigimon[]> => {
    let url = `${API_URL}/digimon/?pageSize=10&page=${page}`
    if(data.digimonName && data.digimonName.length >0) url += `&name=${data.digimonName}`;
    if(data.digimonAttribute && data.digimonAttribute.length >0) url += `&attribute=${data.digimonAttribute}`;
    if(data.digimonLevel && data.digimonLevel.length >0) url += `&level=${data.digimonLevel}`;
    if(data.xAntibody && data.xAntibody.length >0) url += `&xAntibody=${data.xAntibody}`;

    const response = await axios.get(url);
    return response.data.content;
};

export const fetchCharacterById = async (id: number) => {
    const response = await axios.get(`${API_URL}/digimon/${id}`);
    return response.data;
};

export const fetchAllAttributes = async () => {
    return getAllValues("attribute")
};

export const fetchAllFields = async () => {
    return getAllValues("field")
};

export const fetchAllLevels = async () => {
    return getAllValues("level")
};

export const fetchAllTypes = async () => {
    return getAllValues("type")
};

const getAllValues = async(address: string) => {
    let results: string[] = [];
    let nextPage = `${API_URL}/${address}`;

    while (nextPage) {
        const response = await axios.get(nextPage);
        results = [...results, ...response.data.content.fields.map((r: { name: string }) => r.name)];
        nextPage = response.data.pageable.nextPage;
    }

    return results;
}