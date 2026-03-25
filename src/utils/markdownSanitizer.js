const marked= require('marked');
const sanitizeHtmlLibrary = require('sanitize-html');
const TurndownService = require('turndown')
function sanitizeMarkdownContent(markdownContent){

    const turndownService = new TurndownService()

    // 1- convert markdown into html
    const convertedHtml =marked.parse(markdownContent);

    console.log('converted html',convertedHtml);
    
    
    //2- sanitize html

    const sanitizedHtml=sanitizeHtmlLibrary(convertedHtml,{
        allowedTags: sanitizeHtmlLibrary.defaults.allowedTags.concat(['img'])
    });

    console.log('sanitized html',sanitizedHtml);
    

    //3- convert the sanitized html backed to markdown
    const sanitizedMarkdown=turndownService.turndown(sanitizedHtml);

    
    console.log('sanitized markdown',sanitizedMarkdown);
    
    
    return sanitizedMarkdown;
}


module.exports=sanitizeMarkdownContent;