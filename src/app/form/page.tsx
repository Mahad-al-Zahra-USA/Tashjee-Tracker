"use client";

import classNames from "classnames";
import styles from "./page.module.css";
import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Select from "react-select"; // Library for custom select dropdowns

interface Student {
  id: string;
  first_name: string;
  last_name: string;
  house_id: number;
}

interface StudentOption {
  value: string;
  label: string;
}

interface Event {
  id: number; // This is actually the event_types_id
  name: string;
  description: string;
  points: number;
  send_email: boolean;
}

export default function Form() {
  const [students, setStudents] = useState<Student[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [points, setPoints] = useState<number>(0);
  const [sendEmail, setSendEmail] = useState<boolean>(false);
  const [selectedStudents, setSelectedStudents] = useState<StudentOption[]>([]);

  // Map students to options for the Select component
  const studentOptions: { value: string; label: string }[] = students.map((student) => ({
    value: student.id,
    label: `${student.first_name} ${student.last_name}`,
  }));

  // Router hook to redirect after form submission
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const [studentsRes, categoriesRes, eventsRes] = await Promise.all([
          fetch("/api/getStudent"),
          fetch("/api/getCategory"),
          fetch("/api/getEvent"),
        ]);

        const studentsData = await studentsRes.json();
        // console.log(studentsData);
        const categoriesData = await categoriesRes.json();
        // console.log(categoriesData);
        const eventsData = await eventsRes.json();
        // console.log(eventsData);

        setStudents(studentsData.data);
        setCategories(categoriesData.data);
        setEvents(eventsData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const handleEventChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const eventTypeId = parseInt(event.target.value, 10);
    const eventObj = events.find((e) => e.id === eventTypeId) || null;
    if (eventObj) {
      setPoints(eventObj.points);
      setSendEmail(eventObj.send_email);
    } else {
      setPoints(0);
      setSendEmail(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    // Get all selected student IDs
    // const select = e.currentTarget.querySelector('select[name="studentName"]') as HTMLSelectElement;
    // const studentIds = Array.from(select.selectedOptions).map((option) => option.value);
    const studentIds = selectedStudents.map((student) => student.value);
    const eventTypeId = formData.get("event");
    const notes = formData.get("notes");
    const sendEmail = formData.get("sendEmail") === "on";

    // Validate multiple students
    if (!studentIds.length) {
      alert("Please select at least one student");
      return;
    }

    // Add validation
    if (!eventTypeId || eventTypeId === "Select event") {
      alert("Please select an event");
      return;
    }

    try {
      const response = await fetch("/api/submitForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentIds: studentIds.map(String), // Ensure UUIDs are passed as strings
          eventTypeId: Number(eventTypeId),
          notes: notes || null,
          sendEmail,
        }),
      });

      const result = await response.json();
      console.log("API Response:", result);
      if (response.ok) {
        // Redirect to the form submission page
        router.push("/form/form-submit");
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center align-content-center">
          <div className="col-sm-8 h-75">
            <div className="card bg-secondary p-2 my-3">
              <form onSubmit={handleSubmit}>
                <div className={styles.form_group}>
                  <label htmlFor="studentName" className={styles.form_label}>
                    Student:
                  </label>
                  <Select
                    isMulti
                    name="studentName"
                    options={studentOptions}
                    className={styles.react_select_container}
                    classNamePrefix="react-select"
                    value={selectedStudents}
                    onMenuOpen={() => console.log(document.querySelectorAll('[class^="custom-select"]'))}
                    onChange={(newValue) => setSelectedStudents(newValue as StudentOption[])}
                    placeholder="Select students"
                  />
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
                  <select className="form-select" id="category" name="category">
                    <option>Select category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.form_group}>
                  <label htmlFor="event" className={styles.form_label}>
                    Situation:
                  </label>
                  <select className="form-select" id="event" name="event" onChange={handleEventChange}>
                    <option>Select event</option>
                    {events.map((event) => (
                      <option key={event.id} value={event.id}>
                        {event.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.form_group}>
                  <label htmlFor="points" className={styles.form_label}>
                    Points:
                  </label>
                  <input type="number" className="form-control" id="points" value={points} readOnly />
                </div>
                <div className={(classNames(styles.form_group), "d-block")}>
                  <label htmlFor="notes" className={styles.form_label}>
                    Notes (Optional):
                  </label>
                  <textarea className="form-control" id="notes" name="notes" rows={3}></textarea>
                </div>
                <div className={(classNames(styles.form_group), "form-check mt-3 ")} hidden>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="sendEmail"
                    name="sendEmail"
                    checked={sendEmail}
                    onChange={(e) => setSendEmail(e.target.checked)}
                  />
                  Send Email
                  <label className="form-check-label" htmlFor="sendEmail"></label>
                </div>
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
