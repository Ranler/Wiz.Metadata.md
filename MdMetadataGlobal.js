var objApp = WizExplorerApp;
var objWindow = objApp.Window;

/**
* Brought from Wiz.Editor.md (https://github.com/akof1314/Wiz.Editor.md)
* and slightly modified
*/
function isMarkdown(title) {

    if (!title)
        return false;
    if (-1 != title.indexOf(".md "))
        return true;
    if (-1 != title.indexOf(".md@"))
        return true;
    if (title.match(/\.md$/i))
        return true;
    return false;
}

function isPicture(name) {
    if (name.match(/\.(jpg|jpeg|jpe|jfif|png|gif|bmp|dib|tif|tiff|psd|svg|ai|eps|ps|cur|ico)$/)) {
        return true;
    } else {
        return false;
    }
}

function getString(id) {
    var pluginPath = objApp.GetPluginPathByScriptFileName("MdPicGlobal.js");
    var languageFileName = pluginPath + "plugin.ini";
    var strLanguage;
    try {
        var strLanguage = objApp.LoadStringFromFile(languageFileName, id);
    } catch (e) {
        alert(e);
    }
    return strLanguage
}

function inject_js() {
    var pluginPath = objApp.GetPluginPathByScriptFileName("MdMetadataGlobal.js");
    var scriptFile = pluginPath + "MdMetadataInject.js";
    var objBrowser = objWindow.CurrentDocumentBrowserObject;
    objBrowser.ExecuteScriptFile(scriptFile, function (ret) {
        objBrowser.ExecuteFunction2("MdMetadata_init", objApp, objBrowser, function (ret) {});
    });
}

function MdMetadataOnDocumentComplete(doc) {
    // Since doc parameter doesn't contain the document title after Wiz 4.5,
    // we need use objWindow.CurrentDocument to obtain the title
    var objDocument = objWindow.CurrentDocument;
    //        alert(objDocument.Title);
    if (isMarkdown(objDocument.Title)) {
        console.log(`${objDocument.Title} is markdown`);
        inject_js();
    }
}

function main() {
    if (eventsHtmlDocumentComplete) {
        eventsHtmlDocumentComplete.add(MdMetadataOnDocumentComplete);
    }
}

main();
