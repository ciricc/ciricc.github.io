
/*
	
	Node.js script for auto-template my head and nav
	in files

*/


const fs = require('fs')
const _ = __dirname;



const versions = [
	'1.5.1',
	'2.0.0'
];

const templatesDir = _ + '/templates/';
const pagesDir = _ + '/pages/';

function Zeros (d = 0) {
	if (Number(d) < 10) 
		d = "0" + d;

	return d;
}

function getEditedOrNot (firstVersion, lastVersion) {
	
	let d = new Date();

	if (firstVersion.replace(/ <span class="date-edit">(.*)<\/span>/g, "") != lastVersion && firstVersion.match(/date-edit/g)) {
		//it was edited, need update date-edit time
		console.log("Was edited, need update date!");

		let date = Zeros(d.getDate());
		let month = Zeros(d.getMonth() + 1);
		let year = d.getFullYear();

		let hours = Zeros(d.getHours());
		let minutes = Zeros(d.getMinutes());

			let dateEdit = date + "." + month + "." + year + " в " + hours + ":" + minutes;

		let dateEditedTemplate = '<span class="date-edit">Редактировано: <span class="det">'+dateEdit+'</span></span>';
			lastVersion = lastVersion.replace(/<h1>(.*?)<\/h1>/g, `<h1>$1 ${dateEditedTemplate}</h1>`);
		console.log(dateEdit);

	} else {
		
		// let dateEdit = d;
		try {
			let date = Zeros(d.getDate());
			let month = Zeros(d.getMonth() + 1);
			let year = d.getFullYear();

			let hours = Zeros(d.getHours());
			let minutes = Zeros(d.getMinutes());

			let dateEdit = date + "." + month + "." + year + " в " + hours + ":" + minutes;

			if (firstVersion.match(/date-edit/)) {
				dateEdit = firstVersion.match(/<span class="det">(.*?)<\/span>/g)[0]
				dateEdit = dateEdit.replace('<span class="det">', "").replace('</span>', '');
			}

			let dateEditedTemplate = '<span class="date-edit">Редактировано: <span class="det">'+dateEdit+'</span></span>';
			lastVersion = lastVersion.replace(/<h1>(.*?)<\/h1>/g, `<h1>$1 ${dateEditedTemplate}</h1>`);
		} catch (e) {
			console.log(e);
		}
	}

	console.log(lastVersion.length);
	return lastVersion;
}

function Update (file = "", version = "2.0.0", isLastVersion = false) {

	let htmlTemplate = fs.readFileSync(pagesDir + version + "/template.html").toString();
	let html = fs.readFileSync(pagesDir + version + "/" + file).toString();

	let htmlV = TemplateIt(html, htmlTemplate, version);

	let dirname = _ + "/"  + version + "/";
	if (!fs.existsSync(dirname)) {
		fs.mkdirSync(dirname);
	}

	let fTemplate;
	try {
		fTemplate = fs.readFileSync(dirname + file).toString();
	} catch (e) {
		fs.writeFileSync(dirname + file, "");
		fTemplate = "";
	}

	htmlV = getEditedOrNot(fTemplate, htmlV);
	fs.writeFileSync(dirname + file, htmlV);

	if (isLastVersion) {
		html = TemplateIt(html, htmlTemplate, version, true);
		let fTemplate;
		
		try {
			fTemplate = fs.readFileSync(_ + "/" + file).toString();
		} catch (e) {
			fs.writeFileSync(dirname + file, "");
			fTemplate = "";
		}

		html = getEditedOrNot(fTemplate, html);
		fs.writeFileSync(_ + "/" + file, html);
	}
}

function TemplateIt (htmlContent = "", template = "", version = "2.0.0", rootable = false) {
	let templatesFiles = fs.readdirSync(templatesDir + version);

	function scanRoot (html) {
		return html.toString().replace(/\{root\}/g, ((rootable) ? "" : "../"));
	}

	for (let t = 0; t < templatesFiles.length; t++) {
		//template to template

		let templateHTMLMini = fs.readFileSync(templatesDir + version + "/" + templatesFiles[t]).toString();

		let regexp = new RegExp("{%(.*?)" + templatesFiles[t].replace(".html", "") + "(.*?)%}", "g");

		template = template.replace(regexp, templateHTMLMini);

	}



	let regexp = new RegExp("{%(.*?)" + "content.html".replace(".html", "") + "(.*?)%}", "g");

	template = template.replace(regexp, htmlContent);
	template = scanRoot(template);

	let types = [
		["string", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type"],
		["array", "https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array", "Array"],
		["number", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type"],
		["function", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function", "Function"],
		["boolean", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type", "boolean"],
		["Promise", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise", "Promise"],
		["object", "https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object", "Object"]
	];

	for (let i = 0; i < types.length; i++) {
		let type = types[i][0];
		let linkType = types[i][1];
		let typeNormal = types[i][2];
		let typeRegExp = new RegExp(`<a href="#"\>${type}<\/a>`, "gi");
		template =  template.replace(typeRegExp, `<a href="${linkType}" target="_blank"/>&lt;${(typeNormal) ? typeNormal : type}&gt;</a>`);
	}
	
	template = template.replace(/class\=\"default\"/g, "class='default' title='По умолчанию'");
	template = template.replace(/class=\"js\"/g, '')
	template = template.replace(/\<pre><code>/g, "<pre$1 class='line-numbers normalize-whitespace'><code class='language-js'>")
	template = template.replace(/\<pre(.*?)\>(.*?)<code>/g, "<pre$1 class='line-numbers normalize-whitespace'>$2<code class='language-js'>")
	return template;
} 

for (let v = 0; v < versions.length; v++) {
	let templatesPath = templatesDir + versions[v];
	let pagesPath = pagesDir + versions[v];
	//get templates for this version, and then get files from this version
	let pages = fs.readdirSync(pagesPath);
	let templates = fs.readdirSync(templatesPath);

	fs.watch(pagesPath, (event, path) => {
		if (event == "change" || event == "rename") {
			//add new file

			if (fs.existsSync(pagesPath + "/" + path)) {
				Update(path, versions[v], versions.length - 1 == v);
			} else {
				if (versions.length - 1 == v) {
					fs.unlinkSync(_ + "/" + path);
				}
			}
		}

	});

	for (let t = 0; t < templates.length; t++) {
		fs.watch(templatesPath + "/" + templates[t], (event) => {
			if (event == "change") {
				UpdateTemplates(false);
			}
		});
	}

	function UpdateTemplates (needReWatch = true) {
		for (let i = 0; i < pages.length; i++) {
			let fileName = pages[i];
			let file = pagesPath + '/' + fileName;

			if (fileName === "template.html") {
				fs.watch(file, (event) => {
					//On change template, need update ALL templates
					UpdateTemplates(false);
				});
			} else {
				
				fs.watch(file, (event) => {
					if (event === "change") {
						Update(pages[i], versions[v], versions.length - 1 == v);
					}
				});

				Update(pages[i], versions[v], versions.length - 1 == v);

			}
		}
	}

	UpdateTemplates();

}


