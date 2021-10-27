import { useEffect } from "react";

export const isAuthenticated = () => {
    const token = localStorage.getItem("usersToken");
    if (token) {
        return true;
    } else {
        return false;
    }
}

export const convertTime = (apiTime) => {
    const getDate = new Date(apiTime);
    let getHours = getDate.getHours();
    let getMinutes = getDate.getMinutes();

    if (getHours <= 9) { getHours = `0${getHours}` }
    if (getMinutes <= 9) { getMinutes = `0${getMinutes}` }
    const correctTime = `${getHours}:${getMinutes}`

    return correctTime;
}

export const prepareTime = (createdAt, updatedAt) => {
    const d1 = new Date(createdAt)//.getTime()
    const d2 = new Date(updatedAt)//.getTime()
    const timeTotal = parseInt(Math.abs(d2.getTime() - d1.getTime()) / (1000 * 60) % 60);
    console.log(timeTotal)
    return timeTotal;
}

export const convertDate = (apiDate) => {

    const getDate = new Date(apiDate);
    let getDay = getDate.getDate();
    let getMonth = getDate.getMonth() + 1;

    if (getDay <= 9) { getDay = `0${getDay}` };
    if (getMonth <= 9) { getMonth = `0${getMonth}` };
    const correctDate = `${getDay}/${getMonth}`;

    return correctDate;
}

export const Background = () => {
    useEffect(() => {
        const body = document.body;
        body.classList.add("internal-bg")

        return () => {
            body.classList.remove("internal-bg")
        }
    }, [])
}