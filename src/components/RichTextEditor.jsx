import React, { useEffect, useState, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill's default theme
import './RichTextEditor.css';

function RichTextEditor({ className, setAnswers, answers, currentQuestion }) {
    const updateAnswer = (answer) => {
        let newAnswers = [...answers];
        newAnswers[currentQuestion] = answer;
        setAnswers(newAnswers);

        // console.log(newAnswers);
    };  

    const getInitAnswer = () => {
        if (currentQuestion < 0) {
            setValue("");
        } else {
            setValue(answers[currentQuestion]);
        }
    };

    const [value, setValue] = useState("");

    const handleChange = (content) => {
        setValue(content);
        updateAnswer(content);
    };

    useEffect(() => {
        getInitAnswer();
    }, [currentQuestion]);

    // Toolbar configuration with custom font size dropdown
    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            [{ font: [] }],
            [
                { size: [ 'small', false, 'large', 'huge' ] } // Use the registered sizes in the dropdown
            ],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    // Define what formats can be applied to the content
    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];

    return (
        <div className={`editor-container w-full ${className}`}>
            <ReactQuill
                theme="snow"  // Use the snow theme
                value={value} // Set the editor's content
                onChange={handleChange} // Handle content change
                modules={modules} // Set toolbar options
                formats={formats} // Set allowed formats
                placeholder="Write something..." // Placeholder text
            />
        </div>
    );
}

export default RichTextEditor;
