export function formatDate (isoString: string) : string {
    const date = new Date(isoString);
    const formatDate = new Intl.DateTimeFormat('es-Es', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
    return formatDate.format(date)
}