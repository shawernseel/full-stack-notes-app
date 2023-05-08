export function formateDate(dateString: string): string { //declaring return type not nessesary but safer
    return new Date(dateString).toLocaleString("en-US",
    {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    }) //first arg is string, 2nd is javascript object
}