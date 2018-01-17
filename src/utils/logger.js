/**
 * @class Logger
 * @classdesc static class to hold set of function working with log       applicationStorageDirectory    externalApplicationStorageDirectory
 */
class Logger {
    /**
     * creates log with starting text
     * @param {string} txt the text to log
     */
    static log(txt) {
        var me = this;
        return new Promise((resolve, reject) =>{
        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dirEntry) {
              var isAppend = true;
              var logBody = new Date().toString() + ": "+txt;
              me.createFile(dirEntry, "fileLogs.txt", isAppend,logBody).then(() =>{
                    resolve();
                    }).catch((err) =>{
                    reject(err);
                    });
          }, (err) => {
                console.log(err);
                reject(err);
          });
        });

    }

    /**
     * create file of log
     * @param {string} dirEntry path to file
     * @param {string} fileName file name
     * @param {boolean} isAppend to append writign or override
     * @param {string} txt the text to log
     *
     */
    static createFile(dirEntry, fileName, isAppend, txt) {
        var me = this;
        // Creates a new file or returns the file if it already exists.
        return new Promise((resolve, reject) =>{
            dirEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {

                me.writeFile(fileEntry, txt, isAppend).then(() =>{
                    resolve();
                    }
                ).catch((err) =>{
                    reject(err);
                    }
                );

            }, (err) => {
                console.log(err);
                reject(err);
            });
        });

    }

    /**
     * writes text to file file of log
     */
    static writeFile(fileEntry, dataObj, isAppend) {
        var me = this;
        // Create a FileWriter object for our FileEntry (log.txt).
        return new Promise((resolve, reject) =>{
            fileEntry.createWriter(function (fileWriter) {

                fileWriter.onwriteend = function () {
                    me.readFile(fileEntry).then(() =>{
                        resolve();
                    }).catch((err) =>{
                        reject(err);
                        });
                };

                fileWriter.onerror = function (e) {
                    reject(e);
                };

                // If we are appending data to file, go to the end of the file.
                if (isAppend) {
                    try {
                        fileWriter.seek(fileWriter.length);
                    }
                    catch (e) {
                        console.log("file doesn't exist!");
                        reject(e);
                    }
                }
                fileWriter.write(dataObj);
            });
        });
    }


    static getLogsFile() {
      var me = this;
      var def = new Promise((resolve, reject) =>{
        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dirEntry) {
          var isAppend = true;
          dirEntry.getFile("fileLogs.txt", { create: true, exclusive: false }, function (fileEntry) {
            fileEntry.file(function (file) {
                var reader = new FileReader();
                reader.onloadend = function () {
                    resolve(this.result);
                };
                reader.readAsText(file);
            }, (err) => {
                console.log(err);
                reject(err);
            });
          }, (err) => {
              console.log(err);
              reject(err);
          });
        }, (err) => {
            console.log(err);
            reject(err);
        });
      });
      return def;
    }

    /**
     * create file of log
     * @param {string} fileEntry path to file
     * @returns text from log
     */
    static readFile(fileEntry) {
        var me = this;
        return new Promise((resolve, reject) =>{
            fileEntry.file(function (file) {
                var reader = new FileReader();

                reader.onloadend = function () {
                    resolve();
                };

                reader.readAsText(file);

            }, (err) => {
                console.log(err);
                reject(err);
            });
        });
    }

    static cleanLogs(){
      var me = this;
      var def = new Promise((resolve, reject) =>{
      window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dirEntry) {
        dirEntry.getFile("fileLogs.txt", { create: true, exclusive: false }, function (fileEntry) {
          fileEntry.createWriter(function (fileWriter) {
              fileWriter.onwriteend = function () {
                  resolve('Success');
              };
              fileWriter.onerror = function (e) {
                  console.log("Failed file read: " + e.toString());
                  reject(e);
              };
              fileWriter.write('');
          });
          } ,  (err) => {
              console.log(err);
              reject(err);
          });
        });
      }); // def -end
      return def;

    }




}

export default Logger;
