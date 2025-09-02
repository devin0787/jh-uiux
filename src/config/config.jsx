import { testConfig } from "./testConfig.js";
export const BackendURL = "https://uiux-backend-9ovb.onrender.com";
// export const BackendURL = "http://localhost:3000";

export const UNIQUE = "ASDF";
export const MSG_INVALID_LINK = "Invalid Invite Link!";
export const Suffix = ["quiz", "vintro", "iprep"];
export { testConfig };

export const getRedirectURL = (uuid, pageID) => {
    return `/invite/${uuid}/${Suffix[pageID]}`;
};


export const getTestUUIDByURI = (uri) => {
    const data = uri.split("/");

    if (data.length <= 3) {
        return MSG_INVALID_LINK;
    }

    if (data.length > 4) {
        if (data[3] != 'invite') {
            return MSG_INVALID_LINK;
        }
    }

    const uuid = data[4];

    if (uuid == undefined) {
        return MSG_INVALID_LINK;
    }

    const keys = Object.keys(testConfig);
    for (let i = 0; i < keys.length; i++) {
        if (uuid.startsWith(keys[i])) {
            return keys[i];
        }
    }

    return MSG_INVALID_LINK;
};

export const getInviteUUIDByURI = (uri) => {
    const data = uri.split("/");

    if (data.length <= 3) {
        return MSG_INVALID_LINK;
    }

    if (data.length > 4) {
        if (data[3] != 'invite') {
            return MSG_INVALID_LINK;
        }
    }

    const uuid = data[4];

    return uuid;
};

export const getAllTests = () => {
    return Object.keys(testConfig);
};

export const validateInviteParam = (param) => {
    const keys = Object.keys(testConfig);

    for (let i = 0; i < keys.length; i++) {
        if (param.startsWith(keys[i])) {
            const data = param.split('/');
            return data[0];
        }
    }

    return null;
};