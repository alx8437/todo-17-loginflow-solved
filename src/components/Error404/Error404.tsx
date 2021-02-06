import React from "react";
import s from "./Error404.module.css"

import {NavLink} from "react-router-dom";

function Error404() {
    return (
        <div className={s.wrapper}>
            <div className={s.error} >404</div>
            <div>Page not found!</div>
            <div>—ฅ/ᐠ.̫ .ᐟ\ฅ—</div>
            <button className={s.button}>
                <NavLink to={"/"} className={s.navlink}>Go home page</NavLink>
            </button>
        </div>
    );
}

export default Error404;
