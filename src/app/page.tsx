import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="container-fluid d-flex justify-content-between bg-primary">
        <Image src="/maz_logo_banner.png" alt="logo" width={60} height={60} />
        <nav className="navbar navbar-expand-sm">
          <div className="container-fluid">
            {/* <a className="navbar-brand" href="#">
                MAZ Tashjee/Tambeeh
              </a> */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Form
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Reports
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">Settings</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <div className="d-flex justify-content-center align-items-center h-100">
        <button className="btn btn-lg bg-secondary w-50 fs-1 fw-bold" style={{ height: "10vh" }}>
          Start
        </button>
      </div>
    </>
  );
}
