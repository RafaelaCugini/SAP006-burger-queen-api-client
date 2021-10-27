import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useHistory } from "react-router";

export function LogoutButton() {
    const history = useHistory();
    return (
        <span>

            <FiLogOut className="LogoutBtn"
                onClick={() => {
                    localStorage.removeItem("usersToken")
                    history.push('/login')
                }}
            />
        </span>
    )
}