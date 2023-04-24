export const load = async (loadEvent) => {
    const { url, data } = loadEvent;
    return { url: url.href, ...data };
}