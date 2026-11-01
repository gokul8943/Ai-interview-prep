export const RATE_LIMIT = {

    LOGIN: {
        WINDOW_MS: 15 * 60 * 1000,
        MAX_REQUESTS: 5,
    },

    SIGNUP: {
        WINDOW_MS: 15 * 60 * 1000,
        MAX_REQUESTS: 5,
    },

    OTP: {
        WINDOW_MS: 10 * 60 * 1000,
        MAX_REQUESTS: 3,
    },

    OTP_VERIFY: {
        WINDOW_MS: 15 * 60 * 1000,
        MAX_REQUESTS: 5,
    },

    REFRESH: {
        WINDOW_MS: 5 * 60 * 1000,
        MAX_REQUESTS: 30,
    },

    API: {
        WINDOW_MS: 60 * 1000,
        MAX_REQUESTS: 100,
    },

    UPLOAD: {
        WINDOW_MS: 60 * 1000,
        MAX_REQUESTS: 15,
    }

};
