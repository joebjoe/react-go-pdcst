const get_url = (path, data) => {
    let query = data ? Object.entries(data).filter(e => e[1]).map(e => `${e[0]}=${e[1]}`).join('&') : null;
    return encodeURI(`/api/v1/${path}${query ? '?' + query : ''}`)
};

export { get_url };