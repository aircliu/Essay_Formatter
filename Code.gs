const onOpen = () => {
  // Create an addon menu in Google Docs
  DocumentApp.getUi()
    .createAddonMenu()
    .addItem("Open Formatter", "showSidebar")
    .addToUi();
};

const showSidebar = () => {
  // Create an HTML sidebar with specified title and width
  const html = HtmlService.createHtmlOutputFromFile("index.html")
    .setTitle("MLA/APA Formatter")
    .setWidth(300);
  DocumentApp.getUi().showSidebar(html);
};

const formatGoogleDoc = (firstName, lastName, prof, course) => {
  // Get the active Google Doc and its body
  const doc = DocumentApp.getActiveDocument();
  const body = doc.getBody();
  const header = doc.getHeader() || doc.addHeader();

  header.clear();
  const headerText = header.appendParagraph(lastName);
  headerText.setAlignment(DocumentApp.HorizontalAlignment.RIGHT);


  // Generate today's date in "MMMM dd, yyyy" format
  const currentDate = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "MMMM dd, yyyy");

  // Check and replace or insert the first four paragraphs
  replaceOrInsertParagraph(body, 0, `${firstName} ${lastName}`);
  replaceOrInsertParagraph(body, 1, prof);
  replaceOrInsertParagraph(body, 2, course);
  replaceOrInsertParagraph(body, 3, currentDate);

  // Save and close the document
  doc.saveAndClose();
};

// Helper function to replace or insert a paragraph
function replaceOrInsertParagraph(body, index, text) {
  const paragraphs = body.getParagraphs();

  if (index < paragraphs.length) {
    // Paragraph exists, so replace its text
    paragraphs[index].setText(text);
  } else {
    // Paragraph doesn't exist, so insert it and apply formatting
    const newParagraph = body.insertParagraph(index, text);
    newParagraph.setLineSpacing(2.0)
                .setFontFamily("Times New Roman")
                .setFontSize(12);
  }
}

const saveTemplate = (templateData, index) => {
  const scriptProperties = PropertiesService.getScriptProperties();
  let templates = JSON.parse(scriptProperties.getProperty("TEMPLATES") || "[]");

  if (index !== undefined && index >= 0 && index < templates.length) {
    // Update existing template
    templates[index] = templateData;
  } else {
    // Add new template
    templates.push(templateData);
  }

  scriptProperties.setProperty("TEMPLATES", JSON.stringify(templates));
};


const getSavedTemplates = () => {
  // Retrieve saved templates from script properties
  const scriptProperties = PropertiesService.getScriptProperties();
  const templates = scriptProperties.getProperty("TEMPLATES");
  Logger.log('Retrieved tempaltes:', templates )

  if (templates) {
    return JSON.parse(templates);
  } else {
    return [];
  }
};

const formatTextInGoogleDoc = () => {
  // Format the first four paragraphs with Times New Roman and font size 12
  const doc = DocumentApp.getActiveDocument();
  const body = doc.getBody();

  const paragraphs = body.getParagraphs();
  for (let i = 0; i < Math.min(paragraphs.length, 4); i++) {
    const line = paragraphs[i].editAsText();
    line.setFontFamily("Times New Roman");
    line.setFontSize(12);
  }

  // Save and close the document
  doc.saveAndClose();
};

const isFormatted = (firstName, lastName, prof, course, date) => {
  // Check if the document is formatted correctly
  const doc = DocumentApp.getActiveDocument();
  const body = doc.getBody();

  const documentText = body.getText();
  const lines = documentText.split("\n");

  if (lines.length >= 4) {
    const line1 = lines[0];
    const line2 = lines[1];
    const line3 = lines[2];
    const line4 = lines[3];

    const name = `${firstName} ${lastName}`;

    return line1 === name && line2 === prof && line3 === course && line4 === date;
  } else {
    return false;
  }
};

const loadTemplateByIndex = (index) => {
  Logger.log('Received index (before parsing):', index);

  // Parse the index to an integer
  index = parseInt(index, 10);
  Logger.log('Parsed index:', index);

  const scriptProperties = PropertiesService.getScriptProperties();
  const templates = JSON.parse(scriptProperties.getProperty("TEMPLATES") || "[]");
  Logger.log('Templates array:', templates);

  // Check if index is valid
  if (!Number.isInteger(index) || index < 0 || index >= templates.length) {
    Logger.log('Invalid index or template not found for index:', index);
    return;
  }

  const selectedTemplate = templates[index];
  Logger.log('Selected template:', selectedTemplate);

  if (selectedTemplate) {
    formatGoogleDoc(
      selectedTemplate.firstName,
      selectedTemplate.lastName,
      selectedTemplate.teacherName,
      selectedTemplate.className,
      selectedTemplate.currentDate
    );
  } else {
    Logger.log('Template not found at index:', index);
  }
};




function openEditDialog(index) {
  var htmlContent ="<p>Test dialog</p>";
  var html = HtmlService.createHtmlOutputFromFile(htmlContent)
    .setWidth(400)
    .setHeight(300);
  DocumentApp.getUi().showModalDialog(html, 'Edit Template');
}

function getTemplateData() {
  var scriptProperties = PropertiesService.getScriptProperties();
  const index = scriptProperties.getProperty("currentEditingIndex");
  const templates = JSON.parse(scriptProperties.getProperty("TEMPLATES") || "[]");
  return templates[parseInt(index, 10)] || {};
}

const startEditingTemplate = (index) => {
  const scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperty("currentEditingIndex", index.toString());
};

// Function to get data for the template being edited
const getEditingTemplateData = () => {
  const scriptProperties = PropertiesService.getScriptProperties();
  const index = scriptProperties.getProperty("currentEditingIndex");
  const templates = JSON.parse(scriptProperties.getProperty("TEMPLATES") || "[]");
  return templates[parseInt(index, 10)] || {};
};


function saveEditedTemplate(index, editedTemplateData) {
  const scriptProperties = PropertiesService.getScriptProperties();
  let templates = JSON.parse(scriptProperties.getProperty("TEMPLATES") || "[]");

  if (index >= 0 && index < templates.length) {
    // Update the template at the specified index
    templates[index] = editedTemplateData;
    scriptProperties.setProperty("TEMPLATES", JSON.stringify(templates));
    return true; // Indicate successful update
  } else {
    return false; // Indicate failure
  }
}



const getCurrUser = () => {
  // Get the current user's email address
  const currUser = Session.getActiveUser().getEmail();
  Logger.log(currUser);
};
