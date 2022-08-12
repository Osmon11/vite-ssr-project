import cookie_js from "cookie_js";

export const editorConfig = {
  language: "en",
  toolbar: {
    items: [
      "heading",
      "|",
      "bold",
      "italic",
      "link",
      "underline",
      "highlight",
      "|",
      "bulletedList",
      "numberedList",
      "|",
      "outdent",
      "alignment",
      "indent",
      "|",
      "imageInsert",
      "blockQuote",
      "insertTable",
      "mediaEmbed",
      "|",
      "fontBackgroundColor",
      "fontColor",
      "fontFamily",
      "fontSize",
      "|",
      "undo",
      "findAndReplace",
      "redo",
      "|",
      "removeFormat",
      "sourceEditing",
      "code",
      "codeBlock",
      "horizontalLine",
    ],
  },
  image: {
    toolbar: [
      "imageTextAlternative",
      "imageStyle:inline",
      "imageStyle:block",
      "imageStyle:side",
      "linkImage",
    ],
  },
  table: {
    contentToolbar: [
      "tableColumn",
      "tableRow",
      "mergeTableCells",
      "tableCellProperties",
      "tableProperties",
    ],
  },
  htmlSupport: {
    allow: [
      {
        name: "iframe",
        attributes: true,
        classes: true,
        styles: true,
      },
      {
        name: "video",
        attributes: true,
        classes: true,
        styles: true,
      },
    ],
  },
  uploadAdapter: {
    uploadUrl: `${import.meta.env.VITE_API_URL}/editor-uploads`,
    useFetch: true, // optional
    headers: { Authorization: cookie_js.get(import.meta.env.VITE_TOKEN_KEY) }, // optional (eg. in asp.net core for CSRF prevention you would have headers : { "RequestVerificationToken": _serverSideGeneratedCSRFToken })
  },
};
