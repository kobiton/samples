const username = process.env.KOBITON_USERNAME
const apiKey = process.env.KOBITON_APIKEY
const groupId = process.env.KOBITON_GROUP_ID || 0

const headers = {
    'Accept': 'application/json',
}

export {username, apiKey, groupId}
