import axios from 'axios';
import { ReducedDigimon } from '../types/Digimon';

const API_URL = '/api/v1';

export const fetchCharacters = async (page: number): Promise<ReducedDigimon[]> => {
    const response = await axios.get(`${API_URL}/digimon/?name=&page=${page}`);
    return response.data.content; // Adjust to return the content array from response
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