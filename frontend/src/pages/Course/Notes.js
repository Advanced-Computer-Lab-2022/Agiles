import React from "react";
import style from "./SubtitleView.module.css";

function Notes() {
  return (
    <section className={style["main-section-left-bottom"]}>
      <h3>Notes</h3>
      <div class="form-group">
        <label for="exampleFormControlTextarea1">Write Your Notes Here</label>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="8"
          value={notes}
          onChange={handleNotesChange}
        ></textarea>
        <div>
          <button onClick={downloadPDFFile}>Download Notes</button>
          <button onClick={saveNotes}>save Notes</button>
        </div>
      </div>
    </section>
  );
}

export default Notes;
