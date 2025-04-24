import CONFIG from '../config';

const ENDPOINTS = {
  REGISTER: `${CONFIG.BASE_URL}/register`,
  LOGIN: `${CONFIG.BASE_URL}/login`,
  STORIES: `${CONFIG.BASE_URL}/stories`,
  STORY_DETAIL: (id) => `${CONFIG.BASE_URL}/stories/${id}`,
  SUBSCRIBE: `${CONFIG.BASE_URL}/notifications/subscribe`,
};

// Register
const registerUser = async ({ name, email, password }) => {
  const response = await fetch(ENDPOINTS.REGISTER, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return response.json();
};

// Login
const loginUser = async ({ email, password }) => {
  const response = await fetch(ENDPOINTS.LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return response.json();
};

// Get all stories
const getAllStories = async (page = 1, size = 12) => {
  const token = localStorage.getItem('token');
  const response = await fetch(
    `${ENDPOINTS.STORIES}?page=${page}&size=${size}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return response.json();
};

// Get single story by ID
const getStoryDetail = async (id) => {
  const token = localStorage.getItem('token');
  const response = await fetch(ENDPOINTS.STORY_DETAIL(id), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return response.json();
};

const postStory = async ({ description, photo, lat, lon }) => {
  const token = localStorage.getItem('token');
  const formData = new FormData();

  formData.append('description', description);
  formData.append('photo', photo);
  if (lat) formData.append('lat', lat);
  if (lon) formData.append('lon', lon);

  const response = await fetch(ENDPOINTS.STORIES, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      // ❌ Jangan atur Content-Type secara manual saat pakai FormData
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return response.json(); // => { error: false, message: "success" }
};

export {
  ENDPOINTS,
  registerUser,
  loginUser,
  getAllStories,
  getStoryDetail,
  postStory,
};
