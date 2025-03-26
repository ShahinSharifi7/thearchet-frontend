import api from "./auth.js"

export const checkProfileCompletion = async () => {
    const response = await api.get(`/user/profile/completion/`);
    return response.data.is_profile_complete;
};

export const updateUserProfile = async (profileData) => {
    await api.post(`/user/profile/update/`, profileData);
};

export const fetchInstrumentQuestions = async () => {
    const response = await api.get(`/instrument/questions/`);
    return response.data;
};

export const fetchMatchingQuestions = async () => {
    const response = await api.get(`/matching/questions/`);
    return response.data;
};

export const submitInstrumentSuggestionAnswers = async (responses) => {
    const response = await api.post(`/instrument/suggest-instrument/`, {responses});
    return response.data.name;
};

export const fetchUserProfile = async () => {
    try {
        const response = await api.get("/user/profile/");
        return response.data;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw error;
    }
};

export const fetchLastInstrumentSuggestion = async () => {
    const response = await api.get(`/instrument/get-suggestion/`);
    return response.data;
};

export const fetchAllUsers = async () => {
    const response = await api.get('/user/all/');
    return response.data;
};

export const hasMatches = async () => {
    const response = await api.get('/user/has_matches/');
    return response.data;
}

export const getUserMatches = async () => {
    const response = await api.get('/user/get_matches/');
    return response.data;
}

export const submitMatchingQuestionsAnswers = async (responses) => {
    const response = await api.post("/matching/submit/", {responses});
    return response.data;
}

export const getUserProfileByUsername = async (username) => {
    const response = await api.get(`/user/profile/${username}/`);
    return response.data;
}

export const sendMessage = async (data) => {
    const response = await api.post("/message/send-message/", data);
    return response.data;
}

export const receivedMessages = async () => {
    const response = await api.get("/message/received-messages/");
    return response.data;
}

export const sentMessages = async () => {
    const response = await api.get("/message/sent-messages/");
    return response.data;
}

export const upgradePremium = async () => {
    const response = await api.post("/user/upgrade-premium/");
    return response.data;
}

export const removePremium = async () => {
    const response = await api.post("/user/remove-premium/");
    return response.data;
}

export const fetchMessageDetail = async (messageId) => {
    const response = await api.get(`/message/${messageId}/`);
    return response.data;
};

export const checkSpotifyConnection = async () => {
    const response = await api.get("/spotify/status/");
    return response.data;
}

export const getSpotifyProfile = async () => {
    const response = await api.get("/spotify/me/");
    return response.data;
}

export const spotifyLogin = async () => {
    const response = await api.get("/spotify/login/");
    return response.data;
}

export const fetchSpotifyTopGenres = async () => {
    const response = await api.get("/spotify/top-genres/");
    return response.data.top_genres;
};

export const nearbyEvents = async (lat, lon, start, end) => {
    const response = await api.get(`/events/nearby-events?lat=${lat}&lon=${lon}&start=${start}&end=${end}`)
    return response.data;
}
