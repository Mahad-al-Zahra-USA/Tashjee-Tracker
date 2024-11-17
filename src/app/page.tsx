import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center h-100">
        <Link href="/form" className="btn btn-lg bg-secondary w-50 fs-1 fw-bold" style={{ height: "10vh" }}>
          Start
        </Link>
      </div>
    </>
  );
}
