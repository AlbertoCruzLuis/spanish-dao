import Fuse from 'fuse.js'

export const filer = (data, options, query) => {
    const fuse = new Fuse(data, options)

    const result = fuse.search(query)
    const filteredResult = result.map((result) => result.item)

    return filteredResult
}