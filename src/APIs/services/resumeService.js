import { URLS } from "../baseURL/url";

export const parseResumeService = async (file) => {
  const formData = new FormData();
  formData.append("resume", file);
  const token = localStorage.getItem("token");
  const response = await fetch(URLS.RESUME.PARSE, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Resume parsing failed");
  return data;
};

export const registerCandidateService = async (payload) => {
  const token = localStorage.getItem("token");
  const response = await fetch(URLS.CANDIDATE.REGISTER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Registration failed");
  return data;
};