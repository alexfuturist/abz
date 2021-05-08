import {
    usersAPI
} from "../api/api";

const SET_PAGE = 'SET_PAGE';
const SET_TOTAL_PAGES = 'SET_TOTAL_PAGES';
const SET_USERS = 'SET_USERS';
const CLEAR_USERS = 'CLEAR_USERS';

let initialState = {
    success: false,
    page: 0,
    total_pages: null,
    total_users: null,
    count: 5,
    links: {
        "next_url": "https://frontend-test-assignment-api.abz.agency/api/v1/users?page=2&count=5",
        "prev_url": null
    },
    users: []
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_USERS: {
            return {
                ...state,
                //добавляем новых юзеров из экшена (склеиваем два массива)
                users: [...state.users, ...action.users]
            }
        }

        case CLEAR_USERS: {
            return {
                ...state,
                users: []
            }
        }

        case SET_PAGE: {
            return {
                ...state,
                page: action.page
            }
        }

        case SET_TOTAL_PAGES: {
            return {
                ...state,
                total_pages: action.totalPages
            }
        }

        default:
            return state;
    }
}

//AC
export const setPage = (page) => ({
    type: SET_PAGE,
    page
});

export const setTotalPages = (totalPages) => ({
    type: SET_TOTAL_PAGES,
    totalPages
});

export const setUsers = (users) => ({
    type: SET_USERS,
    users
});

export const clearUsers = () => ({
    type: CLEAR_USERS
});

//TC
export const getUsers = (currentPage, pageSize) => async (dispatch) => {
    //side-effect
    let data = await usersAPI.getUsers(currentPage, pageSize);

    dispatch(setPage(data.page));
    dispatch(setTotalPages(data.total_pages));
    dispatch(setUsers(data.users));

    // dispatch(setTotalUsersCount(data.totalCount));
};

export const updateUsers = (pageNumber, pageSize) => async (dispatch) => {
    //side-effect
    let data = await usersAPI.getUsers(pageNumber, pageSize);

    dispatch(setUsers(data.items));
};

export default usersReducer;