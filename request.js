/**
 * Created by Yalovich on 23/08/2017.
 */
export default class Request
{
    /**
     * Request constructor
     * @param url
     * @param method
     */
    constructor(url, method)
    {
        if(typeof(url) == "undefined" || typeof(method) == "undefined") throw new Error("Syntax error. Usage: new Request('https://developers.zest.is', 'POST')");

        this.method = method;
        this.url = url;
    }

    /**
     * call server
     * @param clientObject
     */
    do(clientObject)
    {
        return new Promise((resolve, reject) => {

            let xmlHttp = new XMLHttpRequest();

            xmlHttp.open(this.method, this.url, true);
            xmlHttp.setRequestHeader("Content-type", "application/json; charset=utf-8");

            xmlHttp.onreadystatechange = (() => {

                if(xmlHttp.readyState == 4)
                {
                    if(xmlHttp.status == 200) return resolve(JSON.parse(xmlHttp.responseText));

                    reject(xmlHttp.responseText);
                }
            });

            if(typeof(clientObject) === 'undefined')
            {
                xmlHttp.send();
            }
            else
            {
                xmlHttp.send(JSON.stringify(clientObject));
            }
        });
    }
}
