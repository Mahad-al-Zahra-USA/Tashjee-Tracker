import Link from "next/link";
export default function FormSubmition() {
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-6">
            {/* Thank you card */}
            <div className="card bg-primary my-5 py-2 px-3">
              <h5 className="text-center fs-5 fs-sm-3 fs-md-4">
                Shukran for updating the tracker. The points will be reviewed and adjusted accordingly.
              </h5>
            </div>
            {/* New Response button */}
            <Link href="/form">
              <button className="btn bg-secondary w-100 fs-5 fs-sm-3 fs-md-4 fw-bold" style={{ height: "10vh" }}>
                Submit Another Response
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
