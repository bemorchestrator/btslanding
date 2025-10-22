import { useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = 'Start writing your article...'
}: RichTextEditorProps) {

  // Quill modules configuration
  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['link', 'image'],
      [{ 'color': [] }, { 'background': [] }],
      ['blockquote', 'code-block'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false,
    }
  }), []);

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent',
    'link', 'image',
    'align',
    'color', 'background',
    'blockquote', 'code-block'
  ];

  return (
    <div className="rich-text-editor">
      <style>{`
        .ql-container {
          font-size: 16px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .ql-editor {
          min-height: 500px;
          background: #2a2a2a;
          color: #fff;
        }

        .ql-editor.ql-blank::before {
          color: #6b7280;
          font-style: italic;
        }

        .ql-toolbar {
          background: #1a1a1a;
          border: 1px solid #3a3a3a !important;
          border-bottom: none !important;
        }

        .ql-container {
          border: 1px solid #3a3a3a !important;
        }

        .ql-stroke {
          stroke: #9ca3af !important;
        }

        .ql-fill {
          fill: #9ca3af !important;
        }

        .ql-picker-label {
          color: #9ca3af !important;
        }

        .ql-toolbar button:hover .ql-stroke,
        .ql-toolbar button:focus .ql-stroke,
        .ql-toolbar button.ql-active .ql-stroke {
          stroke: #d4af37 !important;
        }

        .ql-toolbar button:hover .ql-fill,
        .ql-toolbar button:focus .ql-fill,
        .ql-toolbar button.ql-active .ql-fill {
          fill: #d4af37 !important;
        }

        .ql-toolbar button:hover,
        .ql-toolbar button:focus,
        .ql-toolbar button.ql-active {
          background: #3a3a3a;
        }

        .ql-picker-options {
          background: #2a2a2a;
          border: 1px solid #3a3a3a;
        }

        .ql-picker-item:hover {
          color: #d4af37 !important;
        }

        .ql-editor h1, .ql-editor h2, .ql-editor h3,
        .ql-editor h4, .ql-editor h5, .ql-editor h6 {
          color: #fff;
        }

        .ql-editor a {
          color: #d4af37;
        }

        .ql-editor blockquote {
          border-left: 4px solid #d4af37;
          padding-left: 16px;
          color: #d1d5db;
        }

        .ql-editor code,
        .ql-editor pre {
          background: #1a1a1a;
          color: #10b981;
        }
      `}</style>

      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    </div>
  );
}
