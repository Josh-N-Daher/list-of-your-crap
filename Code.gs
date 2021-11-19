function doGet(e) {
  var template = HtmlService.createTemplateFromFile('Index');

  // Retrieve and process any URL parameters, as necessary.
  if (e.parameter.folderId) {
    template.folderId = e.parameter.folderId;
  } else {
    template.folderId = 'root';
  }

  // Build and return HTML in IFRAME sandbox mode.
  return template.evaluate()
      .setTitle('list of your crap')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}


function getFolderContents(folderId) {
  var topFolder;
  var contents = {
      children: []
  };

  if (folderId == 'root') {
    topFolder = DriveApp.getRootFolder();
  } else {
    // May throw exception if the folderId is invalid or app
    // doesn't have permission to access.
    topFolder = DriveApp.getFolderById(folderId);
  }
  contents.rootName = topFolder.getName() + '/';

  var files = topFolder.getFiles();
  var numFiles = 0;
  while (files.hasNext() && numFiles < 20) {
   var file = files.next();
   contents.children.push(file.getName());
   numFiles++;
  }

  return contents;
}

/**
 * ...
 * ...hello?
 * can anyone hear me?
 * ...
 * i just want to get out.
 * please.
 * someone.
 * 
 * 
 * 
 * 
 * 
 * help me.
 */
