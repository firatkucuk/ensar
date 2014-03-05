
var WEBSEARCH_ITEMS_PER_PAGE  = 10;
var IMGSEARCH_ITEMS_PER_PAGE  = 100;
var WEBSEARCH_SOLR_URL        = 'http://localhost:8983/solr/collection1';        // No trailing slash



// --- [generatePaginations] -------------------------------------------------------------------------------------------

function generatePaginations(data, query, solrServiceUrl) {

  var response = data.response;
  
  if (response === null) {
    return;
  }

  var $paginations = $('#paginations');

  var lookBehindPageCount  = 5;
  var lookForwardPageCount = 5;
  var itemCount            = response.numFound;
  var start                = response.start;
  var currentPage          = (start / WEBSEARCH_ITEMS_PER_PAGE) + 1;
  var pageReminder         = itemCount % WEBSEARCH_ITEMS_PER_PAGE; 
  var pageCount            = (itemCount - pageReminder) / WEBSEARCH_ITEMS_PER_PAGE + (pageReminder === 0 ? 0 : 1);
  var firstText            = '&laquo';
  var previousText         = '&lt';
  var nextText             = '&gt';
  var lastText             = '&raquo';
  var paginationsText      = '';
  
  if (pageCount !== 0) {
    
    paginationsText += '<ul class="pagination">';
  
    // if currentPage is not the FIRST page we should show back and go to first item links
    if (currentPage !== 1) {
      paginationsText += '<li><a href="#" onclick="processWebSearchQuery(\'' + query + '\', 1)">' + firstText + '</a></li> &nbsp; ';
      paginationsText += '<li><a href="#" onclick="processWebSearchQuery(\'' + query + '\', ' + (currentPage - 1) + ')">' + previousText + '</a></li> &nbsp; ';
    }
    
    // we should shoe items n before and n after items
    for (var i = 1; i <= pageCount; i++) {
      if (i >= currentPage - lookBehindPageCount && i <= currentPage + lookForwardPageCount) {
        if (i !== currentPage) {
          paginationsText += '<li><a href="#" onclick="processWebSearchQuery(\'' + query + '\', ' + i + ')">' + i  + '</a> &nbsp; ';
        } else {
          paginationsText += '<li class="active"><a href="#" onclick="processWebSearchQuery(\'' + query + '\', ' + i + ')">' + i  + '</a> &nbsp; ';
        }
      }
    }
  
    // if currentPage is not the LAST page we should show back and go to first item links
    if (currentPage !== pageCount) {
      paginationsText += '<li><a href="#" onclick="processWebSearchQuery(\'' + query + '\', ' + (currentPage + 1) + ')">' + nextText + '</a></li> &nbsp; ';
      // paginationsText += '<li><a href="#" onclick="processQuery(\'' + query + '\', ' + pageCount + ')">' + lastText + '</a></li> &nbsp; ';
    }

    paginationsText += '</ul>';
    $paginations.html(paginationsText);
  }
}



// --- [generateWebSearchResults] --------------------------------------------------------------------------------------

function generateWebSearchResults(data) {

  var $results = $('#results');
  var response = data.response;

  $results.html('');

  if (response.numFound === 0) {
    $results.html('Sonuç bulunamadı!');
    return;
  }

  var highlighting = data.highlighting;
  
  if (highlighting === null || response === null || response.docs == null) {
    return;
  }

  var docs = getDocsMap(response.docs);
  
  $.each(
    highlighting,
    function(key, value) {
      
      if (value !== null && value.content !== null) {

        var doc          = docs[key];
        var resultsText  = '';
        var fileName     = doc.id.replace(".html", '');
        var volumeNumber = fileName.substr(0, 2);
        var pageNumber   = fileName.substr(3, 4);
        var documentId   = volumeNumber + pageNumber;

        resultsText += '<div class="result_item">';
        resultsText += '  <div><a target="_blank" href="http://tdvislamansiklopedisi.org/dia/ayrmetin.php?idno=' + documentId + '">' + doc.title + '</a></div>';
        resultsText += '  <div class="result_snippet">... ' +  value.content  + ' ...</div>'
        resultsText += '  <div class="result_labels">';
        resultsText += '    <span class="label label-info"><a target="_blank" href="http://tdvislamansiklopedisi.org/dia/pdf/c' + volumeNumber + '/indir.php?kodno=c' + documentId + '">PDF</a></span>';
        resultsText += '  </div>';
        resultsText += '</div>';

        $results.append(resultsText);
      }
    }
  );
}



// --- [generateStats] -------------------------------------------------------------------------------------------------

function generateStats(data, selector) {

  var $stats         = $(selector);
  var response       = data.response;
  var responseHeader = data.responseHeader;

  if (response.numFound !== 0) {
    var statsText = '';
    
    statsText += '<div>';
    statsText +=   response.numFound;
    statsText +=   ' sonuç bulundu (' + (responseHeader.QTime / 1000) + ' saniye)';
    statsText += '</div>';
    
    $stats.html(statsText);
  }
}



// --- [getDocsMap] ----------------------------------------------------------------------------------------------------

function getDocsMap(docs) {

  var docsMap = {};

  $.each(
      docs,
      function(key, value) {
        docsMap[value.id] = value;
      }
  );

  return docsMap;
}



// --- [processWebSearchQuery] -----------------------------------------------------------------------------------------

function processWebSearchQuery(query, page) {
  
  var solrServiceUrl = WEBSEARCH_SOLR_URL + "/select";
  var startItem      = (page - 1) * WEBSEARCH_ITEMS_PER_PAGE;
  var fields         = '';
  
  fields += 'id,title';

  solrServiceUrl += "?q=" + query;
  solrServiceUrl += "&wt=json";
  solrServiceUrl += "&json.wrf=jsonpCallback";
  solrServiceUrl += "&start=" + startItem;
  solrServiceUrl += "&hl=true";
  solrServiceUrl += "&hl.fl=content";
  solrServiceUrl += "&hl.fragsize=250";
  solrServiceUrl += "&hl.simple.pre=<strong>";
  solrServiceUrl += "&hl.simple.post=</strong>";
  solrServiceUrl += "&fl=" + fields;
  
  $.ajax({
      url          : solrServiceUrl,
      dataType     : 'jsonp',
      jsonpCallback: 'jsonpCallback',
      success      : function(data) {

        if (data === null) {
          return;
        }
        
        var response = data.response;
        
        if (response === null || response.numFound === null) {
          return;
        }

        generateStats(data, '#stats');
        generateWebSearchResults(data);
        generatePaginations(data, query, solrServiceUrl);
      },
      error : function() {
        console.log('Bir hata oluştu!');
      }
    }
  );
}



// --- [suggestQuery] --------------------------------------------------------------------------------------------------

function suggestQuery(query, process) {

  var solrServiceUrl = WEBSEARCH_SOLR_URL + "/suggest";

  solrServiceUrl += "?q=" + query;
  solrServiceUrl += "&wt=json";
  solrServiceUrl += "&json.wrf=jsonpCallback";
  solrServiceUrl += "&distrib=false";

  $.ajax({
        url          : solrServiceUrl,
        dataType     : 'jsonp',
        jsonpCallback: 'jsonpCallback',
        success      : function(data) {

          if (data === null) {
            process([query]);;
          }

          var suggestions = data.spellcheck.suggestions;

          if (suggestions === null || suggestions.length == 0) {
            process([query]);;
          }
          
          var newSuggestions = suggestions[1].suggestion;
          newSuggestions.unshift(query);
          
          process(newSuggestions);
        },
        error: function () {
          console.log('Bir hata oluştu!');
          process([query]);;
        }
      }
  );

  process([query]);;
}


// --- [jsonpCallback] -------------------------------------------------------------------------------------------------

function jsonpCallback() {

  // nothing to do
}
