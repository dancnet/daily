export const load = async (loadEvent) => {
    const { url } = loadEvent;
    return { url: url.href };
}