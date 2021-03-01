const get_url = (path, data, verbose) => {
    let query = data ? Object.entries(data).filter(e => e[1]).map(e => `${e[0]}=${e[1]}`).join('&') : null;
    const url = `/api/v1/${path}${query ? '?' + query : ''}`;
    if (verbose) {
        console.log(url)
    }
    return encodeURI(url)
};

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

export { 
    get_url,
    isInViewport
};