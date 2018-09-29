
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

function Update (file = "", version = "2.0.0", isLastVersion = false) {

	let htmlTemplate = fs.readFileSync(pagesDir + version + "/template.html").toString();
	let html = fs.readFileSync(pagesDir + version + "/" + file).toString();

	let htmlV = TemplateIt(html, htmlTemplate, version);

	let dirname = _ + "/"  + version + "/";
	if (!fs.existsSync(dirname)) {
		fs.mkdirSync(dirname);
	}

	fs.writeFileSync(dirname + file, htmlV);

	if (isLastVersion) {
		console.log(isLastVersion, version);
		html = TemplateIt(html, htmlTemplate, version, true);
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


