import React, { Fragment, useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { clearAlert, setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import { getNotes, saveNote } from "../../actions/note";
import Spinner from "../layout/Spinner";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Parser from "html-react-parser";

import "./notes.css";

const Notes = ({
  getNotes,
  saveNote,
  handleCloseNotes,
  caseID,
  note: { notes, notesLoading },
}) => {
  useEffect(() => {
    getNotes(caseID);
  }, [getNotes, caseID]);

  const [formData, setFormData] = useState({
    note: "",
    caseId: caseID,
  });

  const { note } = formData;

  const addNote = () => {
    saveNote(formData);
    console.log(CKEditor);
    console.log(CKEditor.instances);

    // CKEDITOR.instances.editeur1.setData("your text or html code")

    clearNote();
  };

  const clearNote = () => {
    setFormData({ ...formData, note: "" });
  };

  const onChange = (data) => setFormData({ ...formData, ["note"]: data });

  const notesEndRef = useRef(null);

  const scrollToBottom = () => {
    notesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [notes]);

  return (
    <Fragment>
      <div className="notes-btn">
        {/* <div className="left-btn-ftr-notes">
                    <div className="action-btn-ftr radius-updated"><i className="fa fa-sticky-note-o icon-custom"></i>Notes</div> 
                </div>
                <div className="middle-btn-notes" onClick={() => handleCloseNotes()}> X </div>
                <div className="right-btn-ftr-notes">
                    <div className="action-btn-ftr action-btn-right radius-updated-right"><i className="fa fa-comments-o icon-custom" aria-hidden="true"></i>Discussion Board</div>
                </div> */}
        <div className="left-btn-ftr-notes">
          <div className="action-btn-ftr-full">
            <i className="fa fa-sticky-note-o icon-custom"></i>Notes
            <span className="close-notes" onClick={() => handleCloseNotes()}>
              {" "}
              X{" "}
            </span>
          </div>
        </div>
      </div>
      <div className="notes-show" id="style-11">
        {notesLoading && <Spinner />}
        <div className="notes-area">
          {notes.map((note) => (
            <div className="new-note" key={note.id}>
              {Parser(note.note)}
            </div>
          ))}
          <div ref={notesEndRef} />
        </div>
      </div>

      <div className="footer-area-txt-right">
        <CKEditor
          editor={ClassicEditor}
          style={{ width: "90%" }}
          data={formData["note"]}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            let tempEvent = {};

            // onChange(data)
            const data = editor.getData();
            setFormData({ ...formData, ["note"]: data });

            console.log("On change event called", { event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
        {/* <textarea 
                    className="form-control form-custom" 
                    placeholder="Add Notes"
                    name="note"
                    value={note}
                    onChange={e => onChange(e)}
                    ></textarea> */}
        <button className="btn btn-success" onClick={() => addNote()}>
          Save Note
        </button>
      </div>
    </Fragment>
  );
};

Notes.propTypes = {
  getNotes: PropTypes.func.isRequired,
  saveNote: PropTypes.func.isRequired,
  handleCloseNotes: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  note: state.note,
});

export default connect(mapStateToProps, { getNotes, saveNote })(Notes);
