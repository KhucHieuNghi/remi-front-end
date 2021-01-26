export function setCookie(name: string, value: string, days?: number): void {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value || ''}${expires}; path=/`;
}
export function getCookie(name: string): string | null {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
export function deleteCookie(name: string, path = '/', domain?: string): void {
    if (getCookie(name)) {
        document.cookie = `${name}=${path ? `;path=${path}` : ''}${domain ? `;domain=${domain}` : ''};expires=Thu, 01 Jan 1970 00:00:01 GMT`;
    }
}
