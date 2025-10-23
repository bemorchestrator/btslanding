import { useMemo, useRef, useEffect } from 'react';
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
  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();

      // Override the link handler to auto-add https://
      const toolbar = quill.getModule('toolbar');
      toolbar.addHandler('link', function(this: { quill: { format: (name: string, value: string | boolean) => void } }, value: boolean) {
        if (value) {
          let href = prompt('Enter the URL');
          if (href) {
            // Auto-add https:// if no protocol is specified
            if (href && !href.match(/^https?:\/\//) && !href.startsWith('/') && !href.startsWith('#')) {
              href = 'https://' + href;
            }
            this.quill.format('link', href);
          }
        } else {
          this.quill.format('link', false);
        }
      });
    }
  }, []);

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
          position: sticky;
          top: 0;
          z-index: 10;
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

        /* Link tooltip/dialog styling */
        .ql-tooltip {
          background-color: #2a2a2a !important;
          border: 1px solid #3a3a3a !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3) !important;
          color: #fff !important;
          z-index: 1001 !important;
        }

        .ql-tooltip::before {
          border-bottom-color: #3a3a3a !important;
        }

        .ql-tooltip.ql-flip::before {
          border-top-color: #3a3a3a !important;
        }

        .ql-tooltip input[type="text"] {
          background: #1a1a1a !important;
          border: 1px solid #3a3a3a !important;
          color: #fff !important;
          padding: 5px 10px !important;
          border-radius: 4px !important;
        }

        .ql-tooltip input[type="text"]::placeholder {
          color: #6b7280 !important;
        }

        .ql-tooltip input[type="text"]:focus {
          outline: none !important;
          border-color: #d4af37 !important;
        }

        .ql-tooltip a {
          color: #d4af37 !important;
        }

        .ql-tooltip a:hover {
          color: #fbbf24 !important;
        }

        .ql-tooltip .ql-action::before,
        .ql-tooltip .ql-remove::before {
          color: #9ca3af !important;
        }

        .ql-tooltip .ql-action:hover::before,
        .ql-tooltip .ql-remove:hover::before {
          color: #d4af37 !important;
        }

        .ql-tooltip.ql-editing input[type="text"] {
          display: inline-block !important;
        }

        .ql-tooltip .ql-preview {
          color: #d4af37 !important;
          text-decoration: none !important;
        }

        .ql-tooltip .ql-preview:hover {
          text-decoration: underline !important;
        }

        /* Tooltips for toolbar buttons ONLY (not picker labels) */
        .ql-toolbar button {
          position: relative;
        }

        .ql-toolbar button::after {
          content: attr(data-tooltip);
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(8px);
          background: #1a1a1a;
          color: #fff;
          padding: 6px 10px;
          border-radius: 4px;
          font-size: 12px;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.15s ease;
          border: 1px solid #3a3a3a;
          z-index: 1000;
        }

        .ql-toolbar button:hover::after {
          opacity: 1;
        }

        /* Tooltip arrow */
        .ql-toolbar button::before {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(2px);
          border: 6px solid transparent;
          border-bottom-color: #3a3a3a;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.15s ease;
          z-index: 1000;
        }

        .ql-toolbar button:hover::before {
          opacity: 1;
        }

        /* Specific button tooltips using attribute selectors */
        .ql-toolbar button.ql-bold::after { content: 'Bold'; }
        .ql-toolbar button.ql-italic::after { content: 'Italic'; }
        .ql-toolbar button.ql-underline::after { content: 'Underline'; }
        .ql-toolbar button.ql-strike::after { content: 'Strikethrough'; }
        .ql-toolbar button.ql-link::after { content: 'Insert Link'; }
        .ql-toolbar button.ql-image::after { content: 'Insert Image'; }
        .ql-toolbar button.ql-blockquote::after { content: 'Blockquote'; }
        .ql-toolbar button.ql-code-block::after { content: 'Code Block'; }
        .ql-toolbar button.ql-clean::after { content: 'Clear Formatting'; }
        .ql-toolbar button.ql-list[value="ordered"]::after { content: 'Numbered List'; }
        .ql-toolbar button.ql-list[value="bullet"]::after { content: 'Bullet List'; }
        .ql-toolbar button.ql-indent[value="-1"]::after { content: 'Decrease Indent'; }
        .ql-toolbar button.ql-indent[value="+1"]::after { content: 'Increase Indent'; }
      `}</style>

      <ReactQuill
        ref={quillRef}
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
