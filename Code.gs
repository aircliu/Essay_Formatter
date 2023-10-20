const onOpen = () => {
  DocumentApp.getUi()
    .createAddonMenu()
    .addItem("Open Formatter", "showSidebar")
    .addToUi();
};

const showSidebar = () => {
  const html = HtmlService.createHtmlOutputFromFile("index.html")
    .setTitle("MLA/APA Formatter")
    .setWidth(300);
  DocumentApp.getUi().showSidebar(html);
};

const formatGoogleDoc = (firstName, lastName, prof, course, date) => {
  const doc = DocumentApp.getActiveDocument();
  const body = doc.getBody();

  // body.editAsText().appendText(firstName + " " + lastName);
  // body.appendParagraph(prof);  // body.editAsText().appendText(prof);
  // body.appendParagraph(course);
  // body.appendParagraph(date);

  body.insertParagraph(0, firstName + " " + lastName);
  body.insertParagraph(1, prof);
  body.insertParagraph(2, course);
  body.insertParagraph(3, date);

  body.setFontFamily("Times New Roman");
  body.setFontSize(12);

  const paragraphs = body.getParagraphs();

  for (let i = 0; i < paragraphs.length; i++) {
    paragraphs[i].setLineSpacing(2.0);
  }

  doc.saveAndClose();
};

const saveTemplate = (templateData) => {
  const scriptProperties = PropertiesService.getScriptProperties();
  let savedTemplates = scriptProperties.getProperty("TEMPLATES");

  if (savedTemplates) {
    savedTemplates = JSON.parse(savedTemplates);
  } else {
    savedTemplates = [];
  }

  savedTemplates.push(templateData);
  scriptProperties.setProperty("TEMPLATES", JSON.stringify(savedTemplates));
};

const getSavedTemplates = () => {
  const scriptProperties = PropertiesService.getScriptProperties();
  const templates = scriptProperties.getProperty("TEMPLATES");

  if (templates) {
    return JSON.parse(templates);
  } else {
    return [];
  }
};

const formatTextInGoogleDoc = () => {
  const doc = DocumentApp.getActiveDocument();
  const body = doc.getBody();

  const paragraphs = body.getParagraphs();
  for (let i = 0; i < Math.min(paragraphs.length, 4); i++) {
    const line = paragraphs[i].editAsText();
    line.setFontFamily("Times New Roman");
    line.setFontSize(12);
  }

  doc.saveAndClose();
};

const isFormatted = (firstName, lastName, prof, course, date) => {
  const doc = DocumentApp.getActiveDocument();
  const body = doc.getBody();

  // Get the entire document text
  const documentText = body.getText();

  // Split the text into lines
  const lines = documentText.split("\n");

  // Check if there are at least four lines
  if (lines.length >= 4) {
    const line1 = lines[0];
    const line2 = lines[1];
    const line3 = lines[2];
    const line4 = lines[3];

    const name = firstName + " " + lastName;

    if (line1 === name && line2 === prof && line3 === course && line4 === date)
      return true;
    else return false;
  } else {
    return false;
  }
};

const getCurrUser = () => {
  const currUser =  Session.getActiveUser().getEmail();
  Logger.log(currUser);
};
