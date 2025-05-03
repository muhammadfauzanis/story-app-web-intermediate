import { openDB } from 'idb';

const DB_NAME = 'curhat-app-db';
const DB_VERSION = 1;
const STORE_NAME = 'saved-stories';

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id' });
    }
  },
});

const saveStory = async (story) => {
  const db = await dbPromise;
  await db.put(STORE_NAME, story);
};

const getAllSavedStories = async () => {
  const db = await dbPromise;
  return db.getAll(STORE_NAME);
};

const getSavedStory = async (id) => {
  const db = await dbPromise;
  return db.get(STORE_NAME, id);
};

const deleteStory = async (id) => {
  const db = await dbPromise;
  return db.delete(STORE_NAME, id);
};

export { saveStory, getAllSavedStories, getSavedStory, deleteStory };
