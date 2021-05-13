import React, { Fragment, useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { clearAlert, setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { getNotes, saveNote } from '../../actions/note';
import Spinner from '../layout/Spinner';

const Notes = ({ getNotes, saveNote, handleCloseNotes, caseID, note: { notes, notesLoading } }) => {

    useEffect(() => {
        getNotes(caseID);
      }, [getNotes, caseID]);
    
    const [formData, setFormData] = useState({
        note: '',
        caseId: caseID
    });

    const { note } = formData;

    const addNote = () => {
        saveNote(formData);
        clearNote();
    }

    const clearNote = () => {
        setFormData({...formData, note : ''});
    }

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const notesEndRef = useRef(null)

    const scrollToBottom = () => {
        notesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

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
                        <span className="close-notes" onClick={() => handleCloseNotes()}> X </span></div> 
            
                </div>

            </div>
            <div className="notes-show"id="style-11">
                {notesLoading && <Spinner /> }
                <div className="notes-area" >
                {notes.map(note => (
                    <div className="new-note" key={note.id}>{note.note}</div>
                ))} 
                <div ref={notesEndRef} />
                </div>
            </div>

            <div className="footer-area-txt-right">
                <textarea 
                    className="form-control form-custom" 
                    placeholder="Add Notes"
                    name="note"
                    value={note}
                    onChange={e => onChange(e)}
                    ></textarea>
                <button className="btn btn-success" onClick={() => addNote()}>Save Note</button>
            </div>
        </Fragment>
    );
};

Notes.propTypes = {
    getNotes: PropTypes.func.isRequired,
    saveNote: PropTypes.func.isRequired,
    handleCloseNotes: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    note: state.note,
});

export default connect(mapStateToProps, {getNotes, saveNote})(Notes);
