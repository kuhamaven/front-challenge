import axios from 'axios';
import { ReducedDigimon } from '../types/Digimon';

const API_URL = 'https://digi-api.com/api/v1';

export const fetchCharacters = async (page: number): Promise<ReducedDigimon[]> => {
    const response = await axios.get(`${API_URL}/digimon/?name=&page=${page}`);
    return response.data.content; // Adjust to return the content array from response
};

export const fetchCharacterById = async (id: number) => {
    const response = await axios.get(`${API_URL}/digimon/${id}`);
    return response.data;
};
