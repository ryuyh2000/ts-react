import axios from "axios";

interface APITypes{
    username:string,
    repository:string
}

const gitApiURL = axios .create({
    baseURL:"https://api.github.com/"
})

export const GitApi = {
    getcommit: (object:APITypes) => gitApiURL.get(`/repos/${object.username}/${object.repository}/commits`),
}