import {
    BsSearch as SearchIcon,
    BsBookmarkCheck as FollowingIcon,
    BsBookmark as FollowIcon,
    BsBook as AboutIcon,
    BsList as MenuIcon,
    BsX as CloseIcon,
    BsInfoCircle as InfoIcon, 
    BsChevronDown as DownArrowChevron,
    BsArrowUp as UpArrow,
    BsArrowsCollapse as CollapseBtn,
    BsPlay as PlayBtn,
    BsPause as PauseBtn,
    BsVolumeUp as VolUpBtn,
    BsVolumeDown as VolDwnBtn,
    BsVolumeMute as MuteBtn,
} from 'react-icons/bs';

const strippedText = text => text.replace(/(<([^>]+)>)/gi, "");

const getURL = (path, data, verbose) => {
    let query = data ? Object.entries(data).filter(e => e[1]).map(e => `${e[0]}=${e[1]}`).join('&') : null;
    const url = `/api/v1/${path}${query ? '?' + query : ''}`;
    if (verbose) {
        console.log(url)
    }
    return encodeURI(url)
};

const  isInViewport = element => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

export {
    strippedText,
    getURL,
    isInViewport,
    SearchIcon,
    FollowingIcon,
    FollowIcon,
    AboutIcon,
    InfoIcon,
    MenuIcon,
    CloseIcon,
    UpArrow,
    DownArrowChevron,
    PlayBtn,
    PauseBtn,
    VolUpBtn,
    VolDwnBtn,
    MuteBtn,
    CollapseBtn,
};