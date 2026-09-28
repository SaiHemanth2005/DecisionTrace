const API_URL = "http://127.0.0.1:8000";

export async function createDecision(data) {
  const response = await fetch(${API_URL}/decisions/, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create decision");
  }

  return response.json();
}

export async function getDecisions() {
  const response = await fetch(${API_URL}/decisions/);

  if (!response.ok) {
    throw new Error("Failed to fetch decisions");
  }

  return response.json();
}

export async function askQuestion(question) {
  const response = await fetch(${API_URL}/ask/, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    throw new Error("Failed to ask question");
  }

  return response.json();
}

export async function reviewDecision(newInformation) {
  const response = await fetch(${API_URL}/review/, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      new_information: newInformation,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to review decision");
  }

  return response.json();
}
