import classNames from "classnames";
import styles from "./page.module.css";
import Link from "next/link";
export default function Form() {
  return (
    <>
      <div className="container">
        <div className="row justify-content-center align-content-center">
          <div className="col-sm-8 h-75">
            <div className="card bg-secondary p-2 my-3">
              <form>
                <div className={styles.form_group}>
                  <label htmlFor="studentName" className={styles.form_label}>
                    Student:
                  </label>
                  <select className="form-select" id="studentName">
                    <option>Select student</option>
                    {/* Add options here */}
                  </select>
                </div>
                <div className={styles.form_group}>
                  <label className={styles.form_label}>Type:</label>

                  <div>
                    <input className="mx-3" type="radio" id="tambeeh" name="type" value="tambeeh" />
                    <label htmlFor="tambeeh" className="form-check-label">
                      Tambeeh
                    </label>
                  </div>
                  <div>
                    <input className="mx-3" type="radio" id="tashjee" name="type" value="tashjee" />
                    <label htmlFor="tashjee" className="form-check-label">
                      Tashjee
                    </label>
                  </div>
                </div>
                <div className={styles.form_group}>
                  <label htmlFor="category" className={styles.form_label}>
                    Category:
                  </label>
                  <select className="form-select" id="category">
                    <option>Select category</option>
                    {/* Add options here */}
                  </select>
                </div>
                <div className={styles.form_group}>
                  <label htmlFor="event" className={styles.form_label}>
                    Situation:
                  </label>
                  <select className="form-select" id="event">
                    <option>Select event</option>
                    {/* Add options here */}
                  </select>
                </div>
                <div className={styles.form_group}>
                  <label htmlFor="points" className={styles.form_label}>
                    Points:
                  </label>
                  <input type="number" className="form-control" id="points" />
                </div>
                <div className={(classNames(styles.form_group), "d-block")}>
                  <label htmlFor="notes" className={styles.form_label}>
                    Notes (Optional):
                  </label>
                  <textarea className="form-control" id="notes" rows={3}></textarea>
                </div>
                <div className={(classNames(styles.form_group), "form-check mt-3")}>
                  <input type="checkbox" className="form-check-input" id="sendEmail" />
                  Send Email
                  <label className="form-check-label" htmlFor="sendEmail"></label>
                </div>
                <div className="d-flex justify-content-center">
                  <Link href="/form/form-submit">
                    <button type="button" className="btn btn-primary">
                      Submit
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
