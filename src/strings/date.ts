const locale = "en-US";


const formatters = {
    // @ts-ignore - is showing es5 def instead of es6
    full: new Intl.DateTimeFormat(locale, {dateStyle: 'long'}),
    // @ts-ignore
    abbr: new Intl.DateTimeFormat(locale, {dateStyle: 'medium'}),
}

export const postPublished = (dateTime: string, fullMonth = false) => {
    const date = new Date(dateTime);
    return date.toLocaleString( locale, {
        // @ts-ignore - is showing es5 def instead of es6
        dateStyle: fullMonth ? 'long' : 'medium'
    });
}
