function isValidUrlFormat(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

export async function checkUrl(url: string): Promise<boolean> {
    if (!isValidUrlFormat(url)) return false;

    try {
        const response = await fetch(url, { method: "HEAD" });
        return response.ok;
    } catch {
        return false;
    }
}