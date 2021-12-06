import axios from "axios";

interface GitTypes {
  username: string;
  repository: string;
}

interface CRUDType {
  id?: number;
  title: string;
  content: string;
  createTime?: number;
}

const gitApiURL = axios.create({
  baseURL: "https://api.github.com/",
});

const CRUDApiURl = axios.create({
  baseURL: "http://localhost:8080/",
});

export const GitApi = {
  getcommit: (object: GitTypes) =>
    gitApiURL.get(`/repos/${object.username}/${object.repository}/commits`),
};

export const CRUDApi = {
  getContents: () => CRUDApiURl.get("/api/tasks"),
  postContents: (object: CRUDType) => CRUDApiURl.post("/api/task/", object),
};
