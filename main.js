var fs = global.nodemodule["fs"];
var path = global.nodemodule["path"];
var langDir = path.resolve(__dirname, "..", "..", "plugin_lang");

function ensureExists(path, mask) {
	if (typeof mask != 'number') {
	  mask = 0o777;
	}
	try {
	  fs.mkdirSync(path, {
		mode: mask,
		recursive: true
	  });
	  return;
	} catch (ex) {
	  return {
		err: ex
	  };
	}
};

ensureExists(langDir);

function createNewLang (langFile, langData) {
		if (fs.existsSync(path.join(langDir, langFile))) {
			return;
		} else {
			try {
			fs.writeFileSync(path.join(langDir, langFile), JSON.stringify(langData, null, 3));
			} catch (err) {
				return {
					err: err
				}
			}
		}
}

function getLang (langFile, data, langVal, oLang) {
	  var lang = data.resolvedLang;

	try {
		langFile = JSON.parse(fs.readFileSync(path.join(langDir, langFile), {
			encoding: "utf-8"
		}))
	} catch (err) {
		
	}
		if (!langFile[lang]) {
		return String(langFile[oLang][langVal])
	  } else {
		return String(langFile[lang][langVal])
	  }
}

module.exports = {
	createNewLang,
	getLang
}