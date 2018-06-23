export function getDbUrl(el: HTMLElement) {
    let dbUrl: string | null = "";
    while (el.parentNode) {
        el = el.parentNode as HTMLElement;
        dbUrl = el.getAttribute("data-filteredlistingurl");
        if (dbUrl) {
            return dbUrl;
        } else if (el.tagName.toLowerCase() === "body") {
            return;
        }
    }

    return;
}
