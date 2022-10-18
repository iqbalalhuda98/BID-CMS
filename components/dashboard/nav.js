import React from "react";
import Link from "next/link";
import { logout } from "../../utils/auth";

function Nav({ open }) {
  return (
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link href="/events" passHref>
          <a className="nav-link active" href="#">
            Events
          </a>
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/tickets" passHref>
          <a className="nav-link" href="#">
            Tickets
          </a>
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/participants" passHref>
          <a className="nav-link" href="#">
            Participants
          </a>
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/levels" passHref>
          <a className="nav-link" href="#">
            Referral Levels
          </a>
        </Link>
      </li>
      <li className="nav-item mt-2 ms-3">
        <button className="btn btn-outline-primary" onClick={logout}>
          logout
        </button>
      </li>
    </ul>
  );
}

export default Nav;
