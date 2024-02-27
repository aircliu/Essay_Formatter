// Firestore Credentials
const email = 'firebase-adminsdk-6tjgn@mla-formatter-851fa.iam.gserviceaccount.com';
const key = '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDDNGHrnk9ZjIHS\n9tnloaH1waJAJJT4BgCVbIY/EXp8lGQYtVhMcadK5VYrqssfTaH7PmTnQgCZKiKo\nUesNybRe9Oe+MdfvunMSdTmm9FvlWGp2J0mLOCj34j21MnBcXMH3CewrYzXb87TB\n+04TnQbfpqxQBrAOEwoOmw3kCJc1xIQC2lGgqcJabG9vHrxpFZcn8gii5IUK9Avs\nnpyEhJtTWT514w/nmzQj+jkzgzqnM7h2aOA30xg5N0F0ep1Uu/aV7VDAfo6VraQz\n0GSOoFoM/GEtfOtowPAs/2Y8U+KGirngXU1cktgC7su75lpt1sUU4dUg7zPAZDLa\nkCneg3FDAgMBAAECggEAEzUFx4nRs/V71ra8VPh097oATYBr+gWZLBq8ENuW6kgt\nmzLIx+jM9bUgJ/bLur5ISHDou8qGRYvcUiSRVM96hHdjkBbWcPuvE+td61wS6Lus\n6ghOl7jEazOjL7+RR71Gxph+2PwPkh9mM0oXch2azgnX3Z3y18euzyYZlUz1F/Cc\np59Wb8dk2wWqJHLphqKZAL3du83h7ySfoLioa4AOQe50m3OeBGuGh0R0gc2RiTYd\nBdeiHdhnAeiDQBOJJZdjE3+8+SZU6nIOdy8dl1zxH9cwJRaj6DqhtbutTfJYQg3C\nrHv/33/vsTYuewlDTeYmZRhtFSQIlkKJ/W+I77wWDQKBgQDotsYyWG42g9tBLEPI\nhu5RPxbNg3aAflGQiWSZI0YLpClIQ4+t7DC8YUo1J58u8Awae6PhmCo/KX8+5GDX\nrCRkAw2sNalWZfJqyIoZ9rph2VkNU88s9P0rntRM92cWdIr4XT9BA0+nCZ1saenq\ninMRwyzLstA7APNDDYYo4F085wKBgQDWvMPUDDHBS+CXo1eHlQ2AuvMSPugVTSdI\n5XzwvB3g7d0l0cS5ndLMmxabfQzc5icSZitcS2/irRXfU4xQrhG4XzFTKdsIZcNT\nkjxvYB6j/RQ2cS3fhtvEsxznntuFF52hYsaJgBNyCPHJ+7XMeucxNx2oKiGumRY2\n1/SSR+3hRQKBgQCnzcvi18M5SiEawKlr+mf0a/KsZKRZiTyVZY0Fo9rJYCloc1cy\niYKnA9x3scdmGDASFJ+ad5fXDbw0hIeUXQuslksQp20g4MhJ2atDh5bkIc7F/m4A\ns/OutYvOqANMvOLMrqiC37la8GL0nvbOaeEJqNwvUhQ2x7uh2SmpZge1dwKBgQCx\nJFDraQ/WZDCnBtEbAKN98Tq5b3lmsRnaMa3qrVR8i9xl6XC+qmoN7VYt+G+W/ql2\nrR/R6E0pEh27+CEFIUNu8+AtuZZ9i+0g0L7YJdPA9fIpox3zij1bO2J50/tFBKE9\nU81x+lyQMr67H9DuGOkFGXF2myLj9Fd18JpJ3dpnfQKBgEz0sTXAeYvP4xpw1r/a\nK0TtsMMejeL0x+DHhUfAJN17ddQfbFCmYYEU+hXpyI6DY/uigiPAxQQ3E9gU0gc3\nIlJ+PhuP/kBXCrGyBisH9HtIxowugoZNrAhlTpJljR2Ukkb+ss49arh3UycrMbIb\nPpbV08huqBl1vPvD8m6k9enP\n-----END PRIVATE KEY-----\n';
const projectId = 'mla-formatter-851fa'

const firestore = FirestoreApp.getFirestore(email, key, projectId);

// Start Firebase Utils

const testFirebase = () => {
  // createAccount('NEW_FIREBASE_UID_2.0', 'test@gmail.com');
  createNewTemplate('Writing 60', 'SAMPLE_FIREBASE_UID', 'Ostend', 'Suryajaya', 'Professor Liu', 'WR60');
};

const createAccount = (firebaseUID, email) => {
  // Get the Firestore instance

  // Create a new user document
  var newUser = {
    email: email,
  };

  // Add the new user document to the 'users' collection
  firestore.createDocument(`users/${firebaseUID}`, newUser);

  Logger.log('New account added successfully!');
};

const createNewTemplate = (className, firebaseUID, firstName, lastName, professor, templateName) => {
  // Data for the new template document
  var newTemplateData = {
    className: className,
    firebaseUID: firebaseUID,
    firstName: firstName,
    lastName: lastName,
    professor: professor,
    templateName: templateName
  };

  // Add the new template document to the 'templates' collection
  firestore.createDocument('templates', newTemplateData);

  Logger.log('New template added successfully!');
}

// End Firebase Utils

// Start Auth Utils

const testAuthUtils = () => {
  Logger.log(`Here is the currently logged in uder: ${ScriptApp.getIdentityToken()}`)
};

// End Auth Utils

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
  body.insertParagraph(0, `${firstName} ${lastName}`);
  body.insertParagraph(1, prof);
  body.insertParagraph(2, course);
  body.insertParagraph(3, currentDate);

  formatTextInGoogleDoc();

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
  Logger.log(templates);

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
  for (let i = 0; i < Math.min(paragraphs.length); i++) {
    const line = paragraphs[i].editAsText();
    line.setFontFamily("Times New Roman");
    line.setFontSize(12);
    paragraphs[i].setLineSpacing(2.0);
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

const deleteTemplate = (index) => {
  const scriptProperties = PropertiesService.getScriptProperties();
  let templates = JSON.parse(scriptProperties.getProperty("TEMPLATES") || "[]");

  if (index >= 0 && index < templates.length) {
    templates.splice(index, 1); // Remove the template at the specified index
    scriptProperties.setProperty("TEMPLATES", JSON.stringify(templates));
    return true; // Indicate successful deletion
  } else {
    return false; // Indicate failure or invalid index
  }
};

function openSimplePopup() {
  var html = HtmlService.createHtmlOutputFromFile('SimplePopup')
      .setWidth(300)
      .setHeight(150);
  DocumentApp.getUi().showModalDialog(html, 'Simple Popup');
}





const getCurrUser = () => {
  // Get the current user's email address
  const currUser = Session.getActiveUser().getEmail();
  Logger.log(currUser);
};
