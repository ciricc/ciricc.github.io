/*
	
	Node.js script for auto-template my head and nav
	in files

*/


const fs = require('fs')
const _ = __dirname


const templates = [
	'/templates/nav.html',
	'/templates/header.html',
	'/templates/head.html',
	'/templates/scripts.html',
]


const pagesPath = _ + '/pages/'




function Updater (needWatch = false) {

	fs.readdir(pagesPath, (err, files) => {
		
		if (err) {
			throw err
		}



		for (let f_ = 0; f_ < files.length; f_++ ) {

			if (needWatch) {
				
				fs.watch(pagesPath, updateTemplate)

			}
			
			updateTemplate('change', files[f_])
		}


	})

}

for (let t_ = 0; t_ < templates.length; t_++) {

	fs.watch(_ + templates[t_], (eventType, templateName) => {
		Updater()
	})

}

Updater('yes')




function updateTemplate (eventType, fileName) {
	if (eventType === 'change') {

		console.log('[Changed]' + fileName)


		let html = fs.readFileSync(pagesPath + fileName)
		
		html = html.toString()
		html = templateIt(html)

		fs.writeFile(_ + '/' + fileName, html, (err, s) => {
			
			if (err) {
				throw err
			}

		})
	}

	if (eventType === 'add') {
		fs.watch(pagesPath + fileName, updateTemplate)
	}
}


function templateIt (docHtml = "") {
	
	for (let t_ = 0; t_ < templates.length; t_++ ) {

		let tmpHtml = fs.readFileSync(_ + templates[t_])
		
		tmpHtml = tmpHtml.toString()

		let nameTemplateBlock = templates[t_]
		.split('/')[2]
		.split('.')[0]

		let regExpTemplateBlock = new RegExp(`{%(.*?)${nameTemplateBlock}(.*?)%}`, 'g')

		docHtml = docHtml.replace(regExpTemplateBlock, tmpHtml)

	}


	return docHtml

}