var objMdMetadataApp;
var objMdMetadataPluginBrowser;
var objMdMetadataKeyWords = ['title', 'author', 'date'];

function MdMetadata_init(app, pluginBrowser) {
    console.log("MdMetadata_init");
    if (!app || !pluginBrowser)
        return;
    objMdMetadataApp = app;
    objMdMetadataPluginBrowser = pluginBrowser;

    /*
     * In Wiz 4.9.x, the plugin is been called after the Markdown page is rendered,
     * thus the MutationObserver will not be triggered. We try to replace the html
     * tag when plugin is loaded.
     */
    if (document.readyState == "complete") {
        MdMetadata_update();
    }

    /*
     * Before Wiz 4.9.x:
     *
     * Wiz Markdown Rendering doesn't offer a callback when rendering is complete.
     * So we use MutationObserver to monitor the rendering process.
     */
    var observer = new MutationObserver(function (mutations) {
        //console.log('MutationObserver');
        //console.log(mutations);
        MdMetadata_update();
    });

    var config = {
        childList: true,
        subtree: true
    };
    observer.observe(document.body, config);
}

function MdMetadata_create_table(metadata) {
    var tbl = document.createElement('table');
    tbl.style.width = '100%';
    tbl.setAttribute('border', '1');
    var tbdy = document.createElement('tbody');

    var title_tr = document.createElement('tr');
    var value_tr = document.createElement('tr');
    for (var i = 0; i < objMdMetadataKeyWords.length; i++ ) {
	var key = objMdMetadataKeyWords[i];
	for (var title in metadata) {
	    if (key === title.toLowerCase()) {
		var title_th = document.createElement('th');
		title_th.appendChild(document.createTextNode(title));
		title_tr.appendChild(title_th);

		var value_td = document.createElement('td');
		value_td.appendChild(document.createTextNode(metadata[title]));
		value_tr.appendChild(value_td);
	    }
	}
    }
    tbdy.appendChild(title_tr);
    tbdy.appendChild(value_tr);

    tbl.appendChild(tbdy);
    return tbl;
}

function MdMetadata_has_metadata(body) {
    var metadata = {}

    if (body === undefined) {
	return null;
    }

    // console.debug(body.childNodes);
    if (body.childNodes.length < 3
	|| body.childNodes[0].tagName != "HR"
	|| body.childNodes[2].tagName != "P") {
	console.debug("markdown no metadata");
	return null;
    }
    
    console.debug(body.childNodes[2].innerHTML);
    //var lines = body.childNodes[2].innerHTML.replace(/<br>/g,'').split('\n');
    var lines = body.childNodes[2].innerText.split('\n');
    for(var i = 0;i < lines.length; i++) {
	var key = lines[i].split(':')[0].trim();
	if (objMdMetadataKeyWords.includes(key.toLowerCase())) {
	    var value = lines[i].split(':')[1].trim();
	    metadata[key] = value;
	}
    }

    return metadata;
}

function MdMetadata_render_metadata(body, metadata) {
    if (metadata) {
	body.removeChild(body.childNodes[2]);
	body.removeChild(body.childNodes[1]);
	body.removeChild(body.childNodes[0]);

	body.insertBefore(MdMetadata_create_table(metadata), body.firstChild);
    }
}

function MdMetadata_update() {
    console.log("MdMetadata_update");
    var body = document.getElementsByClassName('markdown-body')[0];
    try {
	var metadata = MdMetadata_has_metadata(body);
	console.log(metadata);
	MdMetadata_render_metadata(body, metadata);
    } catch (e) {
        alert(e);
    }
}
