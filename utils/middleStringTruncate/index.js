export const middleStringTruncate = (word, start, end) => {
    const lowerMiddle = word.slice(0, start).concat('...')
    const upperMiddle = word.slice(word.length - end, word.length)
    return lowerMiddle + upperMiddle
}