const wishes = [
    {
        id: 1, who: 'KHJ', what: 'stuff', why: 'just because', starred: false,
    },
    {
        id: 2, who: 'KHJ', what: 'more stuff', why: 'just because!!!', starred: true,
    },
]

// simulate API delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export default {
    async getWishes() {
        await delay(2000)
        return wishes
    },
}

