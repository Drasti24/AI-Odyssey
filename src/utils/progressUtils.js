export const saveChapterProgress = (chapterId, score) => {
  try {
    const saved = JSON.parse(localStorage.getItem("ai_odyssey_progress") || "{}");
    // Only update if the new score is higher
    saved[chapterId] = Math.max(saved[chapterId] || 0, score);
    localStorage.setItem("ai_odyssey_progress", JSON.stringify(saved));
  } catch (e) {
    console.error("Failed to save progress", e);
  }
};

export const getChapterProgress = () => {
  try {
    return JSON.parse(localStorage.getItem("ai_odyssey_progress") || "{}");
  } catch (e) {
    return {};
  }
};
