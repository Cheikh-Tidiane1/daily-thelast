export const ICONS = {
  all: `<svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`,
  javascript: `<svg viewBox="0 0 24 24"><path d="M3 3h18v18H3V3zm10.5 13.5h3v-9h-3v9zm-4.5 0V12H6v4.5h3z"/></svg>`,
  python: `<svg viewBox="0 0 24 24"><path d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/></svg>`,
  webdev: `<svg viewBox="0 0 24 24"><path d="M19 9h-4V5H9v4H5v6h4v4h6v-4h4V9zm-8 8H9v-2h2v2zm0-4H9v-2h2v2zm0-4H9V7h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"/></svg>`,
  devops: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`,
  react: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.26.02-.52.05-.78L8 12l-4-.5C3.4 12.3 3 13.13 3 14c0 3.87 3.13 7 7 7v-3l4-4 4 4v3c3.87 0 7-3.13 7-7 0-.87-.4-1.7-1-2.5L16 11.5V12c0 4.41-3.59 8-8 8z"/></svg>`,
  rust: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>`,
  ai: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>`,
  github: `<svg viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.497.5.09.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.605-3.369-1.34-3.369-1.34-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.029 1.592 1.029 2.683 0 3.843-2.339 4.687-4.566 4.935.359.31.678.92.678 1.854 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.139 20.163 22 16.42 22 12c0-5.523-4.477-10-10-10z"/></svg>`,
  beginners: `<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>`,
  tutorial: `<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/></svg>`
}

export const svg = `
<svg width="300" height="160" xmlns="http://www.w3.org/2000/svg">
<rect width="300" height="160" fill="${color.bg}"/>
<foreignObject width="280" height="140" x="10" y="10">
<div xmlns="http://www.w3.org/1999/xhtml" style="
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 20px;
box-sizing: border-box;
font-family: Arial, sans-serif;
">
<div style="
color: ${color.text};
font-size: 16px;
font-weight: bold;
text-align: center;
line-height: 1.4;
margin-bottom: 10px;
">${escapeHtml(title)}</div>
<div style="
color: ${color.text};
opacity: 0.8;
font-size: 12px;
background: rgba(0,0,0,0.2);
padding: 4px 12px;
border-radius: 12px;
">#${escapeHtml(firstTag)}</div>
</div>
</foreignObject>
</svg>
`
