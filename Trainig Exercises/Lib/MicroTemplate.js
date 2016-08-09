

mergeDataWithTemplate = function(BindObj,StringTemplate,OutputType)
{

    var CompliledTemplate = _getCompiledHtml(StringTemplate,BindObj);


    return CompliledTemplate;

}

_getCompiledHtml = function(StringTemplate,BindObj)
{
    var CompileFunction = _tmpl(StringTemplate);

    return CompileFunction(BindObj);
}

_tmpl = function(sTemplate)
{
    // ATTENZIONE: Non utilizzare gli apici nel javascript dei template
    var sMergedHtmlResult;
    sMergedHtmlResult = new Function("obj","var p=[];(function(){ p.push('" +
        sTemplate.replace(/[\r\t]/g, " ")
            .replace(/[\n]/g, "\\n")
            //Allows @varname as a shortcut for <%=this.varname%>
            .replace(/@([\w]+)/g,"<%=this.$1%>")
            .split("<%").join("\t")
            .replace(/((^|%>)[^\t]*)'/g, "$1\r")
            // escape other single quotes
            .split("'").join("\\'")
            .replace(/\t=(.*?)%>/g, "',$1,'")
            .split("\t").join("');")
            .split("%>").join("p.push('")
            .split("\r").join("\\'")
        + "');}).call(obj); return p.join('');");

    return sMergedHtmlResult;
};


