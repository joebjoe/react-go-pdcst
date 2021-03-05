import { BiSearchAlt as SearchIcon } from 'react-icons/bi';
import {
    BsBookmarkCheck as FollowingIcon,
    BsBookmark as FollowIcon
} from 'react-icons/bs';
import { CgReadme as AboutIcon } from 'react-icons/cg';
import { GoInfo as InfoIcon } from 'react-icons/go';
import { HiOutlineMenuAlt4 as MenuIcon } from 'react-icons/hi';
import { IoClose as CloseIcon } from "react-icons/io5";
import { GrDown as DownArrowChevron } from 'react-icons/gr';
import { MdArrowUpward as UpArrow } from 'react-icons/md';

const strippedText = text => text.replace(/(<([^>]+)>)/gi, "");

const get_url = (path, data, verbose) => {
    let query = data ? Object.entries(data).filter(e => e[1]).map(e => `${e[0]}=${e[1]}`).join('&') : null;
    const url = `/api/v1/${path}${query ? '?' + query : ''}`;
    if (verbose) {
        console.log(url)
    }
    return encodeURI(url)
};

const following_storage_key = 'PDCST_following';

const getFollowing = () => {
    let raw = localStorage.getItem(following_storage_key);
    return JSON.parse(raw) || [];
}

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
    get_url,
    isInViewport,
    following_storage_key,
    getFollowing,
    SearchIcon,
    FollowingIcon,
    FollowIcon,
    AboutIcon,
    InfoIcon,
    MenuIcon,
    CloseIcon,
    UpArrow,
    DownArrowChevron,
};