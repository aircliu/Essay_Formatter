function onOpen() {
  DocumentApp.getUi().createAddonMenu()
      .addItem('Open Formatter', 'showSidebar')
      .addToUi();
}

function showSidebar() {
  const html = HtmlService.createHtmlOutputFromFile('essay_formatter.html') 
      .setTitle('MLA/APA Formatter') 
      .setWidth(300);
  DocumentApp.getUi().showSidebar(html);
}

function addHeaderToGoogleDoc(firstName, lastName, prof, course, date) {
  const doc = DocumentApp.getActiveDocument();
  const body = doc.getBody();

  body.editAsText().appendText(firstName + ' ' + lastName);  
  body.appendParagraph(prof);
  body.appendParagraph(course);
  body.appendParagraph(date);

  body.setFontFamily('Times New Roman');
  body.setFontSize(12);

  const paragraphs = body.getParagraphs();
  
  for (let i = 0; i < paragraphs.length; i++) {
    paragraphs[i].setLineSpacing(2.0);
  }

  doc.saveAndClose();
}

function saveTemplate(templateData) {
  const scriptProperties = PropertiesService.getScriptProperties();
  let savedTemplates = scriptProperties.getProperty('TEMPLATES');
  
  if(savedTemplates) {
    savedTemplates = JSON.parse(savedTemplates);
  } else {
    savedTemplates = [];
  }

  savedTemplates.push(templateData);
  scriptProperties.setProperty('TEMPLATES', JSON.stringify(savedTemplates));
}

function getSavedTemplates() {
  const scriptProperties = PropertiesService.getScriptProperties();
  const templates = scriptProperties.getProperty('TEMPLATES');

  if (templates) {
    return JSON.parse(templates);
  } else {
    return [];
  }
}


function formatTextInGoogleDoc() {
  const doc = DocumentApp.getActiveDocument();
  const body = doc.getBody();
  
  const paragraphs = body.getParagraphs();
  for (let i = 0; i < Math.min(paragraphs.length, 4); i++) {
    const line = paragraphs[i].editAsText();
    line.setFontFamily('Times new Roman');
    line.setFontSize(12);
  }

  doc.saveAndClose();
}
