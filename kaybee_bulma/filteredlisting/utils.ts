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

export function getFilterParent(el: HTMLElement) {
    let filterParent: string | null = "";
    while (el.parentNode) {
        el = el.parentNode as HTMLElement;
        filterParent = el.getAttribute("data-filteredlisting-parent");
        if (filterParent) {
            return filterParent;
        } else if (el.tagName.toLowerCase() === "body") {
            return;
        }
    }

    return;
}
