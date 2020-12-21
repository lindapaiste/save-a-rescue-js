/**
 * appends an existing class name if not empty
 */
export const addClass = (existing?: string, added?: string): string | undefined => {
    return added ? `${existing || ''} ${added}` : existing;
}

export const combineClasses = (classes: (string | undefined)[]): string | undefined => {
    return classes.reduce(addClass);
}
